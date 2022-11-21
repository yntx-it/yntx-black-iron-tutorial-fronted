// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '与你同行-黑铁教程',
  tagline: '学习技术真的很酷',
  url: 'https://yntx-it.github.io',
  baseUrl: '/yntx-black-iron-tutorial-fronted/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'yntx-it', // Usually your GitHub org/user name.
  projectName: 'yntx-black-iron-tutorial-fronted', // Usually your repo name.
  trailingSlash: false,

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/yntx-it/yntx-black-iron-tutorial-fronted/tree/master/shared/',
        },
        blog: {
          blogSidebarTitle: '最近发布',
          blogSidebarCount: 'ALL',
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/yntx-it/yntx-black-iron-tutorial-fronted/tree/master/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
                label: '本站博客',
                to: '/blog',
              },
              {
                label: '与你同行GitHub',
                href: 'https://github.com/yntx-it',
              },
              {
                label: '与你同行Gitee',
                href: 'https://gitee.com/yntx-org',
              },
            ],
          },
        ],
        // 底部版权声明
        copyright: `Copyright © ${new Date().getFullYear()} 与你同行技术, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
