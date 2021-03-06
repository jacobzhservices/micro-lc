const theming = {
  header: {
    pageTitle: 'My Company',
    favicon: 'https://www.mia-platform.eu/static/img/favicon/apple-icon-60x60.png'
  },
  logo: {
    alt: 'My Company',
    url_light_image: 'https://raw.githubusercontent.com/lauragift21/giftegwuenu.dev/master/src/assets/img/logo.png',
    url_dark_image: 'https://raw.githubusercontent.com/lauragift21/giftegwuenu.dev/master/src/assets/img/logo-light.png',
    navigation_url: 'https://www.google.com'
  },
  variables: {
    primaryColor: 'red'
  },
  menuLocation: 'fixedSideBar'
}

const plugins = [
  {
    id: 'plugin-test-2',
    label: 'Href same window',
    icon: 'far fa-window-maximize',
    order: 2,
    integrationMode: 'href',
    externalLink: {
      url: 'https://google.it',
      sameWindow: true
    }
  },
  {
    id: 'plugin-test-1',
    label: 'Href different window',
    icon: 'far fa-window-restore',
    order: 1,
    integrationMode: 'href',
    externalLink: {
      url: 'https://google.it',
      sameWindow: false
    }
  },
  {
    id: 'plugin-test-3',
    label: 'IFrame',
    icon: 'fab fa-google',
    order: 4,
    integrationMode: 'iframe',
    pluginRoute: '/iframe',
    pluginUrl: 'https://www.google.com/webhp?igu=1'
  },
  {
    id: 'qiankun-test',
    label: 'Qiankun plugin 1',
    icon: 'fab fa-react',
    order: 3,
    integrationMode: 'qiankun',
    pluginRoute: '/qiankun',
    pluginUrl: '//localhost:8764'
  },
  {
    id: 'qiankun-test-2',
    label: 'Qiankun plugin 2',
    icon: 'fab fa-react',
    order: 3,
    integrationMode: 'qiankun',
    pluginRoute: '/qiankun2',
    pluginUrl: '//localhost:8764'
  },
  {
    id: 'qiankun-as-iframe',
    label: 'Qiankun as iframe',
    icon: 'fab fa-reacteurope',
    order: 5,
    integrationMode: 'iframe',
    pluginRoute: '/qiankunIframe',
    pluginUrl: '//localhost:8764'
  },
  {
    id: 'menu-google-container',
    label: 'Container',
    icon: 'fas fa-box-open',
    order: 6,
    content: [{
      id: 'plugin-test-content-google-1',
      label: 'IFrame 1',
      icon: 'fab fa-google',
      order: 4,
      integrationMode: 'iframe',
      pluginRoute: '/frame1',
      pluginUrl: 'https://www.google.com/webhp?igu=1',
      category: 'A'
    }, {
      id: 'plugin-test-content-google-2',
      label: 'IFrame 2',
      icon: 'fab fa-google',
      order: 4,
      integrationMode: 'iframe',
      pluginRoute: '/frame2',
      pluginUrl: 'https://www.google.com/webhp?igu=1',
    }, {
      id: 'plugin-test-content-google-3',
      label: 'IFrame 3',
      icon: 'fab fa-google',
      order: 4,
      integrationMode: 'iframe',
      pluginRoute: '/frame3',
      pluginUrl: 'https://www.google.com/webhp?igu=1',
      category: 'B'
    }, {
      id: 'plugin-test-content-google-4',
      label: 'IFrame 4',
      icon: 'fab fa-google',
      order: 4,
      integrationMode: 'iframe',
      pluginRoute: '/frame4',
      pluginUrl: 'https://www.google.com/webhp?igu=1'
    }]
  }
]

const internalPlugins = [{
  id: 'plugin-internal-test-4',
  order: 5,
  integrationMode: 'iframe',
  pluginRoute: '/internalPlugin1',
  pluginUrl: 'https://www.google.com/webhp?igu=1'
}]

const analytics = {
  privacyLink: 'https://www.mia-platform.eu/img/Privacy_Policy_Website_EN.pdf',
  disclaimer: 'Questo sito utilizza cookie proprietari e di terze parti per assicurarti la migliore esperienza di navigazione. Per ulteriori informazioni, leggi la ',
  gtmId: 'GTM-000000'
}

const helpMenu = {
  helpLink: 'https://docs.mia-platform.eu/docs/business_suite/microlc/overview'
}

module.exports = {theming, plugins, analytics, helpMenu, internalPlugins}
