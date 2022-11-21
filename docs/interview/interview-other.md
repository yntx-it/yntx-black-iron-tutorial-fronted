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