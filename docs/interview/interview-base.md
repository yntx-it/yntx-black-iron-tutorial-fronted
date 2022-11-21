---
sidebar_position: 2
---

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
