export default defineAppConfig({
  docus: {
    title: 'Remark MDC',
    description: 'Remark plugin to parse MarkDown Components syntax.',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',

    socials: {
      twitter: 'nuxt_js',
      github: 'nuxtlabs/remark-mdc',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com'
      }
    },

    github: {
      dir: 'docs/content',
      branch: 'main',
      repo: 'remark-mdc',
      owner: 'nuxtlabs',
      edit: true
    },

    aside: {
      level: 0,
      collapsed: false,
      exclude: []
    },

    main: {
      padded: true,
      fluid: false
    },

    header: {
      logo: false,
      showLinkIcon: true,
      exclude: [],
      fluid: false,
      title: 'Remark MDC'
    },

    titleTemplate: '%s · Remark MDC'
  }
})