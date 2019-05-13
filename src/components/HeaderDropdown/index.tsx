import React from 'react'
import { Dropdown } from 'antd'
import classNames from 'classnames'

const styles = require('./index.less')

export default function HeaderDropdown (props) {
  const { overlayClassName } = props
  return (
    <Dropdown overlayClassName={classNames(styles.container, overlayClassName)} {...props} />
  )
}
