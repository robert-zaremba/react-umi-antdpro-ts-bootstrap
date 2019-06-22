import { Layout } from 'antd'
import classNames from 'classnames'
import React, { Suspense, useState } from 'react'
import Link from 'umi/link'
import { GlobalHeaderRightProps } from '../GlobalHeader/RightContent'
import PageLoading from '../PageLoading'
import { MenuDataProps } from '../SiderMenu/SiderMenu'
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils'

const styles = require('./index.less')

function isMainMenu (menu, key: string) {
  if (!key) return false
  for (let item of menu) {
    if (item.key === key || item.path === key) return true
  }
  return false
}

const BaseMenu = React.lazy(() => import('./BaseMenu'))
const { Sider } = Layout

export interface MenuDataProps {
  authority: string
  component: Function
  exact: boolean
  icon: string
  locale: string
  name: string
  path: string
  children: Array<MenuDataProps>
  hideInMenu: boolean
}

export declare type CollapseType = 'clickTrigger' | 'responsive'

export interface SiderMenuProps {
  menuData: Array<MenuDataProps>
  logo: string
  collapsed: boolean
  onCollapse: (collapsed: boolean, type: CollapseType) => void
  theme: 'light' | 'dark'
  location: {
    pathname: string
  }
  flatMenuKeys: Array<string>
  isMobile: boolean
}

function SiderMenu (props: GlobalHeaderRightProps) {
  const [openKeys, setOpenKeys] = useState(getDefaultCollapsedSubMenus(props))
  const [pathname, setPathName] = useState(props.location.pathname)
  const { menuData, logo, collapsed, onCollapse, fixSiderbar, theme } = props
  const defaultProps = collapsed ? {} : { openKeys }
  const siderClassName = classNames(styles.sider, {
    [styles.fixSiderbar]: fixSiderbar,
    [styles.light]: theme === 'light'
  })

  function handleOpenChange (openKeys) {
    const moreThanOne = openKeys.filter(openKey => isMainMenu(menuData, openKey)).length > 1
    setOpenKeys(moreThanOne ? [openKeys.pop()] : [...openKeys])
  }

  // getDerivedStateFromProps
  if (props.location.pathname !== pathname) {
      setOpenKeys(getDefaultCollapsedSubMenus(props))
      setPathName(props.location.pathname)
    }

  return (
    <Sider
      trigger={null}
      collapsible={true}
      collapsed={collapsed}
      breakpoint='lg'
      onCollapse={onCollapse}
      width={256}
      theme={theme}
      className={siderClassName}
    >
      <div className={styles.logo} id='logo'>
        <Link to='/'>
          <img src={logo} alt='logo' />
          <h1>Ant Design Pro</h1>
        </Link>
      </div>
      <Suspense fallback={<PageLoading />}>
        <BaseMenu
          {...props}
          mode='inline'
          handleOpenChange={handleOpenChange}
          onOpenChange={handleOpenChange}
          style={{ padding: '16px 0', width: '100%' }}
          {...defaultProps}
        />
      </Suspense>
    </Sider>
  )
}

export default SiderMenu
