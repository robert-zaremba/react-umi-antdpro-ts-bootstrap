import { Drawer } from 'antd'
import React from 'react'
import { SiderMenuProps } from '../SiderMenu/SiderMenu'
import SiderMenu from './SiderMenu'
import { getFlatMenuKeys } from './SiderMenuUtils'

function SiderMenuWrapper (props: SiderMenuProps) {
  const { isMobile, menuData, collapsed, onCollapse } = props
  const flatMenuKeys = getFlatMenuKeys(menuData)
  return isMobile ? (
    <Drawer
      visible={!collapsed}
      placement='left'
      onClose={() => onCollapse(true, 'responsive')}  // tslint:disable-line
      style={{
        padding: 0,
        height: '100vh'
      }}
    >
      <SiderMenu {...props} flatMenuKeys={flatMenuKeys} collapsed={false} />
    </Drawer>
  ) : (
    <SiderMenu {...props} flatMenuKeys={flatMenuKeys} />
  )
}

export default SiderMenuWrapper
