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
        title: '与你同行-黑铁教程',
        logo: {
          alt: '黑铁教程 Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'java/java',
            position: 'left',
            label: 'Java',
          },
          // {
          //   type: 'doc',
          //   docId: 'interview/interview-algorithm',
          //   position: 'left',
          //   label: '面试',
          // },
          { to: 'docs/category/常见面试题', label: '面试宝典', position: 'left' },
          { to: '/blog', label: '博客', position: 'right' },
          {
            href: 'https://github.com/yntx-it',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      // 底部链接
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {
                label: 'Java',
                to: '/docs/java',
              },
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/yntx-it',
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
        copyright: `Copyright © ${new Date().getFullYear()} 与你同行技术, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

module.exports = config
