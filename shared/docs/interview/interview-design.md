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
