import React, { useState, Suspense } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'
import Link from 'umi/link'
import PageLoading from '../PageLoading'
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils'
import { MenuDataProps } from '../SiderMenu/SiderMenu'

const styles = require('./index.less')

function isMainMenu (menu, key) {
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
}

interface SiderMenuProps {
  menuData: Array<MenuDataProps>
  logo: string
  collapsed: boolean
  onCollapse: Function
  fixSiderbar: boolean
  theme: string
  location: {
    pathname: string
  }
}

function SiderMenu (props: SiderMenuProps) {
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
