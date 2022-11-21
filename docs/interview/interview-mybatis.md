# MyBatis 的原理

1. 读取配置文件
2. 加载映射文件
3. 构建 SQLSessionFactory 会话工厂
4. 构建 SqlSession 对象
5. Executor 执行器根据 SqlSession 传递的参数动态生成需要执行的 SQL 语句操作数据库
