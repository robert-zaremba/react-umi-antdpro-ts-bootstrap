import React, { useEffect } from 'react'
import { Icon } from 'antd'
import Link from 'umi/link'
import Debounce from 'lodash-decorators/debounce'
import RightContent from './RightContent'

const styles = require('./index.less')

interface GlobalHeaderProps {
  onCollapse: Function
  isMobile: boolean
  collapsed: boolean
  logo: string
}

export default function GlobalHeader (props: GlobalHeaderProps) {

  const { onCollapse, isMobile, collapsed, logo } = props
  Debounce(600)
  function triggerResizeEvent () {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  }

  function toggle () {
    onCollapse(!collapsed)
    triggerResizeEvent()
  }

  useEffect(() => triggerResizeEvent)

  return (
    <div className={styles.header}>
      {isMobile && (
        <Link to='/' className={styles.logo} key='logo'>
          <img src={logo} alt='logo' width='32' />
        </Link>
      )}
      <span className={styles.trigger} onClick={toggle}>
        <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <RightContent {...props} />
    </div>
  )
}
