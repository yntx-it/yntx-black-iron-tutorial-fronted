---
sidebar_position: 1
---

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
