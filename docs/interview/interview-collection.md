# 集合篇

## ArrayList

扩容机制：

1. new ArrayList() 会使用长度为零的数组，添加第一个元素时会扩容，默认会扩容到 10
2. new ArrayList(int initialCapacity) 会使用指定容量的数组
3. new ArrayList(Collection<? extends E> c) 会使用 c 的大小作为数组容量
4. add(Object o) 首次扩容为 10，再次扩容为上次容量的 约 1.5 倍，约 1.5 的原因是：扩容容量 = 原容量 + 原容量 >>> 1
5. addAll(Collection c) 没有元素时，扩容为 Math.max(10, 实际元素个数)，有元素时为 Math.max(原容量 1.5 倍, 实际元素个数)

ArrayList 不允许遍历时并发修改，会报错 ConcurrentModificationException，属于 Fail-Fast 机制。( modCount 记录修改次数做对比，每次操作 checkForComodification()检查)

## Fail-Fast 和 Fail-Safe

**Fail-Fast**：一旦发现遍历的同事有其他人来修改，立即抛出异常。

例如 ArrayList 遍历不能修改，尽快失败。

**Fail-Safe**：发现遍历的同时的其他人来修改，应当能有应对策略，例如牺牲一致性来让整个遍历运行完成。

例如 CopyOnWriteArrayList 遍历，实现原理是读写分离，新数组写新元素，老数组用来读数据。

> 还有一个加锁的并发安全的 List：**SynchronizedList**

```
package com.jielihaofeng.interview.list;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * @description Fail-Fast 与 Fail-Safe
 * @author Johnnie Wind
 * @date 2022/3/31 14:08
 */
public class FailFastVsFailSafe {
    // Fail-Fast 与 Fail-Safe
    // Fail-Fast：一旦发现遍历的同事有其他人来修改，立即抛出异常。例如 ArrayList
    // Fail-Safe：发现遍历的同时的其他人来修改，应当能有应对策略，例如牺牲一致性来让整个遍历运行完成。例如 CopyOnWriteArrayList

    private static void failFast() {
        List<Student> list = new ArrayList<>();
        list.add(new Student("A"));
        list.add(new Student("B"));
        list.add(new Student("C"));
        list.add(new Student("D"));
        for (Student student : list) {
            System.out.println(student);
        }
        System.out.println(list);
    }

    private static void failSafe() {
        List<Student> list = new CopyOnWriteArrayList<>();
        list.add(new Student("A"));
        list.add(new Student("B"));
        list.add(new Student("C"));
        list.add(new Student("D"));
        for (Student student : list) {
            System.out.println(student);
        }
        System.out.println(list);
    }


    public static class Student {
        public String name;

        public Student(String name) {
            this.name = name;
        }

        @Override
        public String toString() {
            return "Student{" +
                    "name='" + name + '\'' +
                    '}';
        }
    }

    public static void main(String[] args) {
//        failFast();
        failSafe();
    }
}
```

## LinkedList 和 ArrayList 的比较

**ArrayList**

1. 基于数组，需要连续内存
2. 随机访问快，可以根据下标访问（实现 RandomAccess 接口作标记）
3. 尾部插入、删除元素性能可以，其他部分插入、删除都会移动数据，性能会降低
4. 可以利用 cpu 缓存的局部性原理，读数据到缓存行（64 字节）时会把相邻的元素也读进去

**LinkedList**

1. 基于链表，不需要连续内存，占用内存多

2. 随机访问慢，要沿着链表遍历

3. 头尾插入删除性能高，中间插入性能不行

## HashMap

### 1.7 和 1.8 结构区别

1.7：数组 + 链表

1.8：数组 + 链表或红黑树

> **为什么要用红黑树？**
>
> 原本的复杂度是 O(1)，如果 hash 冲突太严重，导致链表太长，查找元素的最坏复杂度会到达 O(n)，红黑树的时间复杂度是 O(logN)。
>
> **为什么一上来不树化？**
>
> 大部分情况下，链表不会那么长，性能比红黑树好，链表长的情况下，红黑树性能更好。并且红黑树占用空间会比较大。
>
> **树化阈值为什么是 8？**
>
> 当 hashCode 离散性很好的时候，树型 bin 用到的概率非常小，因为数据均匀分布在每个 bin 中，几乎不会有 bin 中链表长度会达到阈值。但是在随机 hashCode 下，离散性可能会变差，然而 JDK 又不能阻止用户实现这种不好的 hash 算法，因此就可能导致不均匀的数据分布。不过理想情况下随机 hashCode 算法下所有 bin 中节点的分布频率会遵循泊松分布，我们可以看到，一个 bin 中链表长度达到 8 个元素的概率为 0.0000 0006，几乎是不可能事件。所以，之所以选择 8，不是拍拍屁股决定的，而是根据概率统计决定的。由此可见，发展 30 年的 Java 每一项改动和优化都是非常严谨和科学的。
>
> 红黑树是一种异常情况，一般来说不会超过 8。当有 HashMap Dos 攻击时，专门构造 Hash 码相同的元素攻击。
>
> **何时树化？**
>
> 链表长度超过 8，数组长度大于等于 64。
>
> **何时退化为链表？**
>
> 树的元素个数 <= 6。

### 树化意义：

树化意义红黑树用来避免 DoS 攻击，防止链表超长时性能下降，树化应当是偶然情况，是保底策略。

hash 表的查找，更新的时间复杂度是 O(1)，而红黑树的查找，更新的时间复杂度是 O(log2⁡n )，TreeNode 占用空间也比普通 Node 的大，如非必要，尽量还是使用链表。

hash 值如果足够随机，则在 hash 表内按泊松分布，在负载因子 0.75 的情况下，长度超过 8 的链表出现概率是 0.00000006，树化阈值选择 8 就是为了让树化几率足够小。

### 退化规则

情况 1：在扩容时如果拆分树时，树元素个数 <= 6 则会退化链表

情况 2：remove 树节点之前时，若 root、root.left、root.right、root.left.left 有一个为 null ，也会退化为链表

### 索引计算方法

- 首先，计算对象的 hashCode()
- 再进行调用 HashMap 的 hash() 扰动方法进行二次哈希，和高 16 位做==异或==运算，(h = key.hashCode()) ^ (h >>> 16)，二次 hash() 是为了综合高位数据，让哈希分布更为均匀。
- 最后对容量取模得到索引，==按位与==计算方法： & (capacity – 1)

### 数组容量为何是 2 的 n 次幂

1. 计算索引时效率更高：如果是 2 的 n 次幂可以使用位与运算代替取模

2. 扩容时重新计算索引效率更高： hash & oldCap == 0 的元素留在原来位置 ，否则新位置 = 旧位置 + oldCap

二次 hash 是为了配合 容量是 2 的 n 次幂 这一设计前提，如果 hash 表的容量不是 2 的 n 次幂，则不必二次 hash

**容量是 2 的 n 次幂 这一设计计算索引效率更好，但 hash 的分散性就不好，需要二次 hash 来作为补偿，没有采用这一设计的典型例子是 Hashtable**。

**质数容量的分散性好。**

### put 方法流程

1. HashMap 是懒惰创建数组的，首次使用才创建数组
2. 计算索引（桶下标）
3. 如果桶下标还没人占用，创建 Node 占位返回
4. 如果桶下标已经有人占用
   1. 已经是 TreeNode 走红黑树的添加或更新逻辑
   2. 是普通 Node，走链表的添加或更新逻辑，如果链表长度超过树化阈值，走树化逻辑
5. 返回前检查容量是否超过阈值，一旦超过进行扩容

#### 1.7 与 1.8 的区别

1. 链表插入节点时，1.7 是==头插法==，1.8 是==尾插法==。
2. 1.7 是==大于等于阈值==且==没有空位==时才扩容，而 1.8 是==大于阈值==就扩容。
3. 1.8 在扩容计算 Node 索引时会优化，hash 值跟旧的容量做按位与计算，等于 0 的元素不移动。

### 扩容（加载）因子为何默认是 0.75f

1. 在**空间占用**与**查询时间**之间取得较好的权衡
2. 大于这个值，空间节省了，但链表就会比较长影响性能
3. 小于这个值，冲突减少了，但扩容就会更频繁，空间占用也更多

### 扩容大小

oldCap <<< 1 位

### 并发问题

- `数据错乱`（1.7，1.8 都会存在）

  比如说两个相同桶下标的元素同时进入了 new 节点的代码，会导致一个数据被覆盖而丢失。

- `并发死链`（1.7）

  比如两个元素要迁移，e 指针指向第一个要迁移的元素，假设为 a 元素，next 指向第二个要迁移的元素，b 元素。

  线程 1 和线程 2 同时来迁移元素，其中线程 1 已经完成了元素的迁移，a->b 已经迁移到了新数组成为了 b->a，这个时候线程 2 又来迁移，因为线程 2 还保留了指针指向，迁移后改变指针指向使得 a->b，最终导致 a 和 b==循环指向==。

### Key 能否为 null，作为 key 的对象有什么要求？

1. **HashMap** 的 key 可以为 null，但 Map 的其他实现则不行
2. 作为 key 的对象，必须实现 **hashCode**（分布性） 和 **equals**（索引一样，比较相同对象），并且 **key 的内容不能修改**（不可变）

3. key 的 **hashCode** 应该有良好的散列性

### String 对象的 hashCode()如何设计的，为啥每次乘的是 31

目标是达到较为均匀的散列效果，每个字符串的 hashCode 足够独特

1. 字符串中的每个字符都可以表现为一个数字，称为 S_i，其中 i 的范围是 0 ~ n - 1

2. 散列公式为： S*0∗31^{(n-1)}+ S_1∗31^{(n-2)}+ … S_i ∗ 31^{(n-1-i)}+ …S*{(n-1)}∗31^0

3. 31 代入公式有较好的散列特性，并且 31 \* h 可以被优化为
   1. 即 32 ∗h -h
   2. 即 2^5 ∗h -h
   3. 即 $h≪5 -h$

## Hash 冲突的解决

- 开放寻址法，即线性探测法，ThreadLocalMap
- 链式寻址法，即拉链法，HashMap
- 再 hash 法
- 建立公共溢出区

## Queue 中的 remove()和 poll()的区别

都是删除队列头部元素。

- remove 删除如果为空就抛出异常
- poll 删除如果为空就返回 null
