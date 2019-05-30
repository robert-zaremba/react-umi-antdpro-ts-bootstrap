import { Icon } from 'antd'
import Debounce from 'lodash/debounce'
import React, { useEffect } from 'react'
import Link from 'umi/link'
import RightContent, { GlobalHeaderRightProps } from './RightContent'

const styles = require('./index.less')

function resizeHandler () {	
  const event = document.createEvent('HTMLEvents')	
  event.initEvent('resize', true, false)	
  window.dispatchEvent(event)	
}

export default function GlobalHeader (props: GlobalHeaderRightProps) {

  const { onCollapse, isMobile, collapsed, logo } = props
  function toggle () {
    onCollapse(!collapsed)
  }

  // old useEffect; unsure of how to incorporate cancel element
  // change made from this lint reference:
  // https://stackblitz.com/edit/react-use-effect-hook-github
  // useEffect(() => triggerResizeEvent.cancel)

  useEffect(() => {
    Debounce(() => {
      resizeHandler()
      }, 600)
  }, [collapsed])

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
