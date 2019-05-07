import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { Menu, Icon } from 'antd'
import Link from 'umi/link'
import { getMenuMatches } from './SiderMenuUtils'
import { isUrl, urlToList } from '@/utils/url'
import styles from './index.less'

const { SubMenu } = Menu

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt='icon' className={styles.icon} />
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />
  }
  return icon
}

export default function BaseMenu (props) {
  const {
    openKeys,
    theme,
    mode,
    location: { pathname },
    className,
    collapsed,
    handleOpenChange,
    style,
    menuData,
    flatMenuKeys,
    isMobile,
    onCollapse
  } = props

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  function getNavMenuItems (menusData, parent) {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => getSubMenuOrItem(item, parent))
      .filter(item => item)
  }

  // Get the currently selected menu
  function getSelectedMenuKeys (pathname) {
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
  }

  /**
   * get SubMenu or Item
   */
  function getSubMenuOrItem (item) {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
        {/* To Verify: why parent isnt supplied here. funct def: getNavMenuItems(menusData, parent) */}
        {getNavMenuItems(item.children)}
        </SubMenu>
      )
    }
    return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>
  }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  function getMenuItemPath (item) {
    const { name } = item
    const itemPath = conversionPath(item.path)
    const icon = getIcon(item.icon)
    const { target } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === location.pathname}
        onClick={
          isMobile
            ? () => {
              onCollapse(true)
            }
            : undefined
        }
      >
        {icon}
        <span>{name}</span>
      </Link>
    )
  }

  function conversionPath (path) {
    if (path && path.indexOf('http') === 0) {
      return path
    }
    return `/${path || ''}`.replace(/\/+/g, '/')
  }

  // if pathname can't match, use the nearest parent's key
  let selectedKeys = getSelectedMenuKeys(pathname)
  if (!selectedKeys.length && openKeys) {
    selectedKeys = [openKeys[openKeys.length - 1]]
  }
  let props_tmp = {}
  if (openKeys && !collapsed) {
    props_tmp = {
      openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys
    }
  }
  const cls = classNames(className, {
    'top-nav-menu': mode === 'horizontal'
  })

  return (
    <Menu
      key='Menu'
      mode={mode}
      theme={theme}
      onOpenChange={handleOpenChange}
      selectedKeys={selectedKeys}
      style={style}
      className={cls}
      {...props_tmp}
    >
      {getNavMenuItems(menuData)}
    </Menu>
  )
}
