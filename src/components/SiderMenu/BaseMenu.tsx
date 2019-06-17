import { GlobalHeaderRightProps } from '@/components/GlobalHeader/RightContent'
import { isUrl, urlToList } from '@/utils/url'
import { Icon, Menu } from 'antd'
import classNames from 'classnames'
import React from 'react'
import Link from 'umi/link'
import { getMenuMatches } from './SiderMenuUtils'
import { MenuDataProps } from '@/components/SiderMenu/SiderMenu'

const styles = require('./index.less')

const { SubMenu } = Menu

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = (icon: string) => {
  if (typeof icon === 'string' && isUrl(icon)) {
    return <img src={icon} alt='icon' className={styles.icon} />
  }
  if (typeof icon === 'string') {
    return <Icon type={icon} />
  }
  return icon
}

export default function BaseMenu (props: GlobalHeaderRightProps) {
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
  function getNavMenuItems (menusData: Array<MenuDataProps>, parent?: string) {
    if (!menusData) {
      return []
    }
    let returnData = []
    for (let item in menusData) {
      if(menusData[item].name && menusData[item].hideInMenu){
        getSubMenuOrItem(item, parent) && returnData.push(getSubMenuOrItem(item, parent))
      }
    }
    return returnData
  }

  // Get the currently selected menu
  function getSelectedMenuKeys (pathname: string) {
    return urlToList(pathname).map(itemPath => getMenuMatches(flatMenuKeys, itemPath).pop())
  }

  /**
   * get SubMenu or Item
   */
  function getSubMenuOrItem (item, parent?) {
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
          {/* To Verify: why parent isnt supplied here.
              funct def: getNavMenuItems(menusData, parent)
            */}
        {getNavMenuItems(item.children)}
        </SubMenu>
      )
    }
    return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>
  }

  /**
   * returns <a> element for http link, <Link> otherwise
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

  function conversionPath (path: string) {
    if (path && path.indexOf('http') === 0) {
      return path
    }
    return `/${path || ''}`.replace(/\/+/g, '/')
  }

  // if pathname can't match, use the nearest parent's key
  let selectedKeys = getSelectedMenuKeys(pathname)
  if (!selectedKeys.length && openKeys && openKeys.length) {
    selectedKeys = [openKeys[openKeys.length - 1]]
  }
  let propsTmp = {}
  if (openKeys && !collapsed) {
    propsTmp = { openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys }
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
      {...propsTmp}
    >
      {getNavMenuItems(menuData)}
    </Menu>
  )
}
