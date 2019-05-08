import React, { useEffect } from 'react'
import { Icon } from 'antd'
import Link from 'umi/link'
import Debounce from 'lodash-decorators/debounce'
import styles from './index.less'
import RightContent from './RightContent'

export default function GlobalHeader2 (props) {
  // eslint-disable
  @Debounce(600)
  function triggerResizeEvent () {
    const event = document.createEvent('HTMLEvents')
    event.initEvent('resize', true, false)
    window.dispatchEvent(event)
  }

  function toggle () {
    props.onCollapse(!props.collapsed)
    triggerResizeEvent()
  }

  useEffect(() => triggerResizeEvent.cancel)

  return (
    <div className={styles.header}>
      {props.isMobile && (
        <Link to='/' className={styles.logo} key='logo'>
          <img src={props.logo} alt='logo' width='32' />
        </Link>
      )}
      <span className={styles.trigger} onClick={toggle}>
        <Icon type={props.collapsed ? 'menu-unfold' : 'menu-fold'} />
      </span>
      <RightContent {...props} />
    </div>
  )
}
