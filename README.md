# 项目介绍

## 项目名称

yntx-black-iron-tutorial 与你同行-黑铁教程

## 技术选型

黑铁教程是主打程序员基础入门知识文档库，考虑到主要是采用 Markdown 格式编写静态文档来展示，目前市面上有非常多的文档框架，采用服务端渲染方式来加快静态文件访问和提高 SEO。
参考的技术框架如下：

1.
2.
3.
4. 综合考虑，最后决定以 Docusaurus 框架构建本项目。

## 代码地址

GitHub：[https://github.com/yntx-it/yntx-black-iron-tutorial-fronted](https://github.com/yntx-it/yntx-black-iron-tutorial-fronted)
Gitee：[https://gitee.com/yntx-org/yntx-black-iron-tutorial-fronted](https://gitee.com/yntx-org/yntx-black-iron-tutorial-fronted)

## 演示环境

[https://yntx-it.github.io/yntx-black-iron-tutorial-fronted/](https://yntx-it.github.io/yntx-black-iron-tutorial-fronted/)

## 本地调试

启动本地服务：

```bash
yarn start
```

启动成功后，访问 [http://localhost:3000/yntx-black-iron-tutorial-fronted](http://localhost:3000/yntx-black-iron-tutorial-fronted)

## 部署 Github Pages

推荐打开 powershell，执行下面命令

```bash
cmd /C 'set "GIT_USER=yntx-it" && yarn deploy'
```

## 开发教程

### 1.导航栏配置

docusaurus.config.js 文件

```bash
navbar: {
        title: '与你同行-黑铁教程', // 标题名称
        logo: {
          alt: '黑铁教程 Logo', // 图片描述
          src: 'img/logo.svg', // Logo图片
        },
        items: [
          {
            type: 'doc', // 导航栏类型
            docId: 'java/java', // 文档路径
            position: 'left', // 展示位置，左边
            label: 'Java教程', // 导航栏名称
          },
          {
            to: 'docs/interview', // 导航栏跳转地址
            label: '面试宝典', // 导航栏名称
            position: 'right', // 展示位置，左边
          },
          {
            to: '/blog', // 导航栏跳转地址
            label: '博客', // 导航栏名称
            position: 'right', // 展示位置，左边
          },
          {
            href: 'https://github.com/yntx-it', // href外链，GitHub仓库地址
            label: 'GitHub', // GitHub，默认使用内置图标展示，不是文字
            position: 'right', // 展示位置，右边
          },
        ],
      },
```

### 2.底部链接配置

docusaurus.config.js 文件

```bash
// 底部链接
      footer: {
        style: 'dark', // 样式，深色
        links: [
          // 链接
          {
            title: '文档', // 分类标题
            items: [
              {
                label: 'Java教程', // 分类下的标签名
                to: '/docs/java', // 跳转地址
              },
              {
                label: '面试宝典', // 分类下的标签名
                to: '/docs/interview', // 跳转地址
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/yntx-it', // href外链
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/yntx-it',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/yntx-it',
              },
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/yntx-it',
              },
            ],
          },
        ],
        // 底部版权声明
        copyright: `Copyright © ${new Date().getFullYear()} 与你同行技术, Inc. Built with Docusaurus.`,
      },
```

### 3.侧边栏配置

sidebars.js 文件

```javascript
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // 使用自动生成侧边栏
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  // docs侧边栏（暂无内容）
  docs: [],
  // Java侧边栏
  java: ['java/java', 'java/java-introduce', 'java/java-base'],
  // 面试侧边栏
  interview: [
    {
      type: 'category', // 类型为分类，展示的时候是可以下拉收缩的侧边栏项
      label: '常见面试题', // 侧边栏名称
      link: {
        type: 'generated-index', // 自动生成分类展示页内容
        title: '常见面试题', // 分类页标题
        description: '下面列举了一些常见的一些面试题专题。', // 分类页描述
        slug: '/interview', // 分类页地址
        keywords: ['面试'], // 关键字
        image: '/img/docusaurus.png', // 图片
      },
      collapsible: false, // 是否可伸缩
      collapsed: false, // 默认初始收起
      // 侧边栏子项
      items: [
        'interview/interview-algorithm',
        'interview/interview-design',
        'interview/interview-base',
        'interview/interview-collection',
        'interview/interview-concurrency',
        'interview/interview-jvm',
        'interview/interview-microservice',
        'interview/interview-mysql',
        'interview/interview-redis',
        'interview/interview-mq',
        'interview/interview-spring',
        'interview/interview-mybatis',
        'interview/interview-other',
      ],
    },
  ],
}
```

### 4.新增文档

docs 目录下找到对应分类新增，新增后需要在 侧边栏配置 中对应分类添加文档路径。
例如新增一篇 Java 教程文档
1）在 docs/java/ 下新增一个 md 文件：java-test.md
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12790040/1669012628880-7c2176b3-9444-4398-a306-96ce4cea0768.png#averageHue=%23b4a546&clientId=uc7769857-c533-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=824&id=u6044b84e&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1030&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157482&status=done&style=none&taskId=u68e506d0-c860-47c4-ba90-ef878a3824b&title=&width=1536)
2）在 sidebars.js 文件 的侧边栏配置中新增该文件路径
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12790040/1669012722946-4e5a47e8-fd1d-4d52-a7ff-2eab3502f44d.png#averageHue=%23958a40&clientId=uc7769857-c533-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=824&id=u506321d7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1030&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=291134&status=done&style=none&taskId=u624643a3-a87f-4dd8-92ef-7ed142fe9c8&title=&width=1536)
效果如下：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12790040/1669012748831-cd70a220-1ae0-478f-b90b-4813cd82565f.png#averageHue=%23dccb80&clientId=uc7769857-c533-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=831&id=u4f9d71a2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1039&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=107062&status=done&style=none&taskId=u54373044-bf72-4714-a7b7-d58b8709358&title=&width=1536)

### 5.新增博客

1）新增博客前，先配置博客的博主配置，方便博客书写。打开 authors.yml 文件如下图所示：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12790040/1669012832635-356a89d3-c613-4b2c-97e5-8112260138bb.png#averageHue=%23af9447&clientId=uc7769857-c533-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=824&id=u1d7835ee&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1030&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=180950&status=done&style=none&taskId=uca6f9f58-620a-4269-b751-f05a288f29a&title=&width=1536)

```bash
LiZiBa: // 配置项key
  name: 李子捌 // 姓名
  title: 与你同行技术开发者 // 类似个性签名
  url: https://blog.csdn.net/qq_41125219 // 跳转路径
  image_url: https://github.com/Liziba.png // 头像图片路径

Johnnie Wind:
  name: 借力好风
  title: 与你同行技术开发者
  url: http://47.113.86.188:5555
  image_url: https://github.com/JohnnieWind.png

```

配置好后，可以通过配置项 key 来引入，下面将介绍如何新增一篇博客。
2）新增博客，在 blog 路径下创建博客文件 2022-11-21-hello.md

```bash
---
# 路由
slug: hello
# 标题
title: 你好，世界
# 作者
authors: [LiZiBa, Johnnie Wind]
# 标签
tags: [你好, 世界]
---

<!-- 下面是博客markdown内容 -->

Hello World!

```

3）新增完成，博客展示效果如下图：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/12790040/1669013326778-9663595e-cf29-42fe-8430-e7b0307fc66e.png#averageHue=%23e7bc73&clientId=uc7769857-c533-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=831&id=u24e14911&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1039&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=129333&status=done&style=none&taskId=ua72e5a66-02b2-4cf3-a9bc-6e504b45cc6&title=&width=1536)
