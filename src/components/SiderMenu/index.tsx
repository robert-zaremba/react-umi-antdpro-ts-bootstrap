import React from 'react'
import { Drawer } from 'antd'
import SiderMenu from './SiderMenu'
import { getFlatMenuKeys } from './SiderMenuUtils'
import { MenuDataProps } from '../SiderMenu/SiderMenu'

interface SiderMenuWrapperProps {
  isMobile: boolean
  menuData: Array<MenuDataProps>
  collapsed: boolean
  onCollapse: Function
  logo: string
  theme: string
}

function SiderMenuWrapper (props: SiderMenuWrapperProps) {
  const { isMobile, menuData, collapsed, onCollapse } = props
  const flatMenuKeys = getFlatMenuKeys(menuData)
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement='left'
      onClose={() => onCollapse(true)}
      style={{
        padding: 0,
        height: '100vh'
      }}
    >
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={isMobile ? false : collapsed} />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  )
}

export default SiderMenuWrapper
