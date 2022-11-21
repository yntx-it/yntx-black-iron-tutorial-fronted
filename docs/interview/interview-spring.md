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
