import React, { useState, useEffect } from 'react'
import { formatMessage } from 'umi/locale'
import { Layout, message } from 'antd'
import Animate from 'rc-animate'
import { connect } from 'dva'
import router from 'umi/router'
import GlobalHeader from '@/components/GlobalHeader'
import TopNavHeader from '@/components/TopNavHeader'
import styles from './Header.less'

const { Header } = Layout

function HeaderView (props) {
  const [visible, setVisible] = useState(true)
  // TO Verify: set logic for oldScrollTop and ticking
  const [oldScrollTop, setOldScrollTop] = useState(document.body.scrollTop)
  const [ticking, setTicking] = useState(true)

  useEffect(() => {
    // componentdidmount
    document.addEventListener('scroll', handScroll, { passive: true })
    // Specify how to clean up after this effect:
    return function cleanup () {
      // componentdidunmount
      document.removeEventListener('scroll', handScroll)
    }
  })

  const { isMobile, handleMenuCollapse, setting } = props
  const { navTheme, layout, fixedHeader } = setting

  const getHeadWidth = () => {
    const { isMobile, collapsed, setting } = props
    const { fixedHeader, layout } = setting
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%'
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 256px)'
  }

  // TODO: cant see usage
  // const getDerivedStateFromProps = (props) => {
  //   if (!props.autoHideHeader && !visible) {
  //     return {
  //       visible: true
  //     }
  //   }
  //   return null
  // }

  const handleNoticeClear = type => {
    message.success(
      `${formatMessage({ id: 'component.noticeIcon.cleared' })} ${formatMessage({
        id: `component.globalHeader.${type}`
      })}`
    )
    const { dispatch } = props
    dispatch({
      type: 'global/clearNotices',
      payload: type
    })
  }

  const handleMenuClick = ({ key }) => {
    const { dispatch } = props
    if (key === 'userCenter') {
      router.push('/account/center')
      return
    }
    if (key === 'triggerError') {
      router.push('/exception/trigger')
      return
    }
    if (key === 'userinfo') {
      router.push('/account/settings/base')
      return
    }
    if (key === 'logout') {
      dispatch({
        type: 'login/logout'
      })
    }
  }

  const handleNoticeVisibleChange = visible => {
    if (visible) {
      const { dispatch } = props
      dispatch({
        type: 'global/fetchNotices'
      })
    }
  }

  const handScroll = () => {
    const { autoHideHeader } = props
    if (!autoHideHeader) {
      return
    }
    const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
    if (!ticking) {
      setTicking(true)
      requestAnimationFrame(() => {
        if (oldScrollTop > scrollTop) {
          setVisible(true)
        } else if (scrollTop > 300 && visible) {
          setVisible(false)
        } else if (scrollTop < 300 && !visible) {
          setVisible(true)
        }
        setOldScrollTop(scrollTop)
        setTicking(false)
      })
    }
  }

  const isTop = layout === 'topmenu'
  const width = getHeadWidth()
  const HeaderDom = visible ? (
    <Header style={{ padding: 0, width }} className={fixedHeader ? styles.fixedHeader : ''}>
      {isTop && !isMobile ? (
        <TopNavHeader
          theme={navTheme}
          mode='horizontal'
          onCollapse={handleMenuCollapse}
          onNoticeClear={handleNoticeClear}
          onMenuClick={handleMenuClick}
          onNoticeVisibleChange={handleNoticeVisibleChange}
          {...props}
        />
      ) : (
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          onNoticeClear={handleNoticeClear}
          onMenuClick={handleMenuClick}
          onNoticeVisibleChange={handleNoticeVisibleChange}
          {...props}
        />
      )}
    </Header>
  ) : null

  return (
    <Animate component='' transitionName='fade'>
      {HeaderDom}
    </Animate>
  )
}

export default connect(({ user, global, setting, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
  setting
}))(HeaderView)
