import { Dropdown } from 'antd'
import classNames from 'classnames'
import React from 'react'

const styles = require('./index.less')

interface HeaderDropdownProps {
  children: Object
  overlay: Object
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter'
          | 'bottomRight'
}

export default function HeaderDropdown (props: HeaderDropdownProps) {
  return (
    <Dropdown overlay={classNames(styles.container, props.overlay)} {...props} />
  )
}
