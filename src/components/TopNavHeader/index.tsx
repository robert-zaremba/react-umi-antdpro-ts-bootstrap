import RightContent, { GlobalHeaderRightProps } from '@/components/GlobalHeader/RightContent'
import BaseMenu from '@/components/SiderMenu/BaseMenu'
import { getFlatMenuKeys } from '@/components/SiderMenu/SiderMenuUtils'
import React, { createRef, useState } from 'react'
import Link from 'umi/link'

const styles = require('./index.less')

function TopNavHeader (props: GlobalHeaderRightProps) {
  const [maxWidth, setMaxWidth] = useState(0)
  const { theme, contentWidth, menuData, logo } = props
  const flatMenuKeys = getFlatMenuKeys(menuData)

  // getDerivedStateFromProps content
  let maxwidth = props.contentWidth === 'Fixed' ? 1200 : window.innerWidth
  setMaxWidth(maxwidth - (280 + 165 + 40))
  let contentWidthCls = contentWidth === 'Fixed' ? styles.wide : ''
  let main = createRef()

  return (
    <div className={`${styles.head} ${theme === 'light' ? styles.light : ''}`}>
      <div ref={main} className={`${styles.main} ${contentWidthCls}`}>
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
