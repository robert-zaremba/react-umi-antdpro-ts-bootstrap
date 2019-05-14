import React, { useState } from 'react'
import Link from 'umi/link'
import RightContent from '../GlobalHeader/RightContent'
import BaseMenu from '../SiderMenu/BaseMenu'
import { getFlatMenuKeys } from '../SiderMenu/SiderMenuUtils'

const styles = require('./index.less')

function TopNavHeader (props: any) {
  const [maxWidth, setMaxWidth] = useState(undefined)
  const { theme, contentWidth, menuData, logo } = props
  const flatMenuKeys = getFlatMenuKeys(menuData)

  // getDerivedStateFromProps content
  setMaxWidth((props.contentWidth === 'Fixed' ? 1200 : window.innerWidth) - 280 - 165 - 40)
  let main

  return (
    <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
      <div ref={ref => {main = ref}} className={`${styles.main} ${contentWidth === 'Fixed' ? styles.wide : ''}`}>
        <div className={styles.left}>
          <div className={styles.logo} key='logo' id='logo'>
            <Link to='/'>
              <img src={logo} alt='logo' />
              <h1 className='cow'>APnt Design Pro</h1>
            </Link>
          </div>
          <div
            style={{
              maxWidth
            }}
          >
            <BaseMenu {...props} flatMenuKeys={flatMenuKeys} className={styles.menu} />
          </div>
        </div>
        <RightContent {...props} />
      </div>
    </div>
  )
}

export default TopNavHeader
