import React, { useState, Suspense } from 'react'
import { Layout } from 'antd'
import classNames from 'classnames'
import Link from 'umi/link'
import styles from './index.less'
import PageLoading from '../PageLoading'
import { getDefaultCollapsedSubMenus } from './SiderMenuUtils'

const BaseMenu = React.lazy(() => import('./BaseMenu'))
const { Sider } = Layout

function SiderMenu (props: any) {
  const [openKeys, setOpenKeys] = useState(getDefaultCollapsedSubMenus(props))
  const [pathname, setPathName] = useState(props.location.pathname)
  const { menuData, logo, collapsed, onCollapse, fixSiderbar, theme } = props
  const defaultProps = collapsed ? {} : { openKeys }
  const siderClassName = classNames(styles.sider, {
    [styles.fixSiderbar]: fixSiderbar,
    [styles.light]: theme === 'light'
  })

  function isMainMenu (key) {
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key
      }
      return false
    })
  }

  function handleOpenChange (openKeys) {
    const moreThanOne = openKeys.filter(openKey => isMainMenu(openKey)).length > 1
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
