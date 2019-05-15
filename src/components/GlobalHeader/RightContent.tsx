import React from 'react'
import { FormattedMessage, formatMessage } from 'umi-plugin-locale'
import { Spin, Tag, Menu, Icon, Avatar, Tooltip } from 'antd'
import groupBy from 'lodash/groupBy'
import { NoticeIcon } from 'ant-design-pro'
import HeaderSearch from '../HeaderSearch'
import HeaderDropdown from '../HeaderDropdown'
import SelectLang from '../SelectLang'

const styles = require('./index.less')

interface  GetNoticeDataProps {
  avatar: string
  datetime: string
  id: string
  title: string
  type: string
  key: string
  extra: Object
  status: string
}

interface UnreadDataEventProps {
  description: string
  extra: Object
  id: string
  key: string
  status: string
  title: string
  type: string
}

interface UnreadDataMessageProps {
  avatar: string
  clickClose: Boolean
  datetime: string
  description: string
  id: string
  key: string
  title: string
  type: string
}

interface UnreadDataNotificationProps {
  avatar: string
  datetime: string
  id: string
  key: string
  title: string
  type: string
}
interface  GetUnreadDataProps {
  event: Array<UnreadDataEventProps>
  message: Array<UnreadDataMessageProps>
  notification: Array<UnreadDataNotificationProps>
}

function getNoticeData (notices) {
 if (notices.length === 0) {
   return {}
 }
 const newNotices = notices.map(notice => {
   // newNotice and notice carries the same value
   // if (newNotice.datetime) {
   //   newNotice.datetime = moment(notice.datetime).fromNow()
   // }
   if (notice.id) {
     notice.key = notice.id
   }
  //  TODO: fix color component props
   if (notice.extra && notice.status) {
    //  const color = {
    //    todo: '',
    //    processing: 'blue',
    //    urgent: 'red',
    //    doing: 'gold'
    //  }[notice.status]
     notice.extra = (
      //  <Tag color={color} style={{ marginRight: 0 }}>
      <Tag style={{ marginRight: 0 }}>
         {notice.extra}
       </Tag>
     )
   }
   return notice
 })
 return groupBy(newNotices, 'type')
}

function getUnreadData (noticeData: GetUnreadDataProps) {
 const unreadMsg = {}
 Object.entries(noticeData).forEach(([key, value]) => {
   if (!unreadMsg[key]) {
     unreadMsg[key] = 0
   }
   if (Array.isArray(value)) {
     unreadMsg[key] = value.filter(item => !item.read).length
   }
 })
 return unreadMsg
}

export default function GlobalHeaderRight (props) {
  const {
    currentUser,
    fetchingNotices,
    onNoticeVisibleChange,
    onMenuClick,
    onNoticeClear,
    theme,
    notices = [],
    dispatch
  } = props

  function changeReadState (clickedItem) {
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: clickedItem.id
    })
  }

  const menu = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      <Menu.Item key='userCenter'>
        <Icon type='user' />
        <FormattedMessage id='menu.account.center' defaultMessage='account center' />
      </Menu.Item>
      <Menu.Item key='userinfo'>
        <Icon type='setting' />
        <FormattedMessage id='menu.account.settings' defaultMessage='account settings' />
      </Menu.Item>
      <Menu.Item key='triggerError'>
        <Icon type='close-circle' />
        <FormattedMessage id='menu.account.trigger' defaultMessage='Trigger Error' />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key='logout'>
        <Icon type='logout' />
        <FormattedMessage id='menu.account.logout' defaultMessage='logout' />
      </Menu.Item>
    </Menu>
  )
  const noticeData = getNoticeData(notices)
  const unreadMsg = getUnreadData(noticeData)
  let className = styles.right
  if (theme === 'dark') {
    className = `${styles.right}  ${styles.dark}`
  }
  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder={formatMessage({ id: 'component.globalHeader.search' })}
        dataSource={[
          formatMessage({ id: 'component.globalHeader.search.example1' }),
          formatMessage({ id: 'component.globalHeader.search.example2' }),
          formatMessage({ id: 'component.globalHeader.search.example3' })
        ]}
        onSearch={value => {
          console.log('input', value) // eslint-disable-line
        }}
        onPressEnter={value => {
          console.log('enter', value) // eslint-disable-line
        }}
      />
      <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
        <a
          target='_blank'
          href='https://pro.ant.design/docs/getting-started'
          rel='noopener noreferrer'
          className={styles.action}
        >
          <Icon type='question-circle-o' />
        </a>
      </Tooltip>
      <NoticeIcon
        className={styles.action}
        count={currentUser.unreadCount}
        onItemClick={(item, tabProps) => {
          console.log(item, tabProps) // eslint-disable-line
          changeReadState(item)
        }}
        locale={{
          emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
          clear: formatMessage({ id: 'component.noticeIcon.clear' }),
          key: formatMessage({ id: 'component.noticeIcon.key' }),
          viewMore: formatMessage({ id: 'component.noticeIcon.viewMore' })
        }}
        onClear={onNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        loading={fetchingNotices}
        clearClose={true}
      >
        <NoticeIcon.Tab
          count={unreadMsg.notification}
          list={noticeData.notification}
          title={formatMessage({ id: 'component.globalHeader.notification' })}
          name='notification'
          emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
          emptyImage='https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg'
        />
        <NoticeIcon.Tab
          count={unreadMsg.message}
          list={noticeData.message}
          title={formatMessage({ id: 'component.globalHeader.message' })}
          name='message'
          emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
          emptyImage='https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg'
        />
        <NoticeIcon.Tab
          count={unreadMsg.event}
          list={noticeData.event}
          title={formatMessage({ id: 'component.globalHeader.event' })}
          name='event'
          emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
          emptyImage='https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg'
        />
      </NoticeIcon>
      {currentUser.name ? (
        <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size='small'
              className={styles.avatar}
              src={currentUser.avatar}
              alt='avatar'
            />
            <span className={styles.name}>{currentUser.name}</span>
          </span>
        </HeaderDropdown>
      ) : (
        <Spin size='small' style={{ marginLeft: 8, marginRight: 8 }} />
      )}
      <SelectLang className={styles.action} />
    </div>
  )
}