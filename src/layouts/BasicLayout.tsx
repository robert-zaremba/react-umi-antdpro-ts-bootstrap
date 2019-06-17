import SiderMenu from '@/components/SiderMenu'
import { MenuDataProps } from '@/components/SiderMenu/SiderMenu'
import Authorized from '@/utils/Authorized'
import { Layout } from 'antd'
import classNames from 'classnames'
import { connect } from 'dva'
import { isEqual } from 'lodash'
import memoizeOne from 'memoize-one'
import pathToRegexp from 'path-to-regexp'
import React, { useEffect } from 'react'
import { ContainerQuery } from 'react-container-query'
import DocumentTitle from 'react-document-title'
import Media from 'react-media'
import { formatMessage } from 'umi-plugin-locale'
import Footer from './Footer'
import Header from './Header'
import Context from './MenuContext'

const styles = require('./BasicLayout.less')
const logo = require('../assets/logo.svg')

const { Content } = Layout

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}


interface RouteProps {
  exact: boolean
  path: string
  redirect: string
  routes: Array<RouteProps>
}

interface BasicLayoutProps {
  navTheme: 'light' | 'dark'
  layout: string
  children: Object
  location: {
    pathname: string
  }
  isMobile: boolean
  menuData: Array<MenuDataProps>
  breadcrumbNameMap: Array<pathToRegexp.Key>
  route: {
    routes: RouteProps
    authority: string
  }
  fixedHeader: boolean
  dispatch: Function
  fixSiderbar: boolean
  collapsed: boolean
  logo: string
  theme: 'light' | 'dark'
}

function getRouterAuthority (pathname: string, routes: RouteProps) {
  let routeAuthority = ['noAuthority']
  const assignAuthority = (key: string, _routes: RouteProps) => {
    if(_routes){
      // @ts-ignore: circular iteration here. Added check ifEmpty on top
      for (let r of _routes){
        if (r.path === key) {
          routeAuthority = r.authority
        } else if (r.routes) {
          routeAuthority = assignAuthority(key, r.routes)
        }
      }
    }
    return routeAuthority
  }
  assignAuthority(pathname, routes)
  return routeAuthority
}

function _matchParamsPath (pathname: string, breadcrumbNameMap: Array<pathToRegexp.Key>) {
  for (let b in breadcrumbNameMap) {
    if (pathToRegexp(b).test(pathname)) {
      return breadcrumbNameMap[b]
    }
  }
  return undefined
}

const matchParamsPath = memoizeOne(_matchParamsPath, isEqual)

const getPageTitle = memoizeOne(
  function (pathname: string, breadcrumbNameMap: Array<pathToRegexp.Key>) {
    const currRouterData = matchParamsPath(pathname, breadcrumbNameMap)

    if (!currRouterData) {
      return 'Default title'
    }
    const pageName = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name as string
    })

    return `${pageName}`
})

interface LayoutStyleProps {
  fixSiderbar: boolean
  isMobile: boolean
  collapsed: boolean
  layout: string
}

function getLayoutStyle (layoutstyle: LayoutStyleProps) {
  if (layoutstyle.fixSiderbar && layoutstyle.layout !== 'topmenu' && !layoutstyle.isMobile) {
    return {
      paddingLeft: layoutstyle.collapsed ? '80px' : '256px'
    }
  }
  return null
}

function BasicLayout (props: BasicLayoutProps) {
  useEffect(() => {
    const { dispatch, route: { routes, authority } } = props
    dispatch({ type: 'user/fetchCurrent' })
    dispatch({ type: 'setting/getSetting' })
    dispatch({ type: 'menu/getMenuData', payload: { routes, authority } })
  }, [])

  function handleMenuCollapse (collapsed: boolean) {
    props.dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed
    })
  }

  const {
    navTheme,
    layout: PropsLayout,
    children,
    location: { pathname },
    isMobile,
    menuData,
    breadcrumbNameMap,
    route: { routes },
    fixedHeader
  } = props

  const isTop = PropsLayout === 'topmenu'
  const routerConfig = getRouterAuthority(pathname, routes)
  const contentStyle = !fixedHeader ? { paddingTop: 0 } : {}
  const layout = (
    <Layout>
      {isTop && !isMobile ? null : (
        <SiderMenu
          logo={logo}
          theme={navTheme}
          onCollapse={handleMenuCollapse}
          menuData={menuData}
          isMobile={isMobile}
          {...props}
        />
      )}
      <Layout
        style={{
          ...getLayoutStyle(props),
          minHeight: '100vh'
        }}
      >
        <Header
          menuData={menuData}
          handleMenuCollapse={handleMenuCollapse}
          logo={logo}
          isMobile={isMobile}
          {...props}
        />
        <Content className={styles.content} style={contentStyle}>
          <Authorized authority={routerConfig} noMatch={<p>Exception403</p>}>
            {children}
          </Authorized>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
  return (
    <React.Fragment>
      <DocumentTitle title={getPageTitle(pathname, breadcrumbNameMap)}>
        <ContainerQuery query={query}>
          {params => (
            <Context.Provider value={{ location, breadcrumbNameMap }}>
              <div className={classNames(params)}>{layout}</div>
            </Context.Provider>
          )}
        </ContainerQuery>
      </DocumentTitle>
    </React.Fragment>
  )
}

export default connect(({ global, setting, menu }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  ...setting
}))((props: BasicLayoutProps) => (
  <Media query='(max-width: 599px)'>
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
))
