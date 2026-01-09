---
title: '深入理解 ThreadLocal'
date: '2026-01-09'
description: '从类比与源码出发，解析 ThreadLocal、ThreadLocalMap 与 Thread 的关系，及其导致的内存泄漏与防护措施。'
category: 'java'
tags:
  - threadlocal
  - java
  - concurrency
  - memory-leak
slug: 'threadlocal-understanding'
readingTime: 8
draft: false
---

## ThreadLocal、ThreadLocalMap 与 Thread 的关系

### 一个例子：角色、背包与标签

把 JVM 想象成一个大型网络游戏服务器。

1. **Thread (线程)** — 游戏里的一个个“角色”（Player）

   - 比如：玩家 A（战士）、玩家 B（法师）。
   - 特性：每个玩家都是独立行动的，互不干扰。

2. **ThreadLocalMap (Map)** — 角色的“专属背包”（Inventory）

   - 特性：这个背包是**长在角色身上**的（成员变量）。
   - 隔离性：玩家 A 绝对不可能把手伸进玩家 B 的背包里拿东西。

3. **ThreadLocal (变量)** — 背包里的“物品槽位标签”（Slot Label）

   - 比如：**“武器槽”**、**“头盔槽”**。
   - 特性：这只是一个定义（全局唯一的 `static` 变量）。所有玩家的背包里都有“武器槽”，但 A 的槽里放的是刀，B 的槽里放的是杖。

---

### 类比：具体的运行过程

假设我们在代码里定义了两个 ThreadLocal 变量（两个槽位标签）：

```java
// 全局定义：所有玩家都有这两个槽位
static final ThreadLocal<String> WEAPON_SLOT = new ThreadLocal<>(); // 武器槽
static final ThreadLocal<String> ARMOR_SLOT = new ThreadLocal<>();  // 防具槽

```

#### 场景 1：玩家 A (Thread-A) 上线了

1. **动作：** 代码执行 `WEAPON_SLOT.set("屠龙刀");`
2. **后台发生了什么？**

   - 系统找到当前行动的角色 **Thread-A**。
   - 打开 Thread-A 的 **背包 (Map)**。
   - 找到贴着 **“武器槽” (Key)** 标签的格子。
   - 放入 **“屠龙刀” (Value)**。

3. **此时状态：**
   - Thread-A 的背包：`{ WEAPON_SLOT : "屠龙刀" }`

#### 场景 2：玩家 B (Thread-B) 上线了

1. **动作：** 代码执行 `WEAPON_SLOT.set("魔法棒");`

2. **后台发生了什么？**

   - 系统找到当前行动的角色 **Thread-B**。
   - 打开 Thread-B 的 **背包 (Map)**。
   - 找到贴着 **“武器槽” (Key)** 标签的格子。
   - 放入 **“魔法棒” (Value)**。

3. **此时状态：**
   - Thread-B 的 背包：`{ WEAPON_SLOT : "魔法棒" }`

#### 场景 3：读取数据

1. **动作：** 代码执行 `String myWeapon = WEAPON_SLOT.get();`
2. **结果：**

- 如果这行代码跑在 Thread-A 里，拿到的就是“屠龙刀”。
- 如果这行代码跑在 Thread-B 里，拿到的就是“魔法棒”。

---

### 核心关系总结 — 三者的从属关系：

1. **Thread (角色) 是容器的主人。**

- Map 属于 Thread。Thread 死掉，Map 也就销毁。

2. **ThreadLocalMap (背包) 是数据的真实容器。**

- 数据不是存在 `ThreadLocal` 里的，是存在 `Thread` 里的。

3. **ThreadLocal (标签) 是访问的 Key。**

- 它是一把通用的钥匙。因为不同的人（Thread）拿同一把钥匙（ThreadLocal）去开自己的保险箱，拿到的东西是不一样的。

### 代码层面

#### 代码结构全景

1. **Thread.java:** 定义了成员变量 `threadLocals`（引用）。
2. **ThreadLocal.java:** 定义了静态内部类 `ThreadLocalMap`（类型定义）以及操作逻辑 (`get/set`)。
3. **连接点:** `ThreadLocal` 的 `set` 方法通过 `Thread.currentThread()` 把两者连了起来。

---

#### 关系拆解

1. Thread 类 (宿主) : `Thread` 很简单，它只管**持有**。

```java
// Thread.java 源码片段
public class Thread implements Runnable {

    /* * 关键关系 1: Thread 持有 Map 的引用
     * 注意：这里它是 null，懒加载的，只有第一次 set 的时候才会创建
     */
    ThreadLocal.ThreadLocalMap threadLocals = null;

    // ... 其他代码 ...
}

```

2.  ThreadLocal 类 (管理者 & Key) : `ThreadLocal` 很复杂，它定义了 Map 长什么样，以及怎么存取。

```java
// ThreadLocal.java 源码片段
public class ThreadLocal<T> {

    /*
     * 关键关系 2: Map 是 ThreadLocal 的静态内部类
     * 这说明：Map 的“设计图纸”归 ThreadLocal 管
     */
    static class ThreadLocalMap {

        // Map 里面是一个 Entry 数组
        private Entry[] table;

        // Entry 继承了 WeakReference，Key 是 ThreadLocal 对象
        static class Entry extends WeakReference<ThreadLocal<?>> {
            Object value;
            Entry(ThreadLocal<?> k, Object v) {
                super(k); // Key (弱引用)
                value = v; // Value (强引用)
            }
        }
    }

    /*
     * 关键关系 3: 操作逻辑 (Linker)
     * 这是把 Thread 和 Map 连起来的地方
     */
    public void set(T value) {
        // 1. 拿到当前线程 (The Host)
        Thread t = Thread.currentThread();

        // 2. 拿到线程身上的 Map (The Map)
        ThreadLocalMap map = getMap(t);

        if (map != null)
            // 3. 以自己 (this) 为 Key 存入
            map.set(this, value);
        else
            createMap(t, value);
    }

    // 帮助方法：访问 Thread 类的私有字段
    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }
}

```

---

#### 关系总结

从上面的代码中，我们可以提炼出三层确切的关系：

1. **持有关系 (Has-A):**

- `Thread` **has a** `ThreadLocalMap` (`threadLocals`).
- 代码体现：`Thread.java` 里的 `ThreadLocal.ThreadLocalMap threadLocals = null;`

2. **包含/定义关系 (Nested-In):**

- `ThreadLocalMap` **is defined inside** `ThreadLocal`.
- 代码体现：`ThreadLocal.java` 里的 `static class ThreadLocalMap`。

3. **操作关系 (Uses):**

- `ThreadLocal` **uses** `Thread.currentThread()` to find the data.
- 代码体现：`set()` 方法中的 `getMap(t)`。

---

#### 一张图总结引用链

```text
Stack (栈)                 Heap (堆)
----------------      ---------------------------
                      [ Thread 对象 (Thread-A) ]
                      |
[Ref: currentThread] -+-> threadLocals (字段)
                      |       | (强引用)
                      |       v
                      |   [ ThreadLocalMap 对象 ]
                      |   |
[Ref: myThreadLocal] -+   +-- Entry[] table
 (代码里的变量)       |       |
      |               |       +-- Entry[0]
      |               |           |
      +---------------+---------> | Key (弱引用) --> [ThreadLocal 对象]
                                  | Value (强引用) --> ["具体的 UserID"]

```

## ThreadLocal 的弱引用

假设我们在代码里写了一行：
`static ThreadLocal<User> TL = new ThreadLocal<>();`

此时，堆内存里的这个 **ThreadLocal 对象** 有两根绳子拴着它：

1. **绳子 A (强引用):** 来自代码 `static TL` 变量。
2. **绳子 B (Map 里的 Key):** 来自线程背包里的 `Entry`。

---

### 为什么必须是“弱引用”？

现在，业务代码跑完了，我们绳子 A 剪断了（比如类卸载了，或者手动 `TL = null`）。

**情况 1：如果绳子 B 是【强引用】**

- **GC 来了：** “哎，虽然外部代码不理这个 `ThreadLocal` 对象了（绳子 A 断了），但是线程池里的线程还活着，它的背包（Map）里还紧紧拽着这个对象（绳子 B）呢！”
- **结果：** GC **不敢**回收这个 `ThreadLocal` 对象。
- **后果：** 随着时间推移，内存里堆满了没人用的 `ThreadLocal` 对象（Key 泄漏）。

**情况 2：因为绳子 B 是【弱引用】 (JDK 的设计)**

- **GC 来了：** “外部代码不理它了（绳子 A 断了）。虽然线程背包里还指着它（绳子 B），但这根绳子是**次品（弱引用）**，不算数！”
- **结果：** GC **直接回收** 这个 `ThreadLocal` 对象。
- **现象：** 背包里的那个 Entry，Key 瞬间变成了 `null`。
- **后果：**
- **好消息：** `ThreadLocal` 对象本身回收成功了！
- **坏消息：** 对应的 `Value`（那把屠龙刀）还在背包里，但标签（Key）没了，变成了“无主之物”。这就叫 **Key 没了，Value 还在**。

### 弱引用导致的内存泄漏 —— Value Leak

JDK 解决了 Key 的泄漏，却留下了 Value 的坑。

当 Key (ThreadLocal) 被 GC 回收后，Map 里的情况变成了这样：

| Entry Index | Key (Weak) | Value (Strong)           | 状态描述        |
| ----------- | ---------- | ------------------------ | --------------- |
| Slot 0      | `null`     | `"User-Data-Big-Object"` | **⚠️ 僵尸对象** |

1. **Key 变成了 null:** 因为 ThreadLocal 对象被回收了。
2. **Value 还是强引用:** `Thread` -> `Map` -> `Entry` -> `Value`。这条链条是**全强引用**的。
3. **结果:**
   - 我们再也无法访问到这个 Value 了（因为 Key 没了，像丢了取件码）。
   - 但是这个 Value 还实实在在地占着内存。
   - 如果线程一直不死（线程池），这个 Value 就一直存在。
   - **这就是 ThreadLocal 内存泄漏的真相：Key 没了，Value 还在。**

### JDK 的“补救措施”与“最佳实践”

JDK 的开发者也知道这个问题，所以他们在 `ThreadLocalMap` 的 `set()`, `get()`, `remove()` 方法里埋了**自动清理**的逻辑。

#### 1. 探测式清理 (Lazy Cleanup)

当你下次调用 `threadLocal.set()` 或 `get()` 时，它会顺手检查一下：

- “咦，这个位置的 Key 怎么是 `null`？”
- “说明之前的 ThreadLocal 已经被回收了。”
- “那我顺便把这个位置的 Value 也置为 null，把 Entry 擦除掉。”
  这就是源码里的 `expungeStaleEntries()` 方法。

清理动作不是针对那个已经失效的 ThreadLocal 发起的。

清理动作是针对同一个线程的 Map 里，其他还**活着的 ThreadLocal** 发起的。

1. **前提：** 一个 ThreadLocalMap（背包）里装着很多个 Entry（A, B, C...）。
2. **现状：** Entry A 的 Key（ThreadLocal A）被回收了，变成了 `null`，它是垃圾。
3. **触发：** 你的代码调用了 **ThreadLocal B** 的 `set()` 或 `get()` 方法。
4. **过程：** ThreadLocal B 去背包里找自己的位置时，**路过了** Entry A，发现：“咦？这里有个坑，Key 是空的，但占着位置。”
5. **结果：** ThreadLocal B **顺手**把 Entry A 给清理了。

---

#### 2. 为什么还说会泄漏？

因为这种清理是**被动**的。
如果线程在归还给线程池之前，**没有**再次调用 `get/set`，或者很久之后才调用，那么那块内存（Value）就会一直被占用很长时间。

#### 3. 终极解决方案 (The Final Answer)

```java
try {
    userHolder.set(userInfo);
    // 执行业务
} finally {
    // 必须！显式调用 remove()
    // 这会直接把 Key 和 Value 都清理干净，防止任何泄漏
    userHolder.remove();
}
```
