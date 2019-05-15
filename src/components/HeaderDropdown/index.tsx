import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'

const styles = require('./index.less')

interface HeaderDropdownProps {
  children: Object
  overlayClassName: Object
  placement: string
}

export default function HeaderDropdown (props: HeaderDropdownProps) {
  const { overlayClassName } = props
  return (
    <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
  )
}
