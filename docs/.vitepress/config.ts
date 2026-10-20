import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/tcp-proxy-from-scratch/',
  title: 'TCP Proxy from Scratch',
  description: 'A step-by-step guide to building a TCP proxy with Java NIO.',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/introduction' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Sample Configuration', link: '/guide/sample-configuration' },
          { text: 'Test Scenarios', link: '/guide/test-scenarios' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/VladimirNilov28/tcp-proxy-from-scratch' }
    ]
  }
})
