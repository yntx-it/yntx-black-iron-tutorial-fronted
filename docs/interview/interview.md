---
sidebar_position: 2
---

# 常见面试题

[TOC]

# 算法篇

## 1. 二分查找

算法描述

1. 前提：有已排序数组 A（假设已经做好）
2. 定义左边界 L、右边界 R，确定搜索范围，循环执行二分查找（3、4 两步）
3. 获取中间索引 M = Floor((L+R) /2)
4. 中间索引的值 A[M] 与待搜索的值 T 进行比较
   ① A[M] == T 表示找到，返回中间索引
   ② A[M] > T，中间值右侧的其它元素都大于 T，无需比较，中间索引左边去找，M - 1 设置为右边
   界，重新查找
   ③ A[M] < T，中间值左侧的其它元素都小于 T，无需比较，中间索引右边去找， M + 1 设置为左边
   界，重新查找
5. 当 L > R 时，表示没有找到，应结束循环

## 2. 冒泡排序

算法描述

1. 依次比较数组中相邻两个元素大小，若 a[j] > a[j+1]，则交换两个元素，两两都比较一遍称为一轮
   冒泡，结果是让最大的元素排至最后
2. 重复以上步骤，直到整个数组有序

```
平均时间复杂度O(n2)，有序时间复杂度O(n)
```

## 3. 选择排序

算法描述

1. 将数组分为两个子集，排序的和未排序的，每一轮从未排序的子集中选出最小的元素，放入排序子
   集

2. 重复以上步骤，直到整个数组有序

平均时间复杂度 O(n^2) 集合有序度高的情况下，冒泡优于选择排序。集合有序度低的情况下，选择排序优于冒泡排序。选择是不稳定排序，冒泡是稳定排序。（不会打乱相同元素位置）

## 4. 插入排序

算法描述

1. 将数组分为两个区域，排序区域和未排序区域，每一轮从未排序区域中取出第一个元素，插入到排序区域（需保证顺序）
2. 重复以上步骤，直到整个数组有序

n 插入排序算法实现。采用移动元素，比冒泡排序交换元素次数少。平均时间复杂度是 O(n^2)，大部分情况下，插入都略优于选择排序。有序集合时间复杂度为 O(n)，插入是稳定算法，选择是不稳定。

- 将数组分为两个区，已排序区和未排序区，每一轮排保证从未排序区取出一个元素，插入到排序区域，需要保证顺序

## 5. 希尔排序

算法描述

1. 首先选取一个间隙序列，如 (n/2，n/4 … 1)，n 为数组长度

2. 每一轮将间隙相等的元素视为一组，对组内元素进行插入排序，目的有二
   ① 少量元素插入排序速度很快
   ② 让组内值较大的元素更快地移动到后方

3. 当间隙逐渐减少，直至为 1 时，即可完成排序

## 6. 快速排序

算法描述

1. 每一轮排序选择一个基准点（pivot）进行分区

   1. 让小于基准点的元素的进入一个分区，大于基准点的元素的进入另一个分区
   2. 当分区完成时，基准点元素的位置就是其最终位置

2. 在子分区内重复以上过程，直至子分区元素个数少于等于 1，这体现的是分而治之的思想 （divideand-conquer）

3. 从以上描述可以看出，一个关键在于分区算法，常见的有洛穆托分区方案、双边循环分区方案、霍
   尔分区方案

单边循环快排（lomuto 洛穆托分区方案）

1. 选择最右元素作为基准点元素

2. j 指针负责找到比基准点小的元素，一旦找到则与 i 进行交换

3. i 指针维护小于基准点元素的边界，也是每次交换的目标索引

4. 最后基准点与 i 交换，i 即为分区位置

双边循环快排（不完全等价于 hoare 霍尔分区方案）

1. 选择最左元素作为基准点元素

2. j 指针负责从右向左找比基准点小的元素，i 指针负责从左向右找比基准点大的元素，一旦找到二者
   交换，直至 i，j 相交

3. 最后基准点与 i（此时 i 与 j 相等）交换，i 即为分区位置

## 7. 堆排序

算法描述：

1. 把待排序序列构造成一个大顶堆
2. 堆顶的根节点就是最大元素，把他和末尾元素交换
3. 然后将剩余 n-1 个元素重新构造一个大顶堆，再交换，往返这个步骤。

```java
package com.jielihaofeng.interview.sort;

import java.util.Arrays;

/**
 * 堆排序
 *
 * @author Johnnie Wind
 * @date 2022-04-03 19:39
 */
public class TestHeapSort {

    public static void main(String[] args) {
        int[] arr = {4, 6, 8, 5, 9};
        heapSort(arr);
    }

    private static void heapSort(int[] arr) {
        int temp = 0;

        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            adjustHeap(arr, i, arr.length);
        }

        for (int j = arr.length - 1; j > 0; j--) {
            temp = arr[j];
            arr[j] = arr[0];
            arr[0] = temp;

            adjustHeap(arr, 0, j);
        }
        System.out.println(Arrays.toString(arr));

    }

    private static void adjustHeap(int[] arr, int i, int length) {
        int temp = arr[i];
        for (int k = i * 2 + 1; k < length; k = k * 2 + 1) {
            if (k + 1 < length && arr[k] < arr[k + 1]) {
                k++;
            }
            if (arr[k] > temp) {
                arr[i] = arr[k];
                i = k;
            } else {
                break;
            }
        }
        arr[i] = temp;
    }
}

```

## 8.反转链表

```java
/**
 * 反转链表：迭代法
 * @author Johnnie Wind
 * @date 2022/4/9 13:14
 * @param head 头结点
 * @return ListNode 反转后的链表
 */
public ListNode reverseList(ListNode head) {

    ListNode prev = null;
    ListNode cur = head;
    while (cur != null) {
        ListNode next = cur.next;
        cur.next = prev;
        prev = cur;
        cur = next;
    }

    return prev;
}
```

```java
/**
 * 反转链表：递归法
 * @author Johnnie Wind
 * @date 2022/4/9 13:32
 * @param head 头结点
 * @return ListNode 反转后的链表
 */
public ListNode reverseList1(ListNode head) {
    if (head == null || head.next == null) {
        return head;
    }

    ListNode newNode = reverseList1(head.next);
    head.next.next = head;
    head.next = null;
    return newNode;
}
```

# 基础篇

## JDK8 的新特性

`语法方面`

1. interface & function interface
   - 接口允许 static 和 default 修饰方法，实现
   - 接口和抽象类的区别：
     - 接口多实现，抽象类单继承；
     - 接口方法是 public abstract 修饰，变量是 public static final 修饰，抽象类可以用其他修饰符；
     - 接口的方法更像是一个扩展插件，而抽象类的方法是要继承的
   - 函数式接口：接口只有一个抽象方法的时候，就可以当做函数式接口处理，在 lambda 表达式使用
2. lambda

   - 函数式编程

3. stream

   - 对数据进行检索、筛选、排序、统计、计数，配合 lambda 使用

4. optional

   - 解决 NPE 问题，优雅判断

5. DateTime API

   - LocalDate、LocalTime、LocalDateTime，of、parse 方法转换格式

   - 新的 Date API，线程安全、时区处理、格式化和计算简单

`HashMap`：引入了红黑树

`JVM`：方法区的实现由永久代换成了元空间，使用直接内存区域。

## Java 基本数据类型

| 基本数据类型 | 大小                                                  | 最小值    | 最大值            | 包装器类型 |
| ------------ | ----------------------------------------------------- | --------- | ----------------- | ---------- |
| byte         | 1 字节                                                | -128      | 127               | Byte       |
| char         | 2 字节                                                | unicode 0 | unicode 2^16^ - 1 | Character  |
| short        | 2 字节                                                | -2^15^    | 2^15^-1           | Short      |
| int          | 4 字节                                                | -2^31^    | 2^31^ - 1         | Integer    |
| long         | 8 字节                                                | -2^63^    | 2^63^ - 1         | Long       |
| float        | 4 字节                                                | IEEE 754  | IEEE 754          | Float      |
| double       | 8 字节                                                | IEEE 754  | IEEE 754          | Double     |
| boolean      | 单独编译为 int，4 字节；<br />数组编译为 byte，1 字节 |           |                   | Boolean    |

## hashCode 和 equals 的作用

作用：

- hashCode 的作用是返回一个对象的 hash 值，利用对象地址生成一个 int 类型的数。
- equals 是用来比较两个对象是否是同一个对象。

关系：

- 重写了 equals 必须重写 hashCode，保证 hashCode 相等。
- 不相等的对象可能会有相同的 hashCode 值， Map 和 Set 集合里找元素时，需要通过 equals 判断两个 key 是否是同一个 key。

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

# 设计模式篇

## 单例模式

要求

- 掌握五种单例模式的实现方式
- 理解为何 DCL 实现时要使用 volatile 修饰静态变量
- 了解 jdk 中用到单例的场景

### 饿汉式

```java
package com.jielihaofeng.interview.pattern;

import java.io.Serializable;

/**
 * @description 饿汉式单例
 * @author Johnnie Wind
 * @date 2022/3/31 16:41
 */
public class Singleton1 implements Serializable {

    private Singleton1() {
        // 防止反射破坏单例
        if (INSTANCE != null) {
            throw new RuntimeException("单例对象不能重复创建");
        }
        System.out.println("private Singleton1()");
    }

    private static final Singleton1 INSTANCE = new Singleton1();

    public static Singleton1 getInstance() {
        return INSTANCE;
    }

    public static void otherMethod() {
        System.out.println("otherMethod()");
    }

    // 防止反序列化破坏单例
    public Object readResolve() {
        return INSTANCE;
    }
}
```

构造方法抛出异常是防止反射破坏单例
readResolve() 是防止反序列化破坏单例

### 枚举饿汉式

```java
package com.jielihaofeng.interview.pattern;

/**
 * @description 枚举饿汉式单例（枚举饿汉式能天然防止反射、反序列化破坏单例）
 * @author Johnnie Wind
 * @date 2022/3/31 16:45
 */
public enum Singleton2 {

    INSTANCE;

    private Singleton2() {
        System.out.println("private Singleton2()");
    }

    @Override
    public String toString() {
        return getClass().getName() + "@" + Integer.toHexString(hashCode());
    }

    public static Singleton2 getInstance() {
        return INSTANCE;
    }

    public static void otherMethod() {
        System.out.println("otherMethod()");
    }
}

```

枚举饿汉式能天然防止反射、反序列化破坏单例

### 懒汉式

```java
package com.jielihaofeng.interview.pattern;

/**
 * @description 懒汉式单例
 * @author Johnnie Wind
 * @date 2022/3/31 17:06
 */
public class Singleton3 {

    private Singleton3() {
        // 防止反射破坏单例
        if (INSTANCE != null) {
            throw new RuntimeException("单例对象不能重复创建");
        }
        System.out.println("private Singleton3()");
    }

    private static Singleton3 INSTANCE = null;

    // 这里有多线程并发问题，所以加了synchronized锁。如果INSTANCE创建好了，就不需要同步了，但后续线程调用还是串行化。
    public static synchronized Singleton3 getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new Singleton3();
        }
        return INSTANCE;
    }

    public static void otherMethod() {
        System.out.println("otherMethod()");
    }

    // 防止反序列化破坏单例
    public Object readResolve() {
        return INSTANCE;
    }

}
```

其实只有首次创建单例对象时才需要同步，但该代码实际上每次调用都会同步
因此有了下面的双检锁改进

### 双检锁懒汉式

```java
package com.jielihaofeng.interview.pattern;

/**
 * @description 懒汉式单例 DCL(Double Check Lock)
 * @author Johnnie Wind
 * @date 2022/3/31 17:06
 */
public class Singleton4 {

    private Singleton4() {
        // 防止反射破坏单例
        if (INSTANCE != null) {
            throw new RuntimeException("单例对象不能重复创建");
        }
        System.out.println("private Singleton4()");
    }

    // 这里必须加 volatile，解决可见性和有序性，防止指令重排序，
    private static volatile Singleton4 INSTANCE = null;

    // 双重检查锁改进
    public static Singleton4 getInstance() {
        if (INSTANCE == null) {
            synchronized (Singleton4.class) {
                if (INSTANCE == null) {
                    // 这里可能发生指令重排序：
                    // 1.创建对象，分配空间
                    // 2.调用构造，初始化
                    // 3.给静态变量赋值
                    // 如果第3和2互换了，就会导致另一个线程在最外层if判断时拿到一个初始化为完全的INSTANCE对象
                    INSTANCE = new Singleton4();
                }
            }
        }
        return INSTANCE;
    }

    public static void otherMethod() {
        System.out.println("otherMethod()");
    }

    // 防止反序列化破坏单例
    public Object readResolve() {
        return INSTANCE;
    }

}

```

为何必须加 volatile：
INSTANCE = new Singleton4() 不是原子的，分成 3 步：创建对象、调用构造、给静态变量赋
值，其中后两步可能被指令重排序优化，变成先赋值、再调用构造
如果线程 1 先执行了赋值，线程 2 执行到第一个 INSTANCE == null 时发现 INSTANCE 已经不为
null，此时就会返回一个未完全构造的对象

### 静态内部类懒汉式

```java
package com.jielihaofeng.interview.pattern;

/**
 * @description 懒汉式单例 - 内部类
 * @author Johnnie Wind
 * @date 2022/3/31 17:18
 */
public class Singleton5 {

    private Singleton5() {
        System.out.println("private Singleton5()");
    }

    private static class Holder {
        static Singleton5 INSTANCE = new Singleton5();
    }

    public static Singleton5 getInstance() {
        return Holder.INSTANCE;
    }

    public static void otherMethod() {
        System.out.println("otherMethod");
    }
}
```

避免了双检锁的缺点，比较推荐

### JDK 中单例的体现

**Runtime** 体现了 **饿汉式单例**

```java
public class Runtime {
    private static Runtime currentRuntime = new Runtime();
    public static Runtime getRuntime() {
        return currentRuntime;
    }
    private Runtime() {}
	...
}
```

**Collections** 中的 **EmptyNavigableSet** **内部类懒汉式单例**

```java
{
	...
    private static class EmptyNavigableSet<E> extends UnmodifiableNavigableSet<E>
        implements Serializable {
        private static final long serialVersionUID = -6291252904449939134L;

        public EmptyNavigableSet() {
            super(new TreeSet<E>());
        }

        private Object readResolve()        { return EMPTY_NAVIGABLE_SET; }
    }

    @SuppressWarnings("rawtypes")
    private static final NavigableSet<?> EMPTY_NAVIGABLE_SET =
        new EmptyNavigableSet<>();
    ...
}
```

**ReverseComparator.REVERSE_ORDER** **内部类懒汉式单例**

```java
{
    ...
    public static <T> Comparator<T> reverseOrder() {
        return (Comparator<T>) ReverseComparator.REVERSE_ORDER;
    }

    /**
     * @serial include
     */
    private static class ReverseComparator
        implements Comparator<Comparable<Object>>, Serializable {

        private static final long serialVersionUID = 7207038068494060240L;

        static final ReverseComparator REVERSE_ORDER
            = new ReverseComparator();

        public int compare(Comparable<Object> c1, Comparable<Object> c2) {
            return c2.compareTo(c1);
        }

        private Object readResolve() { return Collections.reverseOrder(); }

        @Override
        public Comparator<Comparable<Object>> reversed() {
            return Comparator.naturalOrder();
        }
    }
    ...
}
```

**Comparators.NaturalOrderComparator.INSTANCE** **枚举饿汉式单例**

```java
{
    ...
    enum NaturalOrderComparator implements Comparator<Comparable<Object>> {
        INSTANCE;

        @Override
        public int compare(Comparable<Object> c1, Comparable<Object> c2) {
            return c1.compareTo(c2);
        }

        @Override
        public Comparator<Comparable<Object>> reversed() {
            return Comparator.reverseOrder();
        }
    }
    ...
}
```

**Console** 体现了 **双检锁懒汉式单例**

# 并发篇

## Java 线程的状态

- `新建 New`
  当一个线程对象被创建，但还未调用 start 方法时处于新建状态。
  此时未与操作系统底层线程关联。
- `可运行 Runnable`
  调用了 start 方法，就会由新建进入可运行。
  此时与底层线程关联，由操作系统调度执行。
- `终结 Terminated`
  线程内代码已经执行完毕，由可运行进入终结。
  此时会取消与底层线程关联。
- `阻塞 Blocked`
  当获取锁失败后，由可运行进入 Monitor 的阻塞队列阻塞，此时不占用 cpu 时间。
  当持锁线程释放锁时，会按照一定规则唤醒阻塞队列中的阻塞线程，唤醒后的线程进入可运行
  状态。
- `等待 Waiting`
  当获取锁成功后，但由于条件不满足，调用了 wait() 方法，此时从可运行状态释放锁进入
  Monitor 等待集合等待，同样不占用 cpu 时间
  当其它持锁线程调用 notify() 或 notifyAll() 方法，会按照一定规则唤醒等待集合中的等待线
  程，恢复为可运行状态
- `有时限等待 Timed Waiting`
  当获取锁成功后，但由于条件不满足，调用了 wait(long) 方法，此时从可运行状态释放锁进
  入 Monitor 等待集合进行有时限等待，同样不占用 cpu 时间
  当其它持锁线程调用 notify() 或 notifyAll() 方法，会按照一定规则唤醒等待集合中的有时限等
  待线程，恢复为可运行状态，并重新去竞争锁
  如果等待超时，也会从有时限等待状态恢复为可运行状态，并重新去竞争锁
  还有一种情况是调用 sleep(long) 方法也会从可运行状态进入有时限等待状态，但与 Monitor
  无关，不需要主动唤醒，超时时间到自然恢复为可运行状态

> 其它情况（只需了解）
>
> - 可以用 interrupt() 方法打断等待、有时限等待的线程，让它们恢复为可运行状态
>
> - park，unpark 等方法也可以让线程等待和唤醒

## 线程池

#### 七大参数：

- `corePoolSize`：核心线程数，池中会保留的核心线程数
- `maximumPoolSize`：最大线程数 = 核心线程数 + 救急线程数
- `keepAliveTime`：救急线程存活时间，如果该时间内没有任务，该线程被释放
- `unit`：救急线程存活时间单位，如秒、毫秒等
- `workQueue`：工作队列，当没有空闲核心线程时，任务会加入到该队列，当队列满时会创建救急线程执行任务
- `threadFactory`：线程工厂，定制创建线程的名字，是否守护线程等等
- `handler`：拒绝策略，当所有线程都在繁忙，workQueue 也满了时，会触发拒绝策略，JDK 提供的拒绝策略有四种：
  - **AbortPolicy**：拒绝执行，直接抛出异常。
  - **CallerRunPolicy**：由调用者创建线程执行任务。
  - **DiscardPolicy**：直接丢弃任务。
  - **DiscardOldestPolicy**：丢弃最早进入队列的任务。

#### 如何分配线程数量？

假设我们的 CPU 的线程数为 N，一般的经验做法是：

- CPU 密集型：N+1（CPU 一直全速运行）
- IO 密集型：2N（并不是一直在执行任务，可能会阻塞）

具体开多少还是得压测才能确定下来。

#### 为什么要用阻塞队列而不用非阻塞队列？

线程池是采用生产者-消费者模式设计的，线程池是消费者。

工作线程调用 take()方法获得任务，如果没有元素时会阻塞在 take()方法，释放 CPU 资源。当阻塞队列有任务时才被唤醒对应线程从队列中取出任务执行。

#### execute 流程

1. 判断是 runnable 否为 null
2. 获取 ctl 进而获取正在工作的线程数，判断是否小于核心线程数
3. 创建核心线程，执行任务
4. 如果添加核心线程数失败，重新获取 ctl
5. 获取线程池状态，如果线程池正在运行，把任务加到阻塞队列
6. 否则，尝试创建最大线程数（救急线程），成功返回 true，失败执行拒绝策略

## wait()和 sleep()的区别

**共同点**：都可以放弃 CPU 的使用权，进入等待状态，都可以被打断 interrupt() 唤醒。

**不同点**：**方法归属**、**醒来时机**、**锁的特性** 三个方面。

- 方法归属：wait 是 Object 的成员方法，每个对象都有 wait 方法；sleep 是线程 Thread 的静态方法。
- 醒来时机
  - sleep(long)和 wait(long)都会在一定时间后醒来。
  - wait(long)和 wait()还可以被 notify 唤醒，wait()如果不唤醒就会一直等下去。
- 锁的特性
  - wait 方法的调用必须获取对象的锁，而 sleep 不用。
  - wait 方法执行后会释放对象锁，允许其他线程抢占锁；而 sleep 如果在 synchronized 代码块中执行，会一直持有锁，不释放。

## 生产者和消费者模式假死现象

生产者/消费者模型最终达到的目的是平衡生产者和消费者的处理能力，达到这个目的的过程中，并不要求只有一个生产者和一个消费者。可以多个生产者对应多个消费者，可以一个生产者对应一个消费者，可以多个生产者对应一个消费者。

假死就发生在上面三种场景下。理论分析就能说明问题，所以就不写代码了。开一个生产者线程/多个消费者线程、开多个生产者线程/消费者线程、开多个生产者线程/多个消费者线程都可以。假死指的是全部线程都进入了 WAITING 状态，那么程序就不再执行任何业务功能了，整个项目呈现停滞状态。

比方说有生产者 A 和生产者 B，缓冲区由于空了，消费者处于 WAITING。生产者 B 处于 WAITING，生产者 A 被消费者通知生产，生产者 A 生产出来的产品本应该通知消费者，结果通知了生产者 B，生产者 B 被唤醒，发现缓冲区满了，于是继续 WAITING。至此，两个生产者线程处于 WAITING，消费者处于 WAITING，系统假死。

上面的分析可以看出，假死出现的原因是因为 notify 的是同类，所以非单生产者/单消费者的场景，可以采取两种方法解决这个问题：

1、synchronized 用 notifyAll()唤醒所有线程、ReentrantLock 用 signalAll()唤醒所有线程

2、用 ReentrantLock 定义两个 Condition，一个表示生产者的 Condition，一个表示消费者的 Condition，唤醒的时候调用相应的 Condition 的 signal()方法就可以了

## 死锁

死锁的四个条件：

- 互斥等待：不可破坏
- 请求和保持：一次性申请所有资源
- 不可抢占：申请不到主动释放
- 循环等待：按序申请

## synchronized

synchronized 是 Java 的一个关键字，提供一种==互斥锁==，只允许一个线程进入同步代码块，其他线程只能阻塞等待。

加锁对象情况：

- 如果修饰静态方法，就是给当前类的对象加锁。
- 如果修饰的是成员方法，就是给当前类的实例对象加锁。
- 如果修饰的是代码块，给传入的对象实例加锁。

实现原理：编译后的字节码可以发现

- 修饰方法时，会用 ACC_SYNCHRONIZED 关键字来标识
- 修饰代码块时，会 依赖 monitorenter 和 monitorexit 指令

**首先讲一下对象的构成：**

在内存中的 Java 对象，分为==对象头==、==对象实际数据==和==对齐填充==。（数组还有长度字段）

重点在于对象头，对象头分为 ==mark word== 和 ==class point==。

mark word 主要存储==对象的 hashcode==、==GC 分代年龄==和==锁的相关信息==。

**monitor 对象的构成：**

每个对象都会有个对应的 ==object monitor== 对象，==monitor== 对象中主要存储三个部分，==owner== 、==wait set==、==entry list==。

==owner==：记录当前获得锁线程。

==wait set==：存放 wait()等待的线程。

==entry list==：存放等待获取锁额线程。

重量级锁：

JDK 1.6 之前是重量级锁，当线程进入同步代码块时，monitor 对象会把 当前线程的 ID 存储，并且设置 mark word 的 monitor 对象地址，把阻塞的线程存储到 entry list 中。

底层实现：依赖操作系统的 mutex 相关指令，所以会有 用户态 和 内核态之间的切换，性能损耗明显。

偏向锁：没有竞争的情况下，JVM 认为只有某个线程才会执行同步代码。

1. 在 Mark Word 会直接记录当前线程 ID，只要线程来执行代码了，会比较线程 ID 是否相等，相等就直接获取锁，执行代码。
2. 如果不相等，就会使用 CAS 来修改 Mark word 中当前线程 ID，如果 CAS 成功，就获取锁，执行同步代码。
3. 如果 CAS 失败，存在竞争环境，就会升级到轻量级锁。

轻量级锁：

1. 当前线程会在栈帧下创建 Lock Record 锁记录，锁记录会把 Mark Word 的信息拷贝进去，且有多个 Owner 指针指向加锁对象。
2. 线程执行到同步代码时，则用 CAS 试图将 Mark Word 的指向到线程栈帧的 Lock Record，假设 CAS 修改成功，则获取得到轻量级锁。
3. 假设修改失败，则自旋（重试），自旋一定次数后，则升级为重量级锁。

## Lock 和 synchronized 的区别

主要从 **语法**、**功能**、**性能** 三个层面阐述。

- 语法层面
  - synchronized 是关键字，源码在 JVM 中，C++ 实现
  - Lock 是接口，源码在 JDK 中，Java 实现
  - 使用 synchronized 时，临界区代码执行完会自动释放锁，而 Lock 要手动释放锁。
- 功能层面

  - 都是悲观锁，互斥、同步、锁重入
  - Lock 提供了一些 synchronized 不具备的功能：获取等待状态、==公平锁==、==可打断==、==可超时==、==多条件变量（Condition）==
  - Lock 有适合不同场景的实现，如 ReentrantLock、ReentrantReadWriteLock

- 性能层面
  - 在没有竞争时，synchronized 做了很多优化，如偏向锁、轻量级锁，性能不赖
  - 在竞争激烈时，Lock 通常性能比较好

> 公平锁
>
> - 公平锁的公平体现
> - 已经处在阻塞队列中的线程始终都是公平的，先进先出
> - 公平锁是指未处于阻塞队列的线程来获取锁时，要判断队列是否为空，不为空就必须加入到队列
> - 非公平锁是指未处阻塞队列的线程来获取锁时，直接抢占，谁抢到就是谁的
> - 公平锁会降低吞吐量，一般不用

> 条件变量
>
> - ReentrantLock 中的条件变量类似于 synchronized 中的 wait，notify，用在线程获得锁发现条件不满足时，临时加入等待的链表结构
> - ReentrantLock 中的条件变量可以有多个，实现更加精细的等待和唤醒控制

> sychronized 抛异常可以释放锁，编译后字节码会有异常表，保证异常时正常解锁。
>
> reentrantLock 可以跨方法释放锁吗，可以，但是最好不要，可重入锁是针对线程的，不是针对方法的。

## AQS 原理

AQS，全称为 ==AbstractQueueSynchronizer==，==抽象队列同步器==。它是 JDK 提供给我们的一个可以实现==锁==的框架，内部实现的关键就是维护了一个==先进先出的队列==和 ==state 状态变量==。

先进先出队列的载体就是 Node，节点标识当前的状态值，独占还是共享模式，前驱和后续节点。

AQS 定义了模板，具体实现由子类实现。

流程：把需要等待的线程以 Node 的形式存入先进先出的队列上，state 变量表示当前锁的状态。

子类：ReentrantLock、ReentrantReadWriteLock、Semphore、CountDownLatch

## ReentrantLock 加锁、解锁流程

以非公平锁为例

加锁流程：lock -> CAS -> acquire -> tryAcquire -> state == 0 CAS -> 当前线程获得锁？-> 加入队列 -> 头节点？-> CAS -> park

1. 调用 lock 时，CAS 尝试获取锁，获取成功就可以执行
2. CAS 获取锁失败，则调用 AQS 的 acquire 方法
3. 调用子类的 tryAcquire 方法
4. 判断当前的 state 是否等于 0，等于 0 说明没有线程持有锁，尝试获取锁
5. 如果 CAS 成功，执行同步代码
6. 如果 CAS 获取锁失败，判断当前线程是否持有锁，如果持有，更新 state 的值，获取锁（可重入）
7. 如果 CAS 失败，且持有锁的不是当前线程，回到 tryAcquire 入队列
8. 加入队列后，会判断前驱节点是不是头节点，如果是头节点又会用 CAS 尝试获取锁
9. 如果没有获取锁，就会将前驱节点状态设置为 Signal
10. 最后调用 LockSurpport.park() 方法将线程挂起

解锁流程：

1. 调用 unlock()时，会调用 AQS 的 release 方法，release 方法又会调用子类的 tryRelease 方法
2. tryRelease 会把 state 减一，如果减到 0，说明当前线程把锁释放了
3. 随后从 队尾 往前找节点，状态要 <0 ，并且离头节点最近的老二节点唤醒，LockSupport.unpark
4. 唤醒之后，被唤醒的线程尝试 CAS 获取锁，

## volatile

volatile 是 Java 语言提供的一个关键字，它可以用来保证变量的可见性和有序性。

并发编程中需要考虑的三个问题：原子性、可见性和有序性。

> 原子性
>
> 起因：多线程下，不同线程的指令发生了交错导致了共享变量的读写顺序混乱。
>
> 解决：volatile 只能保证变量的可见性和有序性，不能解决原子性问题。原子性问题需要用悲观锁或乐观锁来解决。

> 可见性
>
> 为了提升 CPU 的利用率，CPU 增加了寄存器和三级高速缓存，L1 和 L2 缓存是 CPU 私有的，如果两个线程同时把一个变量的数据加载到自己的高速缓存中，再分别修改，就引发了缓存一致性问题。为了解决缓存一致性问题，CPU 引入了总线锁和缓存锁。总线锁就是在总线上声明一个 Lock#信号，它可以保证只有当前 CPU 可以访问共享内存，其他的处理器请求会被阻塞，解决缓存不一致的问题。缓存锁是一种优化，如果当前 CPU 访问的数据已经缓存在其他 CPU 的高速缓存中，它就采用缓存一致性协议来保证缓存一致性。一致性协议的过程：当一个 CPU 修改了共享变量的值之后会刷新到主内存中，并通知其他 CPU 失效自己的缓存，每次重新去主内存加载。
>
> 起因：对共享变量所做的修改对其他线程不可见。
>
> 解决：valatile 底层实现就是会在修改命令前面加上一个 Lock# 信号，基于缓存锁或总线锁来保证结果可见。用 volatile 修饰共享变量，能够防止编译器等优化发生，让一个线程对共享变量的修改对另一个线程可见。

> 有序性
>
> 起因：由于 CPU 指令重排序优化、CPU 缓存优化或编译器优化导致的指令实际执行顺序和编写顺序不一致。
>
> 解决：用 volatile 修饰共享变量，会在读、写共享变量时加入不同的屏障，阻止其他读写操作越过屏障，从而达到阻止排序的效果
>
> 写屏障：阻止**上方**其他**写操作**越过屏障到 volatile 变量的写之下。
>
> 读屏障：阻止**下方**其他**读操作**越过屏障到 volatile 变量的读之上。

## CAS

CAS 是 Java ==Unsafe 类==中的一个方法，全称是 ==compareAndSwap==，比较并交换，它是一个 CPU 原子性的指令，对应到 CPU 指令为 ==lock cmpxchg==，主要作用是==保证多线程环境下对共享变量修改的原子性==。

它的用法是：传入对应对象实例，对应变量的偏移量、预期值、新值，它会去比较内存中变量的值和传入的预期值是否相等，相等则修改为新值。

而这个操作在底层也会出现原子性问题，所以在==多核 CPU 环境下增加 Lock 指令对缓存或者总线去加锁==，来保证比较并替换的两个操作的原子性。

1. JUC 中：Atomic 原子类实现
2. 实现多线程对共享资源竞争的互斥性质：AQS，ConcurrentHashMap 等

缺点：

1. 作为自旋锁的实现，会消耗大量 CPU 资源。并发高时性能不如加锁。
2. ABA 问题（AtomicStampedReference 加版本号解决）。
3. 只能保证一个共享变量的原子操作，多个变量的原子操作需要使用锁或者 AtomicReference 类。

## 悲观锁 vs 乐观锁

悲观锁：线程占有了锁，才能去操作共享变量，每次只有一个线程可以获得锁，获取锁失败的线程都阻塞。

> 线程需要进入阻塞状态，再到唤醒状态。导致上下文切换频繁，影响性能。
>
> 实际上，线程在获取 synchronized 和 Lock 锁时，如果锁已被占用，都会做几次重试操作，减少阻塞的机会。

乐观锁：无需加锁，每次只有一个线程可以成功修改共享变量，其他线程不停重试，直到成功。

> 线程一直运行，不需要阻塞，不会发生线程上下文切换。
>
> 需要多核 CPU 支持，线程数不应超过 CPU 核数。

## Semaphore

Semaphore 信号量，用来限制能够同时访问共享资源的线程上限。可以使用 Semaphore 限流，但只是单机版，分布式不能使用。

permits 许可数量。

acquire() 申请许可，如果申请不到就会进入 AQS 队列 park 阻塞。

release() 释放许可，唤醒 AQS 队列中的节点。

## CountDownLatch vs CyclicBarrier

CountDownLatch 倒计时器：允许一个或多个线程一直等待，直到完成他们的操作。

CyclicBarrier 循环栅栏：当线程达到某状态后，暂停下来等待其他线程，等到所有线程到达后，才继续执行。

CountDownLatch 用完了，就结束了，没法复用。而 CyclicBarrier 不一样，它可以复用。

两者都是线程同步的工具类，但他们的等待的主体不一样：CountDownLatch 一般是主线程/调用线程等待 await()，CyclicBarrier 一般是任务线程等待 await()。

这两个类都是基于 AQS 实现的。

当构建 CountDownLatch 对象时，我们会传参 count，这个参数会赋值给 AQ S 的关键变量 state，当执行 countdown 方法时，就是利用 cas 将 state 值减 1；执行 await()方法，就是判断这个 state 的值是否为 0，不为 0 就会加入到阻塞队列中，将该线程阻塞。当 state 为 0 时，会把队列里阻塞的线程节点都唤醒。

CyclicBarrier 是利用 ReentrantLock 来实现的，他是借助 ReentrantLock + Condition 来实现的。在构建 CyclicBarrier 的时候，传入的 parties 值会赋值给 count 和 parties 变量，每次调用 await() 时，会将 count-1，操作 count 值是直接使用 ReentrantLock 来保证线程安全性，如果 count 不为 0，则添加到 condition 队列中，如果 count 等于 0，就会把 condition 队列全部唤醒，并且将 parties 值重新赋值给 count ，实现复用。

## Hashtable vs ConcurrentHashMap

相同点：都是**线程安全**的 Map 集合。

不同点：

- Hashtable 并发度低，整个 Hashtable 对应一把锁，同一时刻只有一个线程操作它。
- ConcurrentHashMap 并发度高，整个 ConcurrentHashMap 对应多把锁，只要线程访问的是不用锁，就不会冲突。

### ConcurrentHashMap 1.7 的实现

- 数据结构：Segment(大数组) + HashEntry(小数组) + 链表，每个 Segment 对应一把锁。
- 并发度：Segment 大小即并发度，同一时刻最多能有多少个线程并发访问。Segment 不能扩容，意味着并发度在 ConcurrentHashMap 创建时就固定了。
- 索引计算：
  - 大数组长度是 2^m，key 在大数组内的索引是 key 的**二次 hash 值**的**高 m 位**
  - 小数组长度是 2^n，key 在小数组内的索引是 key 的**二次 hash 值**的**低 n 位**
- 扩容：每个小数组扩容相对独立，小数组在==超过==扩容因子 0.75 时会触发扩容，每次==扩容翻倍==
- Segment[0]原型：首次创建其他小数组时，会以此原型为依据，数组长度，扩容因子都会以原型为准
- 饿汉式初始化

### ConcurrentHashMap 1.8 的实现

- 数据结构： Node 数组 + 链表或红黑树，数组的每个头结点作为锁，如果多个线程访问的头结点不同，则不会冲突。首次生成头节点时如果发生竞争，利用 cas 而非 synchronized，进一步提升性能。
- 并发度：Node 数组有多大，并发度就有多大，与 1.7 不同，Node 数组可以扩容。
- 扩容条件：Node 数组满 3/4 时就会扩容（7 是超过）。
- 扩容单位：以链表为单位从后向前迁移链表，迁移完成的将旧数组头结点替换为 ForwardingNode
- 扩容时并发 get
  - 根据是否为 ForwardingNode 来决定是在新数组找还是旧数组找，不会阻塞
  - 如果链表长度超过 1，则需要对节点进行复制（创建新节点），主要是怕节点迁移后 next 指针改变
  - 如果链表最后几个元素扩容后索引不变，则节点无需复制
- 扩容时并发 put

  - 如果 put 的线程与扩容线程的链表是同一个，put 线程会阻塞，扩容完才能 put
  - 如果 put 的线程操作的链表还未迁移完成，即头节点不是 ForwardingNode，则可以并发执行
  - 如果 put 的线程操作的链表已经完成，即头节点是 ForwardingNode，则可以协助扩容（每个线程可以处理 16 个链表的迁移），扩容完才能 put

- 懒惰初始化，第一次 put 元素时才会初始化
- capacity 代表预估的元素个数，capacity / factory 来计算出初始数组大小，需要贴近 2 ^ n。例如 capacity = 16，初始化后会等于 32。
- loadFactor 只在计算初始数组大小时被使用，之后扩容固定为 3/4。
- 超过树化阈值的扩容问题，如果容量已经是 64，直接树化，否则在原来容量基础上做 3 轮扩容。

## ThreadLocal 的理解

**作用**：**实现资源对象线程间隔离，资线程内共享。**

1. ThreadLocal 可以实现 资源对象 的线程隔离，让每个线程各用各的 资源对象，避免争用引发线程安全问题
2. ThreadLocal 同时实现了线程内的资源共享

**原理**：**每个线程内都有一个 ThreadLocalMap 类型的成员变量，用来存储资源对象。**

- 调用 set 方法，就是以 ThreadLocal 自己作为 key，资源对象作为 value，放入当前线程的 ThreadLocalMap 集合中
- 调用 get 方法，就是以 ThreadLocal 自己作为 key，到当前线程中查找关联的资源值
- 调用 remove 方法，就是以 ThreadLocal 自己作为 key，移除当前线程关联的资源值

**特点:**

- ==hash 值==： hash 值统一分配，nextHashCoded 是 AtomicInteger 对象，从魔数 0x61c88647(1640531527)自增。
- ==容量和扩容==：初始容量 16，扩容因子 2/3，扩容容量翻倍。
- key 索引冲突后用**开放寻址法**解决冲突，冲突后会找下一个空闲位置

**为什么 ThreadLocalMap 的 key 设计成弱引用？**

- 线程可能长时间运行，如果 key 不再使用，需要在内存不足时释放其占用的内存。

- 但是 GC 只是让 key 的内存释放，后续还要根据可以是否为 null 来释放值的内存。

**内存释放时机**

- 被动 GC 释放 key
  - 让 key 的内存释放，关联的 value 不会释放
- 懒惰被动释放 value

  - get key 发现 null key，把自己的 key 放进去，把 value 清空。
  - set key 时，会使用==启发式扫描==，清除临近的 null key，启发次数与元素个数，是否发现 null key 有关。

- 主动 remove 释放 key（推荐）
  - 会同时释放 key 和 value，临近的 null key 的 value 也会清除
  - 推荐使用，因为一般我们使用 ThreadLocal 都是定义的静态变量（强引用），无法被动的靠 GC 回收。

# JVM 篇

## 1.JVM 内存结构

记住这个图

![image-20220401144305110](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401144305110.png)

**运行时数据区**：方法区、堆、虚拟机栈、本地方法栈、程序计数器。

> **方法区**：类的元数据、即时编译器的代码缓存。

> **堆**：用来存放对象实例。JDK7 把字符串常量池、静态变量放到了堆中。

> **虚拟机栈**：每个方法执行时都会创建一个栈帧，存放局部变量表、操作数栈、动态连接、方法出口等信息。

> **本地方法栈**：和虚拟机栈类似，主要是 Native 方法存储相关信息。Oracle 的 Hotspot 虚拟机是合二为一的。

> **程序计数器**：用来记录当前线程下一条 JVM 字节码指令的执行地址。如果是本地方法计数器为空。

- 堆和方法区是**线程共享**的。
- 虚拟机栈、本地方法栈、程序计数器是**线程私有**的。

### 内存溢出的区域

**程序计数器**不会内存溢出。

**OutOfMemoryError**：

- 堆内存耗尽：对象越来越多，一直使用不能回收。
- 方法区内存耗尽：加载的类越来越多，动态生成大量类。
- 虚拟机栈耗尽：每个线程最多占用 1M 内存，线程个数越来越多，又不销毁。

**StackOverflowError**：

- JVM 虚拟机栈：==方法递归==调用没有正确结束，反序列化 JSON 时==循环引用==。

## OOM 内存溢出问题

说出几种典型的内存溢出情况

- ==堆内存==：线程池使用无界阻塞队列 LinkedBlockingQueue，任务堆满了，堆内存溢出。
- ==堆内存==：查询数据量太大。
- ==虚拟机栈==：线程池使用 newCachedThreadPool，线程创建数量大，超过了虚拟机允许最大栈内存。
- ==方法区==：反射动态生成类。

### 方法区、永久代、元空间之间的关系

- 方法区：JVM 规范定义的一块内存区域，用来存储类元数据、方法字节码、即时编译器需要的信息。
- 永久代：1.8 **前** Hotspot 虚拟机对 JVM 规范的实现
- 元空间：1.8 **后** Hotspot 虚拟机对 JVM 规范的实现，使用**本地内存**作为这些信息的存储空间。

## 常见的 JVM 内存参数

-Xms：最小堆内存

-Xmx：最大堆内存

**建议设置成大小相等，不需要保留内存来动态扩大和缩小，这样性能好。**

-XX:NewSize 与 -XX:NewSize 设置新生代的最小值和最大值，建议不要设置，JVM 自己控制。

-Xmn：设置新生代大小，相当于同时设置了-XX:NewSize 与 -XX:NewSize，并且取值相等。

-XX:SurvivorRatio：幸存区比例

## 垃圾回收算法

三种算法：**标记清除**、**标记整理**、**标记复制**

### 1. 标记清除法

过程：

1. 找到 GC Root 对象（GC Root 对象：一定不会被回收的对象，**局部变量**和**静态变量**引用的对象）

2. 标记阶段：沿着 GC Root 对象的引用链找，直接或间接引用到的对象加上标记
3. 清除阶段：直接释放未加标记对象占用的内存

优点：速度较快

缺点：会产内存碎片，造成空间不连续

要点：

- 标记速度和存活对象成线性关系
- 清除速度和对象大小成线性关系

### 2. 标记整理法

过程：

1. 标记阶段、清除阶段和标记清除法类似

2. 整理阶段：将存活对象朝着一段移动，避免内存碎片产生

优点：没有内存碎片

缺点：速度比标记清除慢

要点：

- 标记速度和存活对象成线性关系
- 清除与整理速度和对象大小成线性关系

### 3. 标记复制法

过程：

1. 将整个内存分为两块大小相等的区域，from 和 to，其中 to 总是处于空闲，from 存储新创建的对象
2. 标记阶段和前面算法类型
3. 找出存活对象后，会把他们从 from 复制到 to 区域，复制过程中自然完成了碎片整理
4. 复制完成后，交换 from 和 to 的位置

特点：

- 标记与复制速度与存活对象成线性关系

优点：没有内存碎片，比标记整理速度快

缺点：占用双倍内存空间

## 3.GC 和分代回收算法

GC：就是垃圾回收，实现对无用对象内存自动释放，减少内存碎片、加快分配速度。

回收区域：堆内存，不用回收虚拟机栈，虚拟机栈内存随着线程的销毁而释放

可以作为 GC Roots 的对象：

1. 虚拟机栈栈帧的本地变量表引用的对象
2. 方法区静态变量引用的对象
3. 方法区常量引用的对象
4. 本地方法栈中 JNI（Native 方法）引用的对象
5. 虚拟机内部的引用，Class 类、异常类、类加载器
6. synchronized 关键字修饰的对象

判断无用对象：可达性分析算法、三色标记法，标记存活对象，回收未标记对象

- 三色标记：黑色已标记，灰色标记中，白色还未标记

分代回收思想：

- 大部分对象都是朝生夕灭的，用完立刻就可以回收。熬过越多次垃圾回收的对象就越难以消亡。

- 根据这个特性，将回收区域分为老年代和新生代，新生代一般采用标记复制算法，老年代一般采用标记整理算法。

- 新生代：伊甸园 eden、幸存区 survivor（分为 from 和 to）

  老年代：幸存区对象熬过最多 15 次垃圾回收，晋升到老年代。（幸存区内存不足或者大对象会导致提前晋升）

GC 规模：Minor GC，Mixed GC，Full GC

- Minor GC：发生在新生代，暂停时间短
- Mixed GC：发生在新生代和老年代，G1 收集器特有的
- Full GC：发生在新生代和老年代完整垃圾回收，暂停时间长，尽力避免

## 4. 垃圾回收器

### 1. Serial 串行

![image-20220401155958302](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401155958302.png)

### 2. Parallel 吞吐量优先

Serial 收集器的多线程版本

![image-20220401160015687](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401160015687.png)

### 3. CMS 响应时间优先

初始标记、并发标记、重新标记、并发清理

![image-20220401160259915](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401160259915.png)

重新标记会根据卡表再次遍历

并发清理可能产生浮动垃圾，可能导致并发失败，采用 Serial Old 收集器

### 4. G1 吞吐量 + 低延迟 JDK 9 默认

G1 垃圾回收器：注重吞吐量和低延时（默认 200ms），会把堆划分成多个大小相等的 Region，2048 左右个，每个在 1~32MB 之间。

分代：每个 Region 代表一个类型，young、old。

- young：eden、survivor
- old：old、Humongous（超过 region 的一半时）

整体上是**标记整理**算法，两个区域之间是**复制算法**

回收阶段：

1. Young Collection：会 STW，初始标记。
2. Young Collection + Concurrent Mrak ：老年代堆空间比例达到阈值时，并发标记，不会 STW
3. Mixed Collection：会对 Eden、Survivor、Old 进行全面的垃圾回收
   - 最终标记 会 STW
   - 拷贝存活 会 STW

![image-20220401160256332](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401160256332.png)

多标问题：产生浮动垃圾。

`并发标记时漏标`问题：

1. ==增量更新法（Incremental Update）==，CMS 垃圾回收器采用，写屏障 + 增量更新

   - 每次拦截赋值动作，只要赋值发生，被赋值的对象就会被记录下来，在重新标记阶段再确认一遍。

2. ==原始快照法（SATB，Snapshot At The Beginning）==，G1 垃圾回收器采用，写屏障 + 原始快照
   - 每次拦截赋值动作，不过记录的对象不同，也需要在重新标记阶段对这些对象二次处理
   - 新加对象会被记录
   - 被删除的引用关系的对象也被记录

#### 跨代引用问题

老年代引用新生代，新生代回收时遍历的问题

方法：每个 Region 都维护了一个记忆集卡表，一旦一个老年代对象引用了新生代对象时，都标记为脏 card。

每次对象引用变更时通过一个写后屏障来维护。

## 类加载过程

1. `加载`

   1. 将类的字节码载入方法区，并创建类的 class 对象

   2. 如果这个类的父类没有加载，先加载父类

   3. 加载是懒惰执行的，用到了才加载

2. `链接`
   1. ==验证==：验证是否符合 Class 规范，合法性、安全性检查
   2. ==准备==：为 static 变量分配空间，设置默认值，static final 修饰的基本类型变量赋值
   3. ==解析==：将常量池的符号引用解析为直接引用，这一步可以和初始化互换顺序
3. `初始化`
   1. 静态代码块、static 修饰的变量赋值、static final 修饰的引用类型变量赋值，会被合并成一个 cinit 方法，在初始化时被调用
   2. static final 修饰的基本类型变量赋值，在链接阶段就完成
   3. 初始化也是懒惰执行

## 类加载器

JDK 8 的类加载器

| 名称                                 | 加载哪的类            | 说明                          |
| ------------------------------------ | --------------------- | ----------------------------- |
| Bootstrap ClassLoader 启动类加载器   | JAVA_HOME/jre/lib     | 无法直接访问                  |
| Extension ClassLoader 扩展类加载器   | JAVA_HOME/jre/lib/ext | 上级为 Bootstrap，显示为 null |
| Application ClassLoader 应用类加载器 | classpath             | 上级为 Extension              |
| 自定义类加载器                       | 自定义                | 上级为 Application            |

## 双亲委派模型

含义：优先委派上级类加载器进行加载，如果上级类加载器

- 能找到这个类，由上级加载，加载后该类对下级类加载器可见
- 找不到这个类，则下级类加载器才有资格加载

目的：

1. 让上级类加载器的类对下级共享，即能让你的类依赖到 JDK 的核心类
2. 让类的加载有优先次序，保证核心类优先加载

## 四种引用类型

分别是：强引用、软引用、弱引用、虚引用

### 强引用

1. 普通变量赋值就是强引用，如 ==A a = new A();==
2. 通过 GC Root 的引用链，如果强引用找不到该对象，该对象才能被回收。

![image-20220401172006437](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401172006437.png)

### 软引用 SoftReference

1. 例如：==SoftReference a = new SoftReference(new A());==
2. 如果仅有软引用引用该对象时，首次垃圾回收不会回收该对象，如果内存仍然不足，再次垃圾回收才会回收
3. 软引用的自身需要配合引用队列来释放
4. 典型例子是反射数据

![image-20220401172149829](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20220401172149829.png)

### 弱引用 WeakReference

1. 例如：==WeakReference a = new WeakReference(new A());==
2. 如果仅有弱引用引用该对象时，发生垃圾回收就会释放对象
3. 弱引用自身需要配合引用队列来释放
4. 典型例子是 ThreadLocalMap 中的 Entry 对象

### 虚引用 PhantomReference

1. 例如：==PhantomReference a = new PhantomReference(new A(), referenceQueue);==
2. 必须配合引用队列一起使用，当虚引用所引用的对象被回收时，由 Reference Handler 线程将虚引用对象入队，这样就可以知道哪些对象来回收，从而对他们关联的资源做进一步处理
3. 典型例子就是 Cleaner 释放 DirectByteBuffer 关联的直接内存

## finalize 关键字的理解

### finalize

它是 Object 中的一个方法，如果子类重写它，垃圾回收时此方法会被调用，可以在其中进行资源
释放和清理工作。
但是，将资源释放和清理放在 finalize 方法中非常不好，**非常影响性能**，严重时甚至会引起 **OOM**，从
Java9 开始就被标注为 ==@Deprecated==，不建议被使用了

### finalize 原理

1. 对 finalize 方法进行处理的核心逻辑位于 ==java.lang.ref.Finalizer== 类中，它包含了名为 ==unfinalized==
   的静态变量（双向链表结构），Finalizer 也可被视为另一种引用对象（地位与软、弱、虚相当，只
   是不对外，无法直接使用）

2. 当重写了 finalize 方法的对象，在构造方法调用之时，JVM 都会将其包装成一个 ==Finalizer== 对象，并
   加入 ==unfinalized 链表==中

3. Finalizer 类中还有另一个重要的静态变量，即 ==ReferenceQueue== 引用队列，刚开始它是空的。当
   狗对象可以被当作垃圾回收时，就会把这些狗对象对应的 Finalizer 对象加入此引用队列

4. 但此时 Dog 对象还没法被立刻回收，因为 unfinalized -> Finalizer 这一引用链还在引用它嘛，为
   的是【先别着急回收啊，等我调完 finalize 方法，再回收】

5. ==FinalizerThread== 线程会从 ReferenceQueue 中逐一取出每个 Finalizer 对象，把它们从链表断开并
   真正调用 finallize 方法

6. 由于整个 Finalizer 对象已经从 unfinalized 链表中断开，这样没谁能引用到它和狗对象，所以下次
   gc 时就被回收了

### finalize 缺点

- 无法保证资源释放：FinalizerThread 是守护线程，代码很有可能没来得及执行完，线程就结束了
- 无法判断是否发生错误：执行 finalize 方法时，会吞掉任意异常（Throwable）
- 内存释放不及时：重写了 finalize 方法的对象在第一次被 gc 时，并不能及时释放它占用的内存，
- 因为要等着 FinalizerThread 调用完 finalize，把它从 unfinalized 队列移除后，第二次 gc 时才能真正释放内存
- 有的文章提到【Finalizer 线程会和我们的主线程进行竞争，不过由于它的优先级较低，获取到的
  CPU 时间较少，因此它永远也赶不上主线程的步伐】这个显然是错误的，FinalizerThread 的优先
  级较普通线程更高，原因应该是 finalize 串行执行慢等原因综合导致

## 如何排查频繁 Full GC？

- 代码层面：System.gc()调用，一般不会调用
- 新生代空间太小，youngGC 频繁，存活对象太多，但是 survivor 放不下，导致对象过早进入老年代
- 老年代空间不足，大对象直接进入
- 元空间内存不足：大量代理类，类加载器是活的，元空间类的元数据也是活的。

1. ==top -c==： 找到 cpu 占用很高的进程 ID：==PID==
2. jstat -gc pid 查看 GC 情况
3. jmap -dump:format=b,file=temp.dump pid dump 文件
4. MAT 分析是否有内存泄漏，看是哪个大对象。MAT 查看类的 Histogram 直方图。

开启 GC log

```java
-XX:+PrintGCDetails
-XX:+PrintGCDateStamps
-XX:+PrintGCTimeStamps
-XX:+PrintTenuringDistribution
-Xloggc:/some-path/gc-$(date +%Y%m%d-%H%M%S).log
-XX:+UseGCLogFileRotation
-XX:NumberOfGCLogFiles=5
-XX:GCLogFileSize=10M
```

## 如何排查 CPU 占用过高的问题？

1. ==top -c==： 找到 cpu 占用很高的进程 ID：==PID==
2. ==top -H -p PID==：查看最占用 CPU 的线程 ID
3. ==printf "0x%x\n" 74318==：得到对应 16 进制线程 ID
4. ==jstack 进程 ID | grep -A 20 十六进制线程 ID==：打印对应进程的堆栈信息
5. 找到对应线程的 JAVA 代码行，分析问题

一般原因可能是死循环，或者频繁 GC

## 如何排查内存占用很高的问题？

1. ==top -c==：找到 mem 占用很高的进程 ID

2. ==top -H -p 111111==：找到占用很高内存的线程

3. 如果是线上环境，注意 dump 之前必须先将流量切走，否则大内存 dump 是直接卡死服务。

   `# dump当前快照 jmap -dump:live,format=b,file=dump.hprof <pid>`

   `# 触发full gc，然后再dump一次 jmap -dump:live,format=b,file=dump_gc.hprof <pid>`

   dump:live 的作用是会触发 Full GC，然后再 dump 数据，用作 gc 前后的数据做对比。

4. 通过 MAT (Memory Analyzer Tools) 分析 dump 文件

## JVM 调优思路

优化指标：`吞吐量`、`停顿时间`和`垃圾回收频率`。

基于这些我们可能需要调整：

1. ==内存区域大小以及相关策略==：堆内存大小、新生代大小、老年代大小、Survivor 大小、晋升阈值等等

   - -Xmx
   - -Xms
   - -Xmn
   - -XX:SurvivorRatio

   按经验来说：IO 密集型的可以稍微把年轻代增大些，内存计算密集型的稍微把老年代增大些。

2. ==垃圾回收器==：选择合适的垃圾回收器和垃圾回收期的各种调优参数

   - -XX:UseG1GC
   - -XX:MaxGCPauseMillis
   - -XX:InitialingHeapOccupancyPercent

> 大多数情况下，一般是遇到问题之后才进行调优的。

## JIT 即时编译器

两种技术：`方法内联`和`逃逸分析`（==锁消除==、==栈上分配==、==标量替换==）。

- `方法内联`：把目标方法的代码复制到调用的方法中，避免发生真实的方法调用。因为每次方法调用都会生成栈帧，压栈、出栈、记录方法调用位置等等会带来一定的性能损耗，所以方法内联可以提高一定的性能。
- `逃逸分析`：判断一个对象是否被外部方法引用或者外部线程访问的分析技术，如果没有被引用就可以进行优化，例如：
  - ==锁消除（同步忽略）==：锁的对象只在方法内被调用，不会被别的地方调用，那么就一定是线程安全的，可以把锁的代码忽略掉。
  - ==栈上分配==：该对象只会在方法内部被调用，直接把对象分配在栈中而不是堆中，因为堆中对象需要通过垃圾回收器进行回收，需要损耗一定性能
  - ==标量替换==：当程序执行的时候可以不创建对象，而是直接创建这个对象的成员变量来代替。对象拆分后，可以分配对象的成员变量在栈或寄存器上，原本的对象就不需要分配空间了。

# Spring 篇

## IOC

Spring 的 IOC 容器可以理解为一个对象工厂，我们把该对象交给工厂，工厂管理这些对象的创建和依赖关系。

解决问题：解决的是对象管理和对象依赖的问题。

我的理解：本来应该是我们手动 new 对象，现在是把对象交给 Spring 的 IOC 容器管理。

==控制反转==：把原有自己掌握的事交给别人去处理。它更多的是一种思想。

==依赖注入==：我的理解，它是控制反转的实现方式。对象无需自行创建或者管理它的依赖关系，依赖关系将被自动注入到需要他们的对象中去。

## AOP

AOP，即==面向切面编程==，是对 OOP（面向对象编程）的补充和完善。

解决问题：==非业务代码抽取== 的问题，==降低耦合==。

实现原理：AOP 的底层技术是==动态代理==，在 Spring 内实现依赖的是 BeanPostProcessor。

我的理解：就是在方法前后增加非业务代码，比如我们需要在方法上注入一些重复性的非业务代码，就可以使用 AOP。

实战：监控异常信息，及时上报给用户。

Spring 4 和 Spring 5 通知执行顺序区别：

|      | Spring 4/Spring Boot 1                                | Spring 5/Spring Boot 2                              |
| ---- | ----------------------------------------------------- | --------------------------------------------------- |
| 正常 | Around -> before -> Around -> After -> AfterReturning | Around -> before -> AfterReturning-> After ->Around |
| 异常 | Around -> before -> After -> AfterThrowing            | Around -> Before -> AfterThrowing -> After          |

## Spring start

```
@SpringBootApplication 包含两个注解
@SpringBootConfiguration 表示是一个Spring Boot配置
@EnableAutoConfiguration 开启自动配置
```

## SpringBoot 自动装配过程

自动装配依托@Import 的强大功能和 spring 的 SPI 机制。

通过 SPI 机制发现类，通过@Import 将类注册到 spring 中。

@SpringBootApplication 这个注解时组合注解里面包含自动扫描注解，里面包含一个 EnableAutoConfiguration 注解，这个注解作用是去寻找每个 jar 包里面的 META-INF/spring.factories 文件，之后将文件里面的类全部实例化。

每个需要自动装配的模块都需要编写一个 AutoConfiguration 类，这些 AutoConfiguration 类的原理大概是通过@Import 注解将其属性类 Properties 全部到注册 spring 容器中，属性类通过注解@ConfigurationProperties 从配置文件里面取到配置值。之后将关键的类注册为 bean 自动注入属性类进行初始化完成自动装配的功能。

## Bean 的生命周期

五个阶段：`创建前准备`、`创建实例`、`依赖注入`、`容器缓存`、`销毁实例`。

1. ==创建前准备==

   - Bean 在开始加载之前，要从==上下文==和一些==配置==中，解析查找一些 Bean 有关的==扩展实现==

     - init-method：容器初始化 bean 的时候调用的方法
     - destroy method：容器销毁 bean 的时候调用的方法
     - BeanFactoryPostProcessor：这一类的 Bean 加载过程中的一些前置和后置处理扩展实现

     这些类或者配置其实是 Spring 提供给开发者去实现的 Bean 加载过程中的扩展

2. ==创建实例==

   - 这个阶段主要作用是通过==反射==去创建 Bean 的实例对象，并且会扫描和解析 Bean 声明的一些属性。

3. ==依赖注入==

   - 如果被实例化的 Bean 存在依赖其他 Bean 对象的一些情况，需要对这些依赖的 Bean 进行对象注入，比如@Autowired 这种配置形式，同时会触发一些扩展的调用，比如说常见的扩展类 BeanPostProcessor，用来实现 Bean 初始化前后的扩展回调，以及像 BeanFactoryAware 等等。

4. ==容器缓存==

   - 主要的作用是把 Bean 保存到容器和 Spring 的缓存中，这个阶段的 Bean 就可以被开发者使用了。
   - init-method 这个属性配置的一些方法会被调用，以及 BeanPostProcessor 的后置处理器方法会被触发。

5. ==销毁实例==

   - Spring 应用上下文被关闭的时候，这个上下文所有的 Bean 都被销毁。
   - 如果 Bean 实现了 DisposableBean 接口 或者 配置了 destroy method 属性的一些方法，会在这个阶段被调用。

## bean 的作用域

1、singleton：单例模式，在整个 Spring IoC 容器中，使用 singleton 定义的 Bean 将只有一个实例。
注：spring 默认使用单例模式，因为 Java 在创建 Java 实例时，需要进行内存申请；销毁实例时，需要完成垃圾回收，这些工作都会导致系统开销的增加。而 singleton 作用域的 Bean 实例一旦创建成功，可以重复使用。
2、prototype：原型模式，每次通过容器的 getBean 方法获取 prototype 定义的 Bean 时，都将产生一个新的 Bean 实例
注：prototype 作用域 Bean 的创建、销毁代价比较大。因此，除非必要，否则尽量避免将 Bean 被设置成 prototype 作用域。
3、request：对于每次 HTTP 请求，使用 request 定义的 Bean 都将产生一个新实例，即每次 HTTP 请求将会产生不同的 Bean 实例。只有在 Web 应用中使用 Spring 时，该作用域才有效
4、session：对于每次 HTTP Session，使用 session 定义的 Bean 都将产生一个新实例。同样只有在 Web 应用中使用 Spring 时，该作用域才有效
5、global session：每个全局的 HTTP Session，使用 session 定义的 Bean 都将产生一个新实例。典型情况下，仅在使用 portlet context 的时候有效。同样只有在 Web 应用中使用 Spring 时，该作用域才有效

## 循环依赖

问题：两个或者多个 Bean 相互依赖，导致注入死循环。

解决：提供了三级缓存机制。

- getBean 去获得一个实例对象的时候，首先会从一级缓存中去找。
- 一级缓存中没找到就去二级缓存中找，如果都没找到，意味着这个 Bean 还没实例化，Spring 就会去实例化 Bean。这个时候的 Bean 是早期 Bean，会放到二级缓存。加上一个标记来表示是否存在循环依赖，如果不存在就会放到二级缓存，否则就会标记存在循环依赖，然后会到下一次轮询的时候去赋值，也就是解析 @Autowired 注解时，等 Autowired 注解赋值完成后就会把目标 Bean 存入一级缓存。
- 三级缓存是用来存 代理 Bean 的，调用 getBean() 方法时发现目标 Bean 需要通过代理工厂来创建，这个时候会把创建好的实例放到三级缓存，也会把赋值好的 Bean 同步到一级缓存。

无法解决循环依赖问题的情况：

1. 多实例 Bean 通过 setter 注入的时候
2. 构造器注入的 Bean
3. 单例的代理 Bean 通过 Setter 注入的情况下
4. 设置 @DependsOn 注解的 Bean

## Spring 事务

@Transactional 注解参数：propagation、isolation、readOnly、timeout、rollbackFor、noRollbackFor

- ==propagation==：事务的传播行为

| 事务传播行为类型          | 说明                                                                                               |
| ------------------------- | -------------------------------------------------------------------------------------------------- |
| PROPAGATION_REQUIRED      | 如果当前没有事务，就新建一个事务，如果已经存在一个事务中，加入到这个事务中。这是最常见的选择。     |
| PROPAGATION_SUPPORTS      | 支持当前事务，如果当前没有事务，就以非事务方式执行。                                               |
| PROPAGATION_MANDATORY     | 使用当前的事务，如果当前没有事务，就抛出异常。                                                     |
| PROPAGATION_REQUIRES_NEW  | 新建事务，如果当前存在事务，把当前事务挂起。                                                       |
| PROPAGATION_NOT_SUPPORTED | 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。                                         |
| PROPAGATION_NEVER         | 以非事务方式执行，如果当前存在事务，则抛出异常。                                                   |
| PROPAGATION_NESTED        | 如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与 PROPAGATION_REQUIRED 类似的操作。 |

- ==isolation==：事务隔离级别
- ==timeout==：超时回滚时间
- ==readOnly==：只读，不需要事务读取数据时
- ==rollbackFor==：触发事务回滚的异常类型
- ==noRollbackFor==：不能触发事务回滚的异常类型

事务失效场景：

1. 非 public 修饰的方法

2. 抛出检查异常：如使用 FileInuptStream 时抛出 FileNotFoundException

3. 自己 try-catch 异常

4. 自定义切面，在事务切面内层，没有抛异常

5. 数据库引擎不支持事务

## @Autowired 和 @Resource 的区别

@Autowired 是 Spring 提供的注解。默认的注入方式为 byType，根据类型匹配。

@Resource 是 JDK 提供的注解。默认的注入方式为 byName，根据名称匹配。

当一个接口存在多个实现类的情况下，@Autowired 和 @Resource 都需要通过名称才可以正确匹配到对应的 Bean。

@Autowired 需要配合 @Qualifer 注解来显示名称，@Resource 可以通过 name 属性来指定名称。

# 微服务篇

微服务面试相关问题整理

## 什么是单体架构？

将业务的所有功能集中在一个项目中开发，打成一个包部署。

单体架构的优缺点如下：

**优点：**

- 架构简单
- 部署成本低

**缺点：**

- 耦合度高（维护困难、升级困难）

## 什么是分布式架构？

分布式架构就是根据业务功能做拆分，每个业务功能模块作为独立项目开发，称为一个服务，将不同的业务提取出来部署在不同的服务器上。

① 分布式架构的出现是为了用廉价的,普通的及其完成单个计算机无法完成的计算,存储任务,
其目的就是利用更多的机器,处理更多的数据。

② 单个服务器无法承受大量的服务，对于大量的用户进行访问是无法处理这种流量,此时就需要利用
更多的机器来分担这种流量访问的压力，因此此时就利用到了"分布式架构"将 每一个不同的服务部
署在不同机器上，来处理不同的请求，缓解单个服务器被访问压力。

③ 只有单个节点的处理能力无法满足需求(内存+磁盘+cpu),才需要用到分布式,因为分布式系统要解决
的问题本身适合单机系统一样的,但是由于分布式系统多节点,在网络通信中，会出现很多单机系统没有的问题。

2. 将一个大的系统划分为多个业务模块,业务模块分别部署到不同的机器上,各个业务模块之间通过接口进行数据交互。
   区别分布式的方式是根据不同机器不同业务。

分布式架构的优缺点：

**优点：**

- 降低服务耦合
- 有利于服务升级和拓展

**缺点：**

- 服务调用关系错综复杂

分布式架构虽然降低了服务耦合，但是服务拆分时也有很多问题需要思考：

- 服务拆分的粒度如何界定？
- 服务之间如何调用？
- 服务的调用关系如何管理？

人们需要制定一套行之有效的标准来约束分布式架构。

## 微服务架构特点是什么？

微服务架构是一种架构模式,它提倡将单一应用程序划分成一组小的服务,
服务之间互相协调,互相配合,为用户提供最终价值。

特点：

- 单一职责：微服务拆分粒度更小，每一个服务都对应唯一的业务能力，做到单一职责
- 自治：团队独立、技术独立、数据独立，独立部署和交付
- 面向服务：服务提供统一标准的接口，与语言和技术无关
- 隔离性强：服务调用做好隔离、容错、降级，避免出现级联问题

微服务的上述特性其实是在给分布式架构制定一个标准，进一步降低服务之间的耦合度，提供服务的独立性和灵活性。做到高内聚，低耦合。

因此，可以认为**微服务**是一种经过良好架构设计的**分布式架构方案** 。

## 服务怎么拆分？

选择合适的拆分粒度：一般基于业务功能进行拆分。

微服务拆分时的几个原则：

- 单一职责：不同微服务，不要重复开发相同业务
- 数据独立：微服务数据独立，不要访问其它微服务的数据库
- 面向服务：微服务可以将自己的业务暴露为接口，供其它微服务调用

## SpringCloud 常见组件有哪些？

**问题说明**：这个题目主要考察对 SpringCloud 的组件基本了解

**难易程度**：简单

**参考话术**：

SpringCloud 包含的组件很多，有很多功能是重复的。其中最常用组件包括：

•注册中心组件：Eureka、Nacos 等

•负载均衡组件：Ribbon

•远程调用组件：OpenFeign

•网关组件：Zuul、Gateway

•服务保护组件：Hystrix、Sentinel

•服务配置管理组件：SpringCloudConfig、Nacos

## 服务间是怎么远程调用的？

RestTemplate 到 Open Feign，只需要知道服务 ID 和接口路径就可以调用服务。

这里要引入服务的注册中心了，可以使用 Eureka 或 Nacos，见 **问题** **1.5.Nacos 与 Eureka 的区别有哪些？**

调用时结合负载均衡组件，发起远程调用时会被 LoadBalancerInterceptor 拦截，从注册中心拉取服务列表，根据负载均衡算法得到真实的服务地址信息，替换服务 ID，请求到服务对应实例。

相关负载均衡算法：轮询、权重、Zone 机房轮询、随机、选择并发低的服务器等等。

## Nacos 的健康检测有两种模式

- ==临时实例==：
  - 采用客户端心跳检测模式，心跳周期 5 秒
  - 心跳间隔超过 15 秒则标记为不健康
  - 心跳间隔超过 30 秒则从服务列表删除
- ==永久实例==：
  - 采用服务端主动健康检测方式
  - 周期为 2000 + 5000 毫秒内的随机数
  - 检测异常只会标记为不健康，不会删除

## Nacos 的服务发现分为两种模式

- 模式一：==主动拉取模式==，消费者定期主动从 Nacos 拉取服务列表并缓存起来，再服务调用时优先读取本地缓存中的服务列表。
- 模式二：==订阅模式==，消费者订阅 Nacos 中的服务列表，并基于 UDP 协议来接收服务变更通知。当 Nacos 中的服务列表更新时，会发送 UDP 广播给所有订阅者。

与 Eureka 相比，Nacos 的订阅模式服务状态更新更及时，消费者更容易及时发现服务列表的变化，剔除故障服务。

## 那么为什么 Nacos 有临时和永久两种实例呢？

以淘宝为例，双十一大促期间，流量会比平常高出很多，此时服务肯定需要增加更多实例来应对高并发，而这些实例在双十一之后就无需继续使用了，采用**临时实例**比较合适。而对于服务的一些常备实例，则使用**永久实例**更合适。

## Nacos 与 Eureka 的区别有哪些？

**参考话术**：

Nacos 与 Eureka 有相同点，也有不同之处，可以从以下几点来描述：

- **接口方式**：Nacos 与 Eureka 都对外暴露了 Rest 风格的 API 接口，用来实现服务注册、发现等功能
- **实例类型**：Nacos 的实例有永久和临时实例之分；而 Eureka 只支持临时实例
- **健康检测**：Nacos 对临时实例采用心跳模式检测，对永久实例采用主动请求来检测，eureka 是==30==秒，Nacos 是==5==秒；Eureka 只支持心跳模式
- **服务发现**：Nacos 支持定时拉取和订阅推送两种模式；Eureka 只支持定时拉取模式

另外，nacos 还支持做服务的**配置中心**。

## Nacos 的服务注册表结构是怎样的？

Nacos 采用了数据的分级存储模型，最外层是 Namespace，用来隔离环境。然后是 Group，用来对服务分组。接下来就是服务（Service）了，一个服务包含多个实例，但是可能处于不同机房，因此 Service 下有多个集群（Cluster），Cluster 下是不同的实例（Instance）。

对应到 Java 代码中，Nacos 采用了一个多层的 Map 来表示。结构为 Map<String, Map<String, Service>>，其中最外层 Map 的 key 就是 namespaceId，值是一个 Map。内层 Map 的 key 是 group 拼接 serviceName，值是 Service 对象。Service 对象内部又是一个 Map，key 是集群名称，值是 Cluster 对象。而 Cluster 对象内部维护了 Instance 的集合。

## Nacos 如何支撑阿里内部数十万服务注册压力？

Nacos 内部接收到注册的请求时，不会立即写数据，而是将服务注册的任务放入一个阻塞队列就立即响应给客户端。然后利用线程池读取阻塞队列中的任务，异步来完成实例更新，从而提高并发写能力。

## Nacos 如何保证并发写的安全性？

首先，在注册实例时，会对 service 加锁，不同 service 之间本身就不存在并发写问题，互不影响。相同 service 时通过锁来互斥。并且，在更新实例列表时，是基于异步的线程池来完成，而线程池的线程数量为 1.

## Nacos 如何避免并发读写冲突问题？

Nacos 在更新实例列表时，会采用 CopyOnWrite 写时复制技术，首先将旧的实例列表拷贝一份，然后更新拷贝的实例列表，再用更新后的实例列表来覆盖旧的实例列表。

这样在更新的过程中，就不会对读实例列表的请求产生影响，也不会出现脏读问题了。

## 分布式事务 Seata

Seata 事务管理中有三个重要的角色：

- **TC (Transaction Coordinator) -** **事务协调者：**维护全局和分支事务的状态，协调全局事务提交或回滚。
- **TM (Transaction Manager) -** **事务管理器：**定义全局事务的范围、开始全局事务、提交或回滚全局事务。
- **RM (Resource Manager) -** **资源管理器：**管理分支事务处理的资源，与 TC 交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。

![image-20210724172326452](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20210724172326452.png)

Seata 基于上述架构提供了四种不同的分布式事务解决方案：

- XA 模式：强一致性分阶段事务模式，牺牲了一定的可用性，无业务侵入
- AT 模式：最终一致的分阶段事务模式，无业务侵入，也是 Seata 的默认模式
- TCC 模式：最终一致的分阶段事务模式，有业务侵入
- SAGA 模式：长事务模式，有业务侵入

无论哪种方案，都离不开 TC，也就是事务的协调者。

### XA 模式

两阶段提交：

- 一阶段：事务协调组通知每个事务参与者执行本地事务，本地事务执行完成后报告事务执行状态给事务协调者，此时事务是不提交的，继续持有数据库锁
- 二阶段：如果一阶段都成功，通知所有事务参与者提交事务；否则，通知所有事务参与者回滚

优点：

- 事务强一致性，满足 ACID 原则。
- 常用数据库都支持，实现简单，没有代码侵入。

缺点：

- 性能差，阶段一锁定资源，阶段二才释放
- 依赖关系型数据库实现事务

### AT 模式

AT 模式同样是分阶段提交的事务模型，不过缺**弥补了 XA 模型中资源锁定周期过长**的缺陷。

两阶段提交：

- 一阶段：类似 XA 模式，但是执行事务前会先对数据库做一个快照 undo-log，然后分支事务直接执行并提交。
- 二阶段：如果一阶段都成功，删除 undo log；否则，根据 undo log 回滚数据

AT 模式的优点：

- 一阶段完成直接提交事务，释放数据库资源，性能比较好
- 利用全局锁实现读写隔离
- 没有代码侵入，框架自动完成回滚和提交

AT 模式的缺点：

- 两阶段之间属于软状态，属于最终一致
- 框架的快照功能会影响性能，但比 XA 模式要好很多

简述 AT 模式与 XA 模式最大的区别是什么？

- XA 模式一阶段不提交事务，锁定资源；AT 模式一阶段直接提交，不锁定资源。
- XA 模式依赖 数据库机制 实现回滚；AT 模式利用 数据快照 实现数据回滚。
- XA 模式强一致；AT 模式最终一致。

### TCC 模式

TCC 模式与 AT 模式非常相似，每阶段都是独立事务，不同的是 TCC 通过人工编码来实现数据恢复。需要实现三个方法：

- Try：资源的检测和预留；

- Confirm：完成资源操作业务；要求 Try 成功 Confirm 一定要能成功。

- Cancel：预留资源释放，可以理解为 try 的反向操作。

TCC 模式的每个阶段是做什么的？

- Try：资源检查和预留
- Confirm：业务执行和提交
- Cancel：预留资源的释放

TCC 的优点是什么？

- 一阶段完成直接提交事务，释放数据库资源，性能好
- 相比 AT 模型，无需生成快照，无需使用全局锁，性能最强
- 不依赖数据库事务，而是依赖补偿操作，可以用于非事务型数据库

TCC 的缺点是什么？

- 有代码侵入，需要人为编写 try、Confirm 和 Cancel 接口，太麻烦
- 软状态，事务是最终一致
- 需要考虑 Confirm 和 Cancel 的失败情况，做好幂等处理

### SAGA 模式

在 Saga 模式下，分布式事务内有多个参与者，每一个参与者都是一个冲正补偿服务，需要用户根据业务场景实现其正向操作和逆向回滚操作。

Saga 也分为两个阶段：

- 一阶段：直接提交本地事务
- 二阶段：成功则什么都不做；失败则通过编写补偿业务来回滚

优点：

- 事务参与者可以基于事件驱动实现异步调用，吞吐高
- 一阶段直接提交事务，无锁，性能好
- 不用编写 TCC 中的三个阶段，实现简单

缺点：

- 软状态持续时间不确定，时效性差
- 没有锁，没有事务隔离，会有脏写

### 四种模式对比

![image-20210724185021819](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20210724185021819.png)

## 微服务保护 Sentinel

簇点链路：当请求进入微服务时，首先会访问 DispatcherServlet，然后进入 Controller、Service、Mapper，这样一个调用链就叫做簇点链路。簇点链路中被监控的每一个接口就是一个资源。

四大功能：流量控制、隔离和降级、热点参数、授权规则。

- 流控：流量控制
- 降级：降级熔断
- 热点：热点参数限流，是限流的一种
- 授权：请求的权限控制

### 流量控制

`流控模式`：==直接==、==关联== 和 ==链路==。

1. 直接：统计当前资源的请求，触发阈值时对当前资源限流。默认。
2. 关联：统计与当前资源相关联的另一个资源的请求，触发阈值时对当前资源限流。
   - 场景：修改和查询订单，会导致争抢数据库锁。业务需求是优先更新订单，因此更新订单触发阈值时，对查询订单业务限流。
3. 链路：统计从指定链路访问到当前资源的请求，触发阈值时对指定链路限流。

`流控效果`：==快速失败==、==warm up== 和 ==排队等待==。

1. 快速失败：到达阈值后，新的请求会被立即拒绝并抛出 FlowException 异常。默认。
2. warm up：预热模式，对超出阈值的请求同样是拒绝并抛出异常，但这种模式阈值会动态变化，从一个较小值逐渐增加到最大值。
3. 排队等待：让所有请求按照先后次序排队进行，两个请求的间隔不能小于指定时长。

`热点参数限流`：分别统计 参数值 相同的请求，判断是否超过阈值。

### 隔离和降级

都是通过调用方发起远程调用来实现的，所以需要配合 Feign 来实现。编写失败降级逻辑：实现 FallbackFactory 接口，重写对应 FeignClient 的方法。

**线程隔离**（舱壁模式），调用者在调用服务提供者时，给每个调用的请求分配独立的线程池，出现故障时，最多消耗这个线程池内的资源，避免把调用者的所有资源耗尽。

限流时选择阈值类型为线程数，是采用线程数隔离，信号量隔离（Sentinel 默认采用），计数器模式记录业务的线程数量。

**熔断降级**：是在调用方这边加入断路器，统计对服务提供者的调用，如果调用的失败比例过高，则熔断该业务，不允许访问该服务的提供者了。

断路器熔断策略有三种：==慢调用==、==异常比例==、==异常数==。

- 慢调用：RT 大于指定时长的请求就是一次慢调用请求。在指定时间内，大于设定的阈值，触发熔断。
- 异常比例和异常数：统计指定时间内的调用，如果调用次数超过指定请求数，并且出现异常的比例达到设定的比例阈值（或超过指定异常数），则触发熔断。

### 授权规则

授权规则可以对调用方的来源做控制，有白名单和黑名单两种方式。配合网关做授权。

### 规则持久化

- 原始模式：保存在内存
- pull 模式：客户端的内存和本地文件存储规则
- push 模式：规则推送到配置中心，客户端监听 nacos 配置变更，完成本地配置更新

## Sntinel 的限流与 Gateway 的限流有什么差别？

限流算法常见的有三种实现：滑动时间窗口、令牌桶算法、漏桶算法。

Gateway 则采用了基于 Redis 实现的令牌桶算法。

而 Sentinel 内部却比较复杂：

- 默认限流模式是基于滑动时间窗口算法
- 排队等待的限流模式则基于漏桶算法
- 而热点参数限流则是基于令牌桶算法

## Sentinel 的线程隔离与 Hystix 的线程隔离有什么差别?

**问题说明**：考察对线程隔离方案的掌握情况

**难易程度**：一般

**参考话术**：

Hystix 默认是基于线程池实现的线程隔离，每一个被隔离的业务都要创建一个独立的线程池，线程过多会带来额外的 CPU 开销，性能一般，但是隔离性更强。

Sentinel 是基于信号量（计数器）实现的线程隔离，不用创建线程池，性能较好，但是隔离性一般。

# MQ 篇

## 你们为什么选择了 RabbitMQ 而不是其它的 MQ？

![image-20210925220034702](%E6%88%91%E7%9A%84%E9%9D%A2%E8%AF%95.assets/image-20210925220034702-16492514294671.png)

**话术：**

ActiveMQ 吞吐量比较差，可用性和可靠性一般，社区活跃不高。

kafka 是以吞吐量高而闻名，不过其数据稳定性一般，而且无法保证消息有序性。我们公司的日志收集也有使用，业务模块中则使用的 RabbitMQ。

阿里巴巴的 RocketMQ 基于 Kafka 的原理，弥补了 Kafka 的缺点，继承了其高吞吐的优势，其客户端目前以 Java 为主。但是我们担心阿里巴巴开源产品的稳定性，所以就没有使用。

RabbitMQ 基于面向并发的语言 Erlang 开发，吞吐量不如 Kafka，但是对我们公司来讲够用了。而且消息可靠性较好，并且消息延迟极低，集群搭建比较方便。支持多种协议，并且有各种语言的客户端，比较灵活。Spring 对 RabbitMQ 的支持也比较好，使用起来比较方便，比较符合我们公司的需求。

综合考虑我们公司的并发需求以及稳定性需求，我们选择了 RabbitMQ。

## 异步、解耦、削峰

异步：基于生产者消费者模型，生产者生产完消息后，就可以做其他事情了，具体业务逻辑由消费者实现。例如用户注册发生邮件和短信。

解耦：用户下单后，通知库存系统、

## RabbitMQ 如何确保消息的不丢失？

**话术：**

RabbitMQ 针对消息传递过程中可能发生问题的各个地方，给出了针对性的解决方案：

- 生产者发送消息时可能因为网络问题导致消息没有到达交换机：
  - RabbitMQ 提供了 publisher confirm 机制
    - 生产者发送消息后，可以编写 ConfirmCallback 函数
    - 消息成功到达交换机后，RabbitMQ 会调用 ConfirmCallback 通知消息的发送者，返回 ACK
    - 消息如果未到达交换机，RabbitMQ 也会调用 ConfirmCallback 通知消息的发送者，返回 NACK
    - 消息超时未发送成功也会抛出异常
- 消息到达交换机后，如果未能到达队列，也会导致消息丢失：
  - RabbitMQ 提供了 publisher return 机制
    - 生产者可以定义 ReturnCallback 函数
    - 消息到达交换机，未到达队列，RabbitMQ 会调用 ReturnCallback 通知发送者，告知失败原因
- 消息到达队列后，MQ 宕机也可能导致丢失消息：
  - RabbitMQ 提供了持久化功能，集群的主从备份功能
    - 消息持久化，RabbitMQ 会将交换机、队列、消息持久化到磁盘，宕机重启可以恢复消息
    - 镜像集群，仲裁队列，都可以提供主从备份功能，主节点宕机，从节点会自动切换为主，数据依然在
- 消息投递给消费者后，如果消费者处理不当，也可能导致消息丢失
  - SpringAMQP 基于 RabbitMQ 提供了消费者确认机制、消费者重试机制，消费者失败处理策略：
    - 消费者的确认机制：
      - 消费者处理消息成功，未出现异常时，Spring 返回 ACK 给 RabbitMQ，消息才被移除
      - 消费者处理消息失败，抛出异常，宕机，Spring 返回 NACK 或者不返回结果，消息不被移除
    - 消费者重试机制：
      - 默认情况下，消费者处理失败时，消息会再次回到 MQ 队列，然后投递给其它消费者。Spring 提供的消费者重试机制，则是在处理失败后不返回 NACK，而是直接在消费者本地重试。多次重试都失败后，则按照消费者失败处理策略来处理消息。避免了消息频繁入队带来的额外压力。
    - 消费者失败策略：
      - 当消费者多次本地重试失败时，消息默认会丢弃。
      - Spring 提供了 Republish 策略，在多次重试都失败，耗尽重试次数后，将消息重新投递给指定的异常交换机，并且会携带上异常栈信息，帮助定位问题。

## RabbitMQ 如何避免消息堆积？

**话术：**

消息堆积问题产生的原因往往是因为消息发送的速度超过了消费者消息处理的速度。因此解决方案无外乎以下三点：

- 提高消费者处理速度
- 增加更多消费者
- 增加队列消息存储上限

1）`提高消费者处理速度`

消费者处理速度是由业务代码决定的，所以我们能做的事情包括：

- 尽可能优化业务代码，提高业务性能
- 接收到消息后，开启线程池，并发处理多个消息

优点：成本低，改改代码即可

缺点：开启线程池会带来额外的性能开销，对于高频、低时延的任务不合适。推荐任务执行周期较长的业务。

2）`增加更多消费者`

一个队列绑定多个消费者，共同争抢任务，自然可以提供消息处理的速度。

优点：能用钱解决的问题都不是问题。实现简单粗暴

缺点：问题是没有钱。成本太高

3）`增加队列消息存储上限`

在 RabbitMQ 的 1.8 版本后，加入了新的队列模式：Lazy Queue

这种队列不会将消息保存在内存中，而是在收到消息后直接写入磁盘中，理论上没有存储上限。可以解决消息堆积问题。

优点：磁盘存储更安全；存储无上限；避免内存存储带来的 Page Out 问题（队列中消息内存占用过大时，写入磁盘和堵塞发送消息），性能更稳定；

缺点：磁盘存储受到 IO 性能的限制，消息时效性不如内存模式，但影响不大。

## RabbitMQ 如何保证消息的有序性？

**话术：**

其实 RabbitMQ 是队列存储，天然具备先进先出的特点，只要消息的发送是有序的，那么理论上接收也是有序的。不过当一个队列绑定了多个消费者时，可能出现消息轮询投递给消费者的情况，而消费者的处理顺序就无法保证了。

因此，要保证消息的有序性，需要做的下面几点：

- 保证消息发送的有序性
- 保证一组有序的消息都发送到同一个队列
- 保证一个队列只包含一个消费者

## 如何防止 MQ 消息被重复消费？

**话术：**

消息重复消费的原因多种多样，不可避免。所以只能从消费者端入手，只要能保证消息处理的幂等性就可以确保消息不被重复消费。

而幂等性的保证又有很多方案：

- **给每一条消息都添加一个唯一 id，在本地记录消息表及消息状态，处理消息时基于数据库表的 id 唯一性做判断**
- 同样是记录消息表，利用消息状态字段实现基于乐观锁的判断，保证幂等。
- 基于业务本身的幂等性。比如根据 id 的删除、查询业务天生幂等；新增、修改等业务可以考虑基于数据库 id 唯一性、或者乐观锁机制确保幂等。本质与消息表方案类似。

## 如何保证 RabbitMQ 的高可用？

**话术：**

要实现 RabbitMQ 的高可用无外乎下面两点：

- 做好**交换机、队列、消息的持久化**
- 搭建 RabbitMQ 的**镜像集群**，做好主从备份。当然也可以使用仲裁队列代替镜像集群。

## 使用 MQ 可以解决那些问题？

**话术：**

RabbitMQ 能解决的问题很多，例如：

- 解耦合：将几个业务关联的微服务调用修改为基于 MQ 的异步通知，可以解除微服务之间的业务耦合。同时还提高了业务性能。
- 流量削峰：将突发的业务请求放入 MQ 中，作为缓冲区。后端的业务根据自己的处理能力从 MQ 中获取消息，逐个处理任务。流量曲线变的平滑很多
- 延迟队列：基于 RabbitMQ 的死信队列或者 DelayExchange 插件，可以实现消息发送后，延迟接收的效果。

# Redis 篇

## Redis 与 Memcache 的区别？

- `redis支持更丰富的数据类型`（支持更复杂的应用场景）：Redis 不仅仅支持简单的 k/v 类型的数据，同时还提供 list，set，zset，hash 等数据结构的存储。memcache 支持简单的数据类型，String。
- `Redis支持数据的持久化`，可以将内存中的数据保持在磁盘中，重启的时候可以再次加载进行使用,而 Memecache 把数据全部存在内存之中。
- `集群模式`：memcached 没有原生的集群模式，需要依靠客户端来实现往集群中分片写入数据；但是 redis 目前是原生支持 cluster 模式的.
- `Redis使用单线程`：Memcached 是多线程，非阻塞 IO 复用的网络模型；Redis 使用单线程的多路 IO 复用模型。

## Redis 的单线程为什么那么快

**面试官**：Redis 采用单线程，如何保证高并发？

**面试话术**：

Redis 快的主要原因是：

1. 完全基于内存
2. 数据结构简单，对数据操作也简单
3. 使用多路 I/O 复用模型，充分利用 CPU 资源
4. 单线程的好处是不用考虑并发加锁问题，不会出现加锁和释放锁导致性能下降

**面试官**：这样做的好处是什么？

**面试话术**：

单线程优势有下面几点：

- 代码更清晰，处理逻辑更简单
- 不用去考虑各种锁的问题，不存在加锁释放锁操作，没有因为锁而导致的性能消耗
- 不存在多进程或者多线程导致的 CPU 切换，充分利用 CPU 资源

## Redis 的持久化方案由哪些？

**相关资料：**

1）RDB 持久化

RDB 持久化可以使用 save 或 bgsave，为了不阻塞主进程业务，一般都使用 bgsave，流程：

- Redis 进程会 fork 出一个子进程（与父进程内存数据一致）。
- 父进程继续处理客户端请求命令
- 由子进程将内存中的所有数据写入到一个临时的 RDB 文件中。
- 完成写入操作之后，旧的 RDB 文件会被新的 RDB 文件替换掉。

下面是一些和 RDB 持久化相关的配置：

- `save 60 10000`：如果在 60 秒内有 10000 个 key 发生改变，那就执行 RDB 持久化。
- `stop-writes-on-bgsave-error yes`：如果 Redis 执行 RDB 持久化失败（常见于操作系统内存不足），那么 Redis 将不再接受 client 写入数据的请求。
- `rdbcompression yes`：当生成 RDB 文件时，同时进行压缩。
- `dbfilename dump.rdb`：将 RDB 文件命名为 dump.rdb。
- `dir /var/lib/redis`：将 RDB 文件保存在`/var/lib/redis`目录下。

当然在实践中，我们通常会将`stop-writes-on-bgsave-error`设置为`false`，同时让监控系统在 Redis 执行 RDB 持久化失败时发送告警，以便人工介入解决，而不是粗暴地拒绝 client 的写入请求。

RDB 持久化的优点：

- RDB 持久化文件小，Redis 数据恢复时速度快
- 子进程不影响父进程，父进程可以持续处理客户端命令
- 子进程 fork 时采用 copy-on-write 方式，大多数情况下，没有太多的内存消耗，效率比较好。

RDB 持久化的缺点：

- 子进程 fork 时采用 copy-on-write 方式，如果 Redis 此时写操作较多，可能导致额外的内存占用，甚至内存溢出
- RDB 文件压缩会减小文件体积，但通过时会对 CPU 有额外的消耗
- 如果业务场景很看重数据的持久性 (durability)，那么不应该采用 RDB 持久化。譬如说，如果 Redis 每 5 分钟执行一次 RDB 持久化，要是 Redis 意外奔溃了，那么最多会丢失 5 分钟的数据。

2）AOF 持久化

可以使用`appendonly yes`配置项来开启 AOF 持久化。Redis 执行 AOF 持久化时，会将接收到的写命令追加到 AOF 文件的末尾，因此 Redis 只要对 AOF 文件中的命令进行回放，就可以将数据库还原到原先的状态。
　　与 RDB 持久化相比，AOF 持久化的一个明显优势就是，它可以提高数据的持久性 (durability)。因为在 AOF 模式下，Redis 每次接收到 client 的写命令，就会将命令`write()`到 AOF 文件末尾。
　　然而，在 Linux 中，将数据`write()`到文件后，数据并不会立即刷新到磁盘，而会先暂存在 OS 的文件系统缓冲区。在合适的时机，OS 才会将缓冲区的数据刷新到磁盘（如果需要将文件内容刷新到磁盘，可以调用`fsync()`或`fdatasync()`）。
　　通过`appendfsync`配置项，可以控制 Redis 将命令同步到磁盘的频率：

- `always`：每次 Redis 将命令`write()`到 AOF 文件时，都会调用`fsync()`，将命令刷新到磁盘。这可以保证最好的数据持久性，但却会给系统带来极大的开销。
- `no`：Redis 只将命令`write()`到 AOF 文件。这会让 OS 决定何时将命令刷新到磁盘。
- `everysec`：除了将命令`write()`到 AOF 文件，Redis 还会每秒执行一次`fsync()`。在实践中，推荐使用这种设置，一定程度上可以保证数据持久性，又不会明显降低 Redis 性能。

然而，AOF 持久化并不是没有缺点的：Redis 会不断将接收到的写命令追加到 AOF 文件中，导致 AOF 文件越来越大。过大的 AOF 文件会消耗磁盘空间，并且导致 Redis 重启时更加缓慢。为了解决这个问题，在适当情况下，Redis 会对 AOF 文件进行重写，去除文件中冗余的命令，以减小 AOF 文件的体积。在重写 AOF 文件期间， Redis 会启动一个子进程，由子进程负责对 AOF 文件进行重写。
　　可以通过下面两个配置项，控制 Redis 重写 AOF 文件的频率：

- `auto-aof-rewrite-min-size 64mb`
- `auto-aof-rewrite-percentage 100`

上面两个配置的作用：当 AOF 文件的体积大于 64MB，并且 AOF 文件的体积比上一次重写之后的体积大了至少一倍，那么 Redis 就会执行 AOF 重写。

优点：

- 持久化频率高，数据可靠性高
- 没有额外的内存或 CPU 消耗

缺点：

- 文件体积大
- 文件大导致服务数据恢复时效率较低

**面试话术：**

Redis 提供了两种数据持久化的方式，一种是 RDB，另一种是 AOF。默认情况下，Redis 使用的是 RDB 持久化。

RDB 持久化文件体积较小，但是保存数据的频率一般较低，可靠性差，容易丢失数据。另外 RDB 写数据时会采用 Fork 函数拷贝主进程，可能有额外的内存消耗，文件压缩也会有额外的 CPU 消耗。

ROF 持久化可以做到每秒钟持久化一次，可靠性高。但是持久化文件体积较大，导致数据恢复时读取文件时间较长，效率略低

## Redis 的集群方式有哪些？

**面试话术：**

Redis 集群可以分为**主从集群**和**分片集群**两类。

**主从集群**一般一主多从，主库用来写数据，从库用来读数据。结合哨兵，可以在主库宕机时重新选主，**目的是保证 Redis 的高可用**。

**分片集群**是数据分片，我们会让多个 Redis 节点组成集群，并将 16384 个插槽分到不同的节点上。存储数据时利用对 key 做 hash 运算，得到插槽值后存储到对应的节点即可。因为存储数据面向的是插槽而非节点本身，因此可以做到集群动态伸缩。**目的是让 Redis 能存储更多数据。**

### 1. 主从集群

主从集群，也是读写分离集群。一般都是一主多从方式。

`主从复制`：2.8 版本后是基于==PSYNC==命令来实现的，分为==完整重同步==和==部分重同步==。

- ==完整重同步==：用来处理初次复制的情况，通过发送 RDB 文件和缓冲区里的写命令来同步。
- ==部分重同步==：用来处理断线后重复制的情况，只发送断线期间的写命令来同步。

部分重同步的实现原理：

- ==主、从服务器的复制偏移量==：主服务器每次传播 N 个字节，+N。从服务每次接受 N 个字节，+N。

- ==主服务器的复制积压缓冲区==：定长的 FIFO 队列，默认 1MB。每个字节记录对应的复制偏移量。断线重连时，如果偏移量还在复制及压缓冲区，说明可以执行部分重同步。否则，执行完整重同步。
- ==服务器运行 ID（run ID）==：从服务器会保存复制的主服务器的运行 ID，断线后重连时，如果主服务器 ID 相同，说明可以继续执行部分重同步。否则，执行完整重同步。

### 2. Sentinel 集群

哨兵集群加 Redis 主从集群组成，当监视到主服务器宕机时，自动下线主服务器，并且择优选取从服务器作为主服务器。

Sentinel 服务器本质上是一个特殊模式的 redis 服务器，不会用到数据库，不需要载入 RDB 和 AOF 文件。

`作用`：监控、故障转移和通知。

`监控过程`：

1. 每秒一次向所有服务器发送==PING==指令，根据返回==+PONG==、==-LOADING==和==-MASTERDOWN==判断是否在线，否则为主观下线。
2. 超过==quorum==参数 Sentinel 都认为主观下线，则判断服务已下线，进入故障转移。

`故障转移前`，首先要选举领头 Sentinel：

1. 每个 Sentinel 都有机会，谁先发送==Sentinel is-master-down-by-addr==命令，谁先获得一票。
2. 被超过==半数==以上的 Sentinel 设置成了==局部领头 Sentinel==则成为==领头 Sentinel==。
3. 如果给定时间内没有选出结果，再次选举直到出结果。

`故障转移`过程：

1. 选一个从服务器，执行==slave of no one==命令，让它为主服务器。
2. 所有从服务器执行==slave of ip port==，成为新主服务器的从服务器。
3. 将已下线的主节点设置为新主服务器的从服务器。

`新主服务器挑选`流程：

1. 删除下线的断线的从服务器

2. 删除 5 秒内未响应 sentinel 的 ==INFO== 命令的从服务器

3. 删除和下线主服务器超时时间超过==down-after-milliseconds==10 倍的从服务器

4. 根据 slave 优先级，选取最高的

5. 优先级相同，复制偏移量最大的 slave

6. 偏移量相同，服务器 run id 排序，取最小的

### 3. 分片集群

主从集群中，每个节点都要保存所有信息，容易形成木桶效应。并且当数据量较大时，单个机器无法满足需求。此时我们就要使用分片集群了。

集群特征：

- 每个节点都保存不同数据
- 所有的 redis 节点彼此互联(PING-PONG 机制)，内部使用二进制协议优化传输速度和带宽.

- 节点的 fail 是通过集群中超过半数的节点检测失效时才生效.

- 客户端与 redis 节点直连,不需要中间 proxy 层连接集群中任何一个可用节点都可以访问到数据

- redis-cluster 把所有的物理节点映射到[0-16383]slot（插槽）上，实现动态伸缩

每个节点都保存不同数据，数据分布在哈希槽上。

哈希槽：16384 个槽，这些槽分配到不同的实例中，不能有剩余。

槽定位：每个 key 进行 CRC16 算法再对槽数取模，找到对应位置。

> 如果数据迁移或者加入新节点后，哈希槽可能会发生变化，客户端此时的请求到了旧的节点上，会返回一个 MOVED 错误，并且指引客户端转向正确的节点来请求。

#### 槽指派过程

命令：==cluster addslots 槽号==。

- 更新 clusterState 数组，将指定槽 slots[i] 指向当前 clusterNode。

- 更新 clusterNode 的 slots 数据，将指定槽 slots[i]处的值更新为 1。

- 向集群中的其他节点发信息，将 clusterNode 的 slots 数组发送给其他节点，告诉他们自己负责那个槽。

#### 重新分片

重新分配 A 节点的槽给 B 节点处理：

- MIGRATING A 节点设置，如果请求过来 key 还在当前节点负责的槽，那么会处理。否则-ask 重定向到迁移节点-B 节点。
- IMPORTING 接受到 asking 命令才会接受查询这个哈希槽的请求。

> 重新分片期间，数据部分迁移，客户端发来查询时的处理：
>
> - 先在源节点查找，如果找到，直接执行命令并返回结果。
> - 如果找不到，说明可能迁移到目标节点了，源节点返回一个 ASK 错误，指引客户端到目标节点查找，命令带有 REDIS_ASKING 标识，目标节点会破例执行这个命令一次。
>
> 注意：ASK 和 moved 错误都是隐式的。

#### 故障转移

1. 每个节点定期向其他节点发送==Ping==，如果一定时间内没有 pong 就认为疑似下线 ==PFAIL==。

2. 发送消息给其他节点，疑似下线的信息会同步。
3. 如果半数以上的主节点都认为某个主节点疑似下线，那么就标记为已下线 ==FAIL==。
4. 发送消息给其他节点，从节点知道自己的主节点挂了就要选举。
5. 选举一个节点作为最新的节点，执行==slaveof no one==。
6. 新的主节点撤销原来节点的槽指派，指派给自己，修改 clusterNode 和 clusterState 结构。
7. 新的主节点向集群广播 ==pong==消息，其他节点知道有新的主节点产生，更新结构。
8. 新的节点向剩余从节点发送新的 ==slaveof== 指令，成为自己的从节点。

## Redis 的常用数据类型有哪些？

支持多种类型的数据结构，主要区别是 value 存储的数据格式不同：

- string：最基本的数据类型，二进制安全的字符串，最大 512M。

  > 底层：SDS，简单动态字符串。
  >
  > 场景：缓存，分布式 ID 自增，分布式锁

- list：按照添加顺序保持顺序的字符串列表。

  > 底层：
  >
  > 场景：点赞列表。

- set：无序的字符串集合，不存在重复的元素。

  > 底层：
  >
  > 场景：关注（点赞 ）、取关、共同关注。

- sorted set：已排序的字符串集合。

  > 底层：
  >
  > 场景：排行榜

- hash：key-value 对格式

  > 底层：
  >
  > 场景：购物车，用户 id 作为 key，商品 id，数量

三种特殊数据类型：

- Bitmap：位图，二进制位数组

  > 底层：SDS
  >
  > 场景：用户签到功能

- HyperLogLog：不精确的统计

  > 原理：计算低位 0 的个数
  >
  > 场景：统计页面 UV

- Geospecial

  > 场景：附近的人

## 聊一下 Redis 事务机制

**相关资料：**

参考：http://redisdoc.com/topic/transaction.html

Redis 事务功能是通过 MULTI、EXEC、DISCARD 和 WATCH 四个原语实现的。Redis 会将一个事务中的所有命令序列化，然后按顺序执行。但是 Redis 事务不支持回滚操作，命令运行出错后，正确的命令会继续执行。

- `MULTI`: 用于开启一个事务，它总是返回 OK。 MULTI 执行之后，客户端可以继续向服务器发送任意多条命令，这些命令不会立即被执行，而是被放到一个**待执行命令队列**中
- `EXEC`：按顺序执行命令队列内的所有命令。返回所有命令的返回值。事务执行过程中，Redis 不会执行其它事务的命令。
- `DISCARD`：清空命令队列，并放弃执行事务， 并且客户端会从事务状态中退出
- `WATCH`：Redis 的乐观锁机制，利用 compare-and-set（CAS）原理，可以监控一个或多个键，一旦其中有一个键被修改，之后的事务就不会执行

使用事务时可能会遇上以下两种错误：

- 执行 EXEC 之前，入队的命令可能会出错。比如说，命令可能会产生语法错误（参数数量错误，参数名错误，等等），或者其他更严重的错误，比如内存不足（如果服务器使用 `maxmemory` 设置了最大内存限制的话）。
  - Redis 2.6.5 开始，服务器会对命令入队失败的情况进行记录，并在客户端调用 EXEC 命令时，拒绝执行并自动放弃这个事务。
- 命令可能在 EXEC 调用之后失败。举个例子，事务中的命令可能处理了错误类型的键，比如将列表命令用在了字符串键上面，诸如此类。
  - 即使事务中有某个/某些命令在执行时产生了错误， 事务中的其他命令仍然会继续执行，不会回滚。

为什么 Redis 不支持回滚（roll back）？

以下是这种做法的优点：

- Redis 命令只会因为错误的语法而失败（并且这些问题不能在入队时发现），或是命令用在了错误类型的键上面：这也就是说，从实用性的角度来说，失败的命令是由**编程错误**造成的，而这些错误应该在开发的过程中被发现，而不应该出现在生产环境中。
- 因为不需要对回滚进行支持，所以 Redis 的内部可以保持简单且快速。

鉴于没有任何机制能避免程序员自己造成的错误， 并且这类错误通常不会在生产环境中出现， 所以 Redis 选择了更简单、更快速的无回滚方式来处理事务。

**面试话术：**

Redis 事务其实是把一系列 Redis 命令放入队列，然后批量执行，执行过程中不会有其它事务来打断。不过与关系型数据库的事务不同，Redis 事务不支持回滚操作，事务中某个命令执行失败，其它命令依然会执行。

为了弥补不能回滚的问题，Redis 会在事务入队时就检查命令，如果命令异常则会放弃整个事务。

因此，只要程序员编程是正确的，理论上说 Redis 会正确执行所有事务，无需回滚。

面试官：如果事务执行一半的时候 Redis 宕机怎么办？

Redis 有持久化机制，因为可靠性问题，我们一般使用 AOF 持久化。事务的所有命令也会写入 AOF 文件，但是如果在执行 EXEC 命令之前，Redis 已经宕机，则 AOF 文件中事务不完整。使用 `redis-check-aof` 程序可以移除 AOF 文件中不完整事务的信息，确保服务器可以顺利启动。

## Redis 的 Key 过期策略

### **参考资料：**

#### 为什么需要内存回收？

- 1、在 Redis 中，set 指令可以指定 key 的过期时间，当过期时间到达以后，key 就失效了；
- 2、Redis 是基于内存操作的，所有的数据都是保存在内存中，一台机器的内存是有限且很宝贵的。

基于以上两点，为了保证 Redis 能继续提供可靠的服务，Redis 需要一种机制清理掉不常用的、无效的、多余的数据，失效后的数据需要及时清理，这就需要内存回收了。

Redis 的内存回收主要分为过期删除策略和内存淘汰策略两部分。

#### 过期删除策略

删除达到过期时间的 key。

- 1）定时删除

对于每一个设置了过期时间的 key 都会创建一个定时器，一旦到达过期时间就立即删除。该策略可以立即清除过期的数据，对内存较友好，但是缺点是占用了大量的 CPU 资源去处理过期的数据，会影响 Redis 的吞吐量和响应时间。

- 2）惰性删除

当访问一个 key 时，才判断该 key 是否过期，过期则删除。该策略能最大限度地节省 CPU 资源，但是对内存却十分不友好。有一种极端的情况是可能出现大量的过期 key 没有被再次访问，因此不会被清除，导致占用了大量的内存。

> 在计算机科学中，懒惰删除（英文：lazy deletion）指的是从一个散列表（也称哈希表）中删除元素的一种方法。在这个方法中，删除仅仅是指标记一个元素被删除，而不是整个清除它。被删除的位点在插入时被当作空元素，在搜索之时被当作已占据。

- 3）定期删除

每隔一段时间，扫描 Redis 中过期 key 字典，并清除部分过期的 key。该策略是前两者的一个折中方案，还可以通过调整定时扫描的时间间隔和每次扫描的限定耗时，在不同情况下使得 CPU 和内存资源达到最优的平衡效果。

在 Redis 中，`同时使用了定期删除和惰性删除`。不过 Redis 定期删除采用的是随机抽取的方式删除部分 Key，因此不能保证过期 key 100%的删除。

Redis 为了保证提供高性能服务，被动删除过期的 key，采用了贪心策略/概率算法，默认每隔 10 秒扫描一次，具体策略如下：

1. 从过期字典（设置了过期时间的 key 的集合）中随机选择 20 个 key，检查其是否过期
2. 删除其中已经过期的 key
3. 如果删除的过期 key 数量大于 25%，则重复步骤 1

Redis 结合了定期删除和惰性删除，基本上能很好的处理过期数据的清理，但是实际上还是有点问题的，如果过期 key 较多，定期删除漏掉了一部分，而且也没有及时去查，即没有走惰性删除，那么就会有大量的过期 key 堆积在内存中，导致 redis 内存耗尽，当内存耗尽之后，有新的 key 到来会发生什么事呢？是直接抛弃还是其他措施呢？有什么办法可以接受更多的 key？

## 内存淘汰策略

Redis 的内存淘汰策略，是指内存达到 maxmemory 极限时，使用某种算法来决定清理掉哪些数据，以保证新数据的存入。

Redis 的内存淘汰机制包括：

- noeviction: 当内存不足以容纳新写入数据时，新写入操作会报错。
- allkeys-lru：当内存不足以容纳新写入数据时，在键空间（`server.db[i].dict`）中，移除最近最少使用的 key（这个是最常用的）。
- allkeys-random：当内存不足以容纳新写入数据时，在键空间（`server.db[i].dict`）中，随机移除某个 key。
- volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间（`server.db[i].expires`）中，移除最近最少使用的 key。
- volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间（`server.db[i].expires`）中，随机移除某个 key。
- volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间（`server.db[i].expires`）中，有更早过期时间的 key 优先移除。

> 在配置文件中，通过 maxmemory-policy 可以配置要使用哪一个淘汰机制。

什么时候会进行淘汰？

Redis 会在**每一次处理命令的时候**（processCommand 函数调用 freeMemoryIfNeeded）判断**当前 redis 是否达到了内存的最大限制**，如果达到限制，则使用对应的算法去处理需要删除的 key。

在淘汰 key 时，Redis 默认最常用的是 LRU 算法（Latest Recently Used）。Redis 通过在每一个 redisObject 保存 lru 属性来保存 key 最近的访问时间，在实现 LRU 算法时直接读取 key 的 lru 属性。

具体实现时，Redis 遍历每一个 db，从每一个 db 中随机抽取一批样本 key，默认是 3 个 key，再从这 3 个 key 中，删除最近最少使用的 key。

### 面试话术：

Redis 过期策略包含定期删除和惰性删除两部分。定期删除是在 Redis 内部有一个定时任务，会定期删除一些过期的 key。惰性删除是当用户查询某个 Key 时，会检查这个 Key 是否已经过期，如果没过期则返回用户，如果过期则删除。

但是这两个策略都无法保证过期 key 一定删除，漏网之鱼越来越多，还可能导致内存溢出。当发生内存不足问题时，Redis 还会做内存回收。内存回收采用 LRU 策略，就是最近最少使用。其原理就是记录每个 Key 的最近使用时间，内存回收时，随机抽取一些 Key，比较其使用时间，把最老的几个删除。

Redis 的逻辑是：最近使用过的，很可能再次被使用

## Redis 在项目中的哪些地方有用到?

（1）共享 session

在分布式系统下，服务会部署在不同的 tomcat，因此多个 tomcat 的 session 无法共享，以前存储在 session 中的数据无法实现共享，可以用 redis 代替 session，解决分布式系统间数据共享问题。

（2）数据缓存

Redis 采用内存存储，读写效率较高。我们可以把数据库的访问频率高的热点数据存储到 redis 中，这样用户请求时优先从 redis 中读取，减少数据库压力，提高并发能力。

（3）异步队列

Reids 在内存存储引擎领域的一大优点是提供 list 和 set 操作，这使得 Redis 能作为一个很好的消息队列平台来使用。而且 Redis 中还有 pub/sub 这样的专用结构，用于 1 对 N 的消息通信模式。

（4）分布式锁

Redis 中的乐观锁机制，可以帮助我们实现分布式锁的效果，用于解决分布式系统下的多线程安全问题

## Redis 的缓存击穿、缓存雪崩、缓存穿透

### 1）缓存穿透

参考资料：

- 什么是缓存穿透
  - 正常情况下，我们去查询数据都是存在。那么请求去查询一条压根儿数据库中根本就不存在的数据，也就是缓存和数据库都查询不到这条数据，但是请求每次都会打到数据库上面去。这种查询不存在数据的现象我们称为**缓存穿透**。
- 穿透带来的问题

  - 试想一下，如果有黑客会对你的系统进行攻击，拿一个不存在的 id 去查询数据，会产生大量的请求到数据库去查询。可能会导致你的数据库由于压力过大而宕掉。

- 解决办法
  - 缓存空值：之所以会发生穿透，就是因为缓存中没有存储这些空数据的 key。从而导致每次查询都到数据库去了。那么我们就可以为这些 key 对应的值设置为 null 丢到缓存里面去。后面再出现查询这个 key 的请求的时候，直接返回 null 。这样，就不用在到数据库中去走一圈了，但是别忘了设置过期时间。
  - BloomFilter（布隆过滤）：hash+bitmap，将所有可能存在的数据哈希到一个足够大的 bitmap 中，一个一定不存在的数据会被 这个 bitmap 拦截掉，从而避免了对底层存储系统的查询压力。在缓存之前在加一层 BloomFilter ，在查询的时候先去 BloomFilter 去查询 key 是否存在，如果不存在就直接返回，存在再走查缓存 -> 查 DB。

**话术：**

缓存穿透有两种解决方案：**其一**是把不存在的 key 设置 null 值到缓存中。**其二**是使用布隆过滤器，在查询缓存前先通过布隆过滤器判断 key 是否存在，存在再去查询缓存。

设置 null 值可能被恶意针对，攻击者使用大量不存在的不重复 key ，那么方案一就会缓存大量不存在 key 数据。此时我们还可以对 Key 规定格式模板，然后对不存在的 key 做**正则规范**匹配，如果完全不符合就不用存 null 值到 redis，而是直接返回错误。

### 2）缓存击穿

**相关资料**：

- 什么是缓存击穿？

key 可能会在某些时间点被超高并发地访问，是一种非常“热点”的数据。这个时候，需要考虑一个问题：缓存被“击穿”的问题。

当这个 key 在失效的瞬间，redis 查询失败，持续的大并发就穿破缓存，直接请求数据库，就像在一个屏障上凿开了一个洞。

- 解决方案：
  - 使用互斥锁(mutex key)：mutex，就是互斥。简单地来说，就是在缓存失效的时候（判断拿出来的值为空），不是立即去 load db，而是先使用 Redis 的 SETNX 去 set 一个互斥 key，当操作返回成功时，再进行 load db 的操作并回设缓存；否则，就重试整个 get 缓存的方法。SETNX，是「SET if Not eXists」的缩写，也就是只有不存在的时候才设置，可以利用它来实现互斥的效果。
  - 设置热点数据永不过期
  - 软过期：也就是逻辑过期，不使用 redis 提供的过期时间，而是业务层在数据中存储过期时间信息。查询时由业务程序判断是否过期，如果数据即将过期时，将缓存的时效延长，程序可以派遣一个线程去数据库中获取最新的数据，其他线程这时看到延长了的过期时间，就会继续使用旧数据，等派遣的线程获取最新数据后再更新缓存。

推荐使用互斥锁，因为软过期会有业务逻辑侵入和额外的判断。

**面试话术**：

缓存击穿主要担心的是某个 Key 过期，更新缓存时引起对数据库的突发高并发访问。因此我们可以在更新缓存时采用互斥锁控制，只允许一个线程去更新缓存，其它线程等待并重新读取缓存。例如 Redis 的 setnx 命令就能实现互斥效果。

### 3）缓存雪崩

**相关资料**：

缓存雪崩，是指在某一个时间段，缓存集中过期失效或者 Redis 服务器宕机。对这批数据的访问查询，都落到了数据库上，对于数据库而言，就会产生周期性的压力波峰。

解决方案：

- 数据分类分批处理：采取不同分类数据，缓存不同周期
- 相同分类数据：采用固定时长加随机数方式设置缓存
- 热点数据缓存时间长一些，冷门数据缓存时间短一些
- 避免 redis 节点宕机引起雪崩，搭建主从集群，保证高可用

**面试话术：**

解决缓存雪崩问题的关键是让缓存 Key 的过期时间分散。因此我们可以把数据按照业务分类，然后设置不同过期时间。相同业务类型的 key，设置固定时长加随机数。尽可能保证每个 Key 的过期时间都不相同。

另外，Redis 宕机也可能导致缓存雪崩，因此我们还要搭建 Redis 主从集群及哨兵监控，保证 Redis 的高可用。

## 缓存冷热数据分离

**背景资料**：

Redis 使用的是内存存储，当需要海量数据存储时，成本非常高。

经过调研发现，当前主流 DDR3 内存和主流 SATA SSD 的单位成本价格差距大概在 20 倍左右，为了优化 redis 机器综合成本，我们考虑实现基于**热度统计 的数据分级存储**及数据在 RAM/FLASH 之间的动态交换，从而大幅度降低成本，达到性能与成本的高平衡。

基本思路：基于 key 访问次数(LFU)的热度统计算法识别出热点数据，并将热点数据保留在 redis 中，对于无访问/访问次数少的数据则转存到 SSD 上，如果 SSD 上的 key 再次变热，则重新将其加载到 redis 内存中。

目前流行的高性能磁盘存储，并且遵循 Redis 协议的方案包括：

- SSDB：http://ssdb.io/zh_cn/
- RocksDB：https://rocksdb.org.cn/

因此，我们就需要在应用程序与缓存服务之间引入代理，实现 Redis 和 SSD 之间的切换，如图：

<!-- ![image-20200521115702956](%E5%BE%AE%E6%9C%8D%E5%8A%A1%E9%9D%A2%E8%AF%95.assets/image-20200521115702956.png) -->

这样的代理方案阿里云提供的就有。当然也有一些开源方案，例如：https://github.com/JingchengLi/swapdb

## Redis 实现分布式锁

分布式锁要满足的条件：

- 多进程互斥：同一时刻，只有一个进程可以获取锁
- 保证锁可以释放：任务结束或出现异常，锁一定要释放，避免死锁
- 阻塞锁（可选）：获取锁失败时可否重试
- 重入锁（可选）：获取锁的代码递归调用时，依然可以获取锁

### 1）最基本的分布式锁：

利用 Redis 的 setnx 命令，这个命令的特征时如果多次执行，只有第一次执行会成功，可以实现`互斥`的效果。但是为了保证服务宕机时也可以释放锁，需要利用 expire 命令给锁设置一个有效期

```
setnx lock thread-01 # 尝试获取锁
expire lock 10 # 设置有效期
```

**面试官问题 1**：如果 expire 之前服务宕机怎么办？

要保证 setnx 和 expire 命令的原子性。redis 的 set 命令可以满足：

```
set key value [NX] [EX time]
```

需要添加 nx 和 ex 的选项：

- NX：与 setnx 一致，第一次执行成功
- EX：设置过期时间

**面试官问题 2**：释放锁的时候，如果自己的锁已经过期了，此时会出现安全漏洞，如何解决？

在锁中存储当前进程和线程标识，释放锁时对锁的标识判断，如果是自己的则删除，不是则放弃操作。

但是这两步操作要保证原子性，需要通过 Lua 脚本来实现。

```
if redis.call("get",KEYS[1]) == ARGV[1] then
    redis.call("del",KEYS[1])
end
```

```lua
if redis.call("get", KEYS[1]) == ARGV[1] then
	return redis.call("del", KEYS[1])
else
	return 0
end
```

### 2）可重入分布式锁

如果有重入的需求，则除了在锁中记录进程标识，还要记录重试次数，流程如下：

<!-- ![1574824172228](%E5%BE%AE%E6%9C%8D%E5%8A%A1%E9%9D%A2%E8%AF%95.assets/1574824172228.png) -->

下面我们假设锁的 key 为“`lock`”，hashKey 是当前线程的 id：“`threadId`”，锁自动释放时间假设为 20

获取锁的步骤：

- 1、判断 lock 是否存在 `EXISTS lock`
  - 存在，说明有人获取锁了，下面判断是不是自己的锁
    - 判断当前线程 id 作为 hashKey 是否存在：`HEXISTS lock threadId`
      - 不存在，说明锁已经有了，且不是自己获取的，锁获取失败，end
      - 存在，说明是自己获取的锁，重入次数+1：`HINCRBY lock threadId 1`，去到步骤 3
  - 2、不存在，说明可以获取锁，`HSET key threadId 1`
  - 3、设置锁自动释放时间，`EXPIRE lock 20`

释放锁的步骤：

- 1、判断当前线程 id 作为 hashKey 是否存在：`HEXISTS lock threadId`
  - 不存在，说明锁已经失效，不用管了
  - 存在，说明锁还在，重入次数减 1：`HINCRBY lock threadId -1`，获取新的重入次数
- 2、判断重入次数是否为 0：
  - 为 0，说明锁全部释放，删除 key：`DEL lock`
  - 大于 0，说明锁还在使用，重置有效时间：`EXPIRE lock 20`

对应的 Lua 脚本如下：

首先是获取锁：

```lua
local key = KEYS[1]; -- 锁的key
local threadId = ARGV[1]; -- 线程唯一标识
local releaseTime = ARGV[2]; -- 锁的自动释放时间

if(redis.call('exists', key) == 0) then -- 判断是否存在
	redis.call('hset', key, threadId, '1'); -- 不存在, 获取锁
	redis.call('expire', key, releaseTime); -- 设置有效期
	return 1; -- 返回结果
end;

if(redis.call('hexists', key, threadId) == 1) then -- 锁已经存在，判断threadId是否是自己
	redis.call('hincrby', key, threadId, '1'); -- 不存在, 获取锁，重入次数+1
	redis.call('expire', key, releaseTime); -- 设置有效期
	return 1; -- 返回结果
end;
return 0; -- 代码走到这里,说明获取锁的不是自己，获取锁失败
```

然后是释放锁：

```lua
local key = KEYS[1]; -- 锁的key
local threadId = ARGV[1]; -- 线程唯一标识
local releaseTime = ARGV[2]; -- 锁的自动释放时间

if (redis.call('HEXISTS', key, threadId) == 0) then -- 判断当前锁是否还是被自己持有
    return nil; -- 如果已经不是自己，则直接返回
end;
local count = redis.call('HINCRBY', key, threadId, -1); -- 是自己的锁，则重入次数-1

if (count > 0) then -- 判断是否重入次数是否已经为0
    redis.call('EXPIRE', key, releaseTime); -- 大于0说明不能释放锁，重置有效期然后返回
    return nil;
else
    redis.call('DEL', key); -- 等于0说明可以释放锁，直接删除
    return nil;
end;
```

### 3）高可用的锁

`面试官问题`：redis 分布式锁依赖与 redis，如果 redis 宕机则锁失效。如何解决？

此时大多数同学会回答说：搭建主从集群，做数据备份。

这样就进入了陷阱，因为面试官的下一个问题就来了：

`面试官问题`：如果搭建主从集群做数据备份时，进程 A 获取锁，master 还没有把数据备份到 slave，master 宕机，slave 升级为 master，此时原来锁失效，其它进程也可以获取锁，出现安全问题。如何解决？

关于这个问题，Redis 官网给出了解决方案，使用 RedLock 思路可以解决：

> 在 Redis 的分布式环境中，我们假设有 N 个 Redis master。这些节点完全互相独立，不存在主从复制或者其他集群协调机制。之前我们已经描述了在 Redis 单实例下怎么安全地获取和释放锁。我们确保将在每（N)个实例上使用此方法获取和释放锁。在这个样例中，我们假设有 5 个 Redis master 节点，这是一个比较合理的设置，所以我们需要在 5 台机器上面或者 5 台虚拟机上面运行这些实例，这样保证他们不会同时都宕掉。
>
> 为了取到锁，客户端应该执行以下操作:
>
> 1. 获取当前 Unix 时间，以毫秒为单位。
> 2. 依次尝试从 N 个实例，使用相同的 key 和随机值获取锁。在步骤 2，当向 Redis 设置锁时,客户端应该设置一个网络连接和响应超时时间，这个超时时间应该小于锁的失效时间。例如你的锁自动失效时间为 10 秒，则超时时间应该在 5-50 毫秒之间。这样可以避免服务器端 Redis 已经挂掉的情况下，客户端还在死死地等待响应结果。如果服务器端没有在规定时间内响应，客户端应该尽快尝试另外一个 Redis 实例。
> 3. 客户端使用当前时间减去开始获取锁时间（步骤 1 记录的时间）就得到获取锁使用的时间。当且仅当从大多数（这里是 3 个节点）的 Redis 节点都取到锁，并且使用的时间小于锁失效时间时，锁才算获取成功。
> 4. 如果取到了锁，key 的真正有效时间等于有效时间减去获取锁所使用的时间（步骤 3 计算的结果）。
> 5. 如果因为某些原因，获取锁失败（*没有*在至少 N/2+1 个 Redis 实例取到锁或者取锁时间已经超过了有效时间），客户端应该在所有的 Redis 实例上进行解锁（即便某些 Redis 实例根本就没有加锁成功）。

## 如何实现数据库与缓存数据一致？

面试话术：

实现方案有下面几种：

- 本地缓存同步：当前微服务的数据库数据与缓存数据同步，可以直接在数据库修改时加入对 Redis 的修改逻辑，保证一致。
- 跨服务缓存同步：服务 A 调用了服务 B，并对查询结果缓存。服务 B 数据库修改，可以通过 MQ 通知服务 A，服务 A 修改 Redis 缓存数据
- 通用方案：使用 Canal 框架，伪装成 MySQL 的 salve 节点，监听 MySQL 的 binLog 变化，然后修改 Redis 缓存数据

3、**更新数据库 + 更新缓存**方案，在「并发」场景下无法保证缓存和数据一致性，且存在「缓存资源浪费」和「机器性能浪费」的情况发生

4、在**更新数据库 + 删除缓存**的方案中，「先删除缓存，再更新数据库」在「并发」场景下依旧有数据不一致问题，解决方案是「延迟双删」，但这个延迟时间很难评估，所以推荐用「先更新数据库，再删除缓存」的方案

5、在「**先更新数据库，再删除缓存**」方案下，为了保证两步都成功执行，需配合「消息队列」或「订阅变更日志」的方案来做，本质是通过「重试」的方式保证数据一致性

6、在「**先更新数据库，再删除缓存**」方案下，「读写分离 + 主从库延迟」也会导致缓存和数据库不一致，缓解此问题的方案是「延迟双删」，凭借经验发送「延迟消息」到队列中，延迟删除缓存，同时也要控制主从库延迟，尽可能降低不一致发生的概率

# MySQL 篇

## 什么是事务？事务的四大特性？

事务是一组操作的集合，它是一个不可分割的工作单位，这些操作要么同时成功，要么同时失败。

事务的四大特性是：ACID

- `Atomicity 原子性`：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。

  > 原子性是通过 undo log （回滚日志）来保证的，因为 undo log 日志记录的是数据修改前的信息。
  >
  > 比如：
  >
  > insert 一条数据，undo log 会记录对应一条 delete 日志。
  >
  > update 一条数据时，undo log 会记录之前 旧值 的 update 日志。
  >
  > delete 一条数据时，undo log 会记录这条数据的 insert 日志。
  >
  > 如果执行事务出现了异常情况，就会回滚，利用 undo log 记录数据，来恢复到事务之前的状态。

- `Consistency 一致性`：事务完成时，必须所有的数据保持一致的状态。

  > 一致性是我们使用事务的目的，隔离性、持久性、原子性都是我们保障一致性的手段。

- `Isolation 隔离性`：数据库提供隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。

  > 如果多个事务操作同一个数据，那么就会产生脏读、不可重复读、幻读的问题。
  >
  > 于是，事务与事务之间需要一定的隔离。在 InnoDB 引擎中，定义了四种隔离级别供我们使用。

- `Durability 持久性`：事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

  > 持久性由 redo log （重做日志）来保证，redo log 分为`重做日志缓冲`和`重做日志文件`。
  >
  > 当我们修改数据的时候，MySQL 先把这条记录所在的页找到，然后把该页加载到内存中，将对应记录修改。为了防止内存修改完了，MySQL 就挂掉了，就会写一份 redo log，记录这次在某个页上做了什么修改，即使 MySQL 在中途挂了，我们还可以根据 redo log 进行数据恢复。
  >
  > redo log 是顺序写的，写入速度很快。并且它记录的是物理修改，文件的体积很小，恢复速度很快。

## 事务的隔离级别有哪些?

事务的隔离级别：==读未提交==、==读已提交==、==可重复读==和==串行化==，MySQL 默认是==可重复读==。

| 隔离级别                 | 脏读 | 不可重复读 | 幻读 |
| ------------------------ | ---- | ---------- | ---- |
| Read uncommited 读未提交 | √    | √          | √    |
| Read committed 读已提交  | ×    | √          | √    |
| Repeatable read 可重复读 | ×    | ×          | √    |
| Serializable 串行化      | ×    | ×          | ×    |

- 事务的隔离级别越高，隔离性越好，数据越安全，但是性能越低。

并发事务问题：==脏读==、==不可重复读==、==幻读==。

| 问题       | 描述                                                                                             |
| ---------- | :----------------------------------------------------------------------------------------------- |
| 脏读       | 一个事务读到了另一个事务还没有提交的数据。                                                       |
| 不可重复读 | 一个事务先后读取同一条数据，两次数据结果不同。                                                   |
| 幻读       | 一个事务按照条件查询数据时，没有对应行，但是在插入数据时，又发现这行数据存在，好像出现了“幻影”。 |

## 内连接与左外连接的区别是什么?

内连接，左表和右表不符合条件的数据都不会在结果中。

左外连接，不符合条件时，左表的数据会在结果中，这些数据右表的结果为 null。

## 常用的存储引擎？

常用的存储引擎：==InnoDB==、==MyISAM==、==Memory==。

## InnoDB 与 MyISAM 的区别？

### InnoDB

- 兼顾高可靠性和高性能的通用存储引擎，在 MySQL5.5 之后默认。
- 支持事务。
- 支持行级锁，提高并发访问性能。
- 支持外键 Foreign key 约束，保证数据的完整性和正确性。

### MyISAM

- 早起的默认存储引擎。
- 不支持事务，不支持外键。
- 支持表锁，不支持行级锁。
- 访问速度快。

### 存储引擎的选择

- 对事务的完整性要求比较高，并发情况下要求数据一致性，数据操作除了插入和查询，还有很多更新、删除操作，选 InnoDB。
- 主要是查询和插入操作，很少更新和修改，对事务完整性、并发性要求不高，选 MyISAM。
- 将所有数据保存在内存中，临时表，选择 Memory。

## InnoDB 引擎的索引是什么数据结构?

索引：索引是帮助 MySQL 高效获取数据的数据结构。

InnoDB 引擎的索引是==B+树==索引，是一种==多路搜索树==，所有数据都放在叶子节点，叶子节点形成双向链表。

- 相对于==二叉树==，每个节点可以存放更多数据，树的高度会比二叉搜索树低，检索速度快。

- 相对于==B 树==，它的非叶子节点不存放数据，在相同数据量情下，B+树更加矮壮。

- 相对于 ==Hash 索引==，B+树支持范围匹配和排序操作。

## 索引的分类

| 分类     | 含义                                           | 特点                     | 关键字   |
| -------- | ---------------------------------------------- | ------------------------ | -------- |
| 主键索引 | 针对表中主键创建的索引                         | 默认自动创建，只能有一个 | PRIMARY  |
| 唯一索引 | 避免同一个表中某数据列值重复                   | 可以有多个               | UNIQUE   |
| 常规索引 | 快速定位特定数据                               | 可以有多个               |          |
| 全文索引 | 全文索引查找的是文本中的关键字，不比较索引的值 | 可以有多个               | FULLTEXT |

按存储形式，分两种

| 分类     | 含义                                                       | 特点               |
| -------- | ---------------------------------------------------------- | ------------------ |
| 聚集索引 | 将数据和索引放到一起，索引结构的叶子节点保存了整行的数据   | 必须有，只且有一个 |
| 二级索引 | 将数据和索引分开存储，索引结构的叶子节点关联的是对应的主键 | 可以有多个         |

> 聚集索引选取规则：
>
> - 如果存在主键，主键就是聚集索引
> - 否则，如果存在唯一索引，使用第一个创建的唯一索引作为聚集索引。
> - 否则，InnoDB 会生成一个 rowid 作为隐藏的聚集索引。

## 什么是回表查询?

回表查询：当我们使用索引查询数据时，查询出来的结果包含非索引字段的其他列，走的索引树叶子节点只能查到当前列值和主键 ID，所以需要根据 ID 再次查询一遍数据，得到 SQL 所有所需的字段列。

避免回表，可以使用覆盖索引。

覆盖索引：查的字段都刚好在叶子节点都存在，也就是这些字段都在一个索引里面。

## 如何查看 MySQL 的执行计划?

explain SQL 语句;

## 索引失效的情况有哪些?

1. 联合索引时，没有满足最左前缀法则，查询没有从索引的最左列开始，或者跳过了某列，如果跳过后面的字段将会失效。
2. 联合索引中使用 >、< 等进行范围查询，范围查询右侧的列失效。
3. 在索引列上进行运算操作，索引失效。
4. 在字符串类型使用时不加引号，索引失效。
5. 头部模糊匹配会导致索引失效。
6. or 连接分割的条件，or 前面的列有索引，or 后面的列没有索引，or 前面的索引会失效。
7. 如果 MySQL 评估使用索引比全表扫描更慢，就不会使用索引。

## SQL 优化

1. 插入优化：尽量批量插入数据，并且手动控制事务，主键顺序插入。大批量数据插入时用 load data local infile。
2. 主键优化：主键长度尽量短，顺序自增。
3. order by 优化：尽量使用索引，多字段满足最左前缀法则，file sort -> index sort。
4. group by 优化：尽量使用索引，多字段满足最左前缀法则。
5. limit 优化：分页查询时，尽量使用覆盖索引 + 子查询的方式来优化。通过子查询先查出记录的 ID，再通过 ID 查询需要的数据。
6. count 优化：尽量使用 count(\*)或 count(1)，而不是 count 字段。
7. update 优化：根据主键字段和索引字段进行更新，因为 InnoDB 的行锁都是对索引字段加锁，不这样做会升级为表锁。

## 锁

### 1. 全局锁

锁住整个数据库实例，一般是做全库备份。

### 2. 表级锁

每次操作锁住整张表。锁的粒度大，发生锁冲突的概率高，并发度低。

表级锁分为 表锁、元数据锁、意向锁。

#### 表锁

- 表共享读锁：不会阻塞读，会阻塞写。lock tables 表名 read/write;

- 表共享写锁：阻塞读又阻塞写。unlock tables 表名，或者客户端断开连接。

#### 元数据锁（meta data lock）

自动加锁，为了保证元数据的数据一致性，当表上有活动事务时，不允许对元数据写入，避免 DML 与 DDL 冲突。

#### 意向锁

避免在 DML 执行时，加的行锁与表锁冲突，引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁减少表锁的检查。

- 意向共享锁（IS）：与表锁共享锁兼容，与表锁排它锁互斥。select ... lock in share mode;
- 意向排它锁（IX）：与表锁共享锁兼容，与表锁排它锁互斥。insert、update、delete、select ... for update 添加。

### 3.行级锁

行级锁：每次操作锁住对应行的数据，锁的粒度最小，发生锁冲突的概率最低，并发度最高。

#### 行锁

锁定单个行记录的锁，防止其他事务对此进行 update 和 delete。在 RC、RR 隔离级别都支持。

- 共享锁（S）：允许一个事务去读一行，阻止其他事务获得相同数据集的排他锁。
- 排他锁（X）：允许获取排他锁的事务更新数据，阻止其他事务获得相同数据集的共享锁和排他锁。

#### 间隙锁

锁定索引记录间隙，确保索引记录间隙不变，防止其他事务在这个间隙进行 insert，产生幻读。RR 隔离级别支持。

#### 临键锁

行锁和间隙锁组合，同事锁住数据，并锁住数据前面的间隙。在 RR 隔离级别下支持。

## 什么是 MVCC?

当前读：读取的数据是记录的最新版本，读取时还要保证其他并发事务不能修改当前记录，会对读取的记录进行枷锁。

快照读：简单的 select 就是快照读，快照读读取的是数据的可见版本，又可能是历史数据，不加锁，是非阻塞读。

- RC：每次 select 都生成一个快照读。
- RR：每次开启事务第一个 select 语句才是快照读的地方。
- Serializable：快照读会退化为当前读。

MVCC：多版本并发控制。指维护一个数据的多个版本，使得读写操作没有冲突。快照读提供了一个非阻塞读的功能。具体实现依赖三个隐式字段、undo log 日志、readview。

- ==隐藏字段==：

  - DB_TRX_ID：最近修改事务 ID，记录插入这条记录或者最后一次修改该记录的事务 ID。
  - DB_ROLL_PTR：回滚指针，指向这条记录的上一个版本，用于配合 undo log ，指向上一个版本。
  - DB_ROW_ID：隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段。

- ==undo log==：回滚日志，在 insert、update、delete 的时候产生便于数据回滚的日志。

  当 insert 的时候，产生的 undo log 只在回滚时需要，在事务提交后，可被立即删除。

  而 update、delete 的时候，产生的 undo log 日志不仅在回滚时需要，在快照读时也需要，不会被立即删除。

  > undo log 版本链：不同事务或相同事务对同一条记录进行修改，会导致该记录的 undo log 生成一条记录版本链表，链表的头部是最新的旧记录，链表尾部是最早的旧记录。

- ==readview==：读视图是 快照读 SQL 执行时 MVCC 提供数据的依据，记录并且维护系统当前活跃事务的 ID。读视图中包含了四个核心字段：

  - m_ids：当前活跃的事务 ID 集合

  - min_trx_id：最小活跃事务 ID

  - max_trx_id：预分配事务 ID，当前最大事务 ID+1

  - creator_trx_id：readview 创建者的事务 ID

    > - trx_id == creator_trx_id ，说明数据是当前事务修改
    >
    > - trx_id < min_trx_id ，说明数据已经提交了
    >
    > - trx_id > max_trx_id ，不可以访问，说明当前事务是在 raedview 生成后开启
    >
    > - min_trx_id <= trx_id <= max_trx_id ， 如果 trx_id 不在 m_ids 中是可以访问该版本的，成立说明数据已提交
    >
    > readview 生成时机
    >
    > - RC：事务中每次执行快照读生成 ReadView。
    > - RR：在事务中第一次执行快照读的时候生成 ReadView，后续复用。

## bin log

`binlog` 用于记录数据库执行的写入性操作(不包括查询)信息，以二进制的形式保存在磁盘中。`binlog` 是 `mysql`的逻辑日志，并且由 `Server` 层进行记录，使用任何存储引擎的 `mysql` 数据库都会记录 `binlog` 日志。

在实际应用中， `binlog` 的主要使用场景有两个，分别是 **主从复制** 和 **数据恢复** 。

1. **主从复制** ：在 `Master` 端开启 `binlog` ，然后将 `binlog`发送到各个 `Slave` 端， `Slave` 端重放 `binlog` 从而达到主从数据一致。
2. **数据恢复** ：通过使用 `mysqlbinlog` 工具来恢复数据。

## 连接池

Druid、C3P0、DBCP

# MyBatis 的原理

1. 读取配置文件
2. 加载映射文件
3. 构建 SQLSessionFactory 会话工厂
4. 构建 SqlSession 对象
5. Executor 执行器根据 SqlSession 传递的参数动态生成需要执行的 SQL 语句操作数据库

# 补充篇

## 非对称加密和对称加密的区别

[对称加密](https://so.csdn.net/so/search?q=对称加密&spm=1001.2101.3001.7020)（Symmetric Cryptography），又称私钥加密
对称加密是最快速、最简单的一种[加密](https://so.csdn.net/so/search?q=加密&spm=1001.2101.3001.7020)方式，加密（encryption）与解密（decryption）用的是同样的密钥（secret key）,这种方法在密码学中叫做对称加密算法。

[非对称加密](https://so.csdn.net/so/search?q=非对称加密&spm=1001.2101.3001.7020)（Asymmetric Cryptography），又称公钥加密
非对称加密为数据的加密与解密提供了一个非常安全的方法，它使用了一对密钥，公钥（public key）和[私钥](https://so.csdn.net/so/search?q=私钥&spm=1001.2101.3001.7020)（private key）。私钥只能由一方安全保管，不能外泄，而公钥则可以发给任何请求它的人。非对称加密使用这对密钥中的一个进行加密，而解密则需要另一个密钥。比如，你向银行请求公钥，银行将公钥发给你，你使用公钥对消息加密，那么只有私钥的持有人–银行才能对你的消息解密。与对称加密不同的是，银行不需要将私钥通过网络发送出去，因此安全性大大提高。

区别：

1. 对称加密和解密用的是同一个密钥，速度快，密钥在网络中传输，安全性不高
2. 非对称加密使用公钥加密，私钥解密，安全性高，速度慢
3. 最安全的做法是(HTTPS 就是这样混合加密)：将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双方可以使用对称加密来进行沟通。

## HTTP 与 HTTPS 的区别

HTTP 协议传输的数据都是未加密的，也就是明文的，因此使用 HTTP 协议传输隐私信息非常不安全，为了保证这些隐私数据能加密传输，于是网景公司设计了 SSL（Secure Sockets Layer）协议用于对 HTTP 协议传输的数据进行加密，从而就诞生了 HTTPS。

HTTPS 协议是由 SSL/TLS + HTTP 协议构建的可进行加密传输、身份认证的网络协议，要比 http 协议安全。

区别主要如下：

1. https 协议需要到 ca 申请证书，一般免费证书较少，因而需要一定费用。

2. http 是超文本传输协议，信息是明文传输，https 则是具有安全性的 ssl 加密传输协议。

3. http 和 https 使用的是完全不同的连接方式，用的端口也不一样，前者是 80，后者是 443。

4. http 的连接很简单，是无状态的；HTTPS 协议是由 SSL/TLS + HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 http 协议安全。
