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
