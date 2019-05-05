// ref: https://umijs.org/config/
import { IConfig } from 'umi-types'
import { primaryColor } from '../src/defaultSettings';

const config: IConfig {
  plugins: [
    [
      'umi-plugin-react',
      // https://umijs.org/plugin/umi-plugin-react.html#title
      {
        antd: true,
        dva: {
          hmr: true,  // hot module reload
        },
        locale: {
          enable: true, // default false
          default: 'en-US',
          baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
        },
        dynamicImport: {
          loadingComponent: './components/PageLoading/index',
        },
      },
    ],
    [
      'umi-plugin-pro-block',
      {
        moveMock: false,
        moveService: false,
        modifyRequest: true,
        autoAddMenu: true,
      },
    ],
  ],
  // https://umijs.org/config/#targets, the config is merged with the default one.
  targets: {},

  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [{ path: '/user', component: './Welcome' }],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        { path: '/', redirect: '/welcome' },
        // dashboard
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: 'https://github.com/umijs/umi-blocks/tree/master/ant-design-pro',
          name: 'more-blocks',
          icon: 'block',
        },
      ],
    },
  ],
  disableRedirectHoist: true,

  /**
   * webpack config
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  externals: {
    '@antv/data-set': 'DataSet',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
}

export default config
