import { Icon, Menu } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { formatMessage, getLocale, setLocale } from 'umi-plugin-locale'
import HeaderDropdown from '../HeaderDropdown'

const styles = require('./index.less')

function changeLang ({ key }) {
  setLocale(key)
}

const selectedLang = getLocale()

const langMenu = (
  <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
    <Menu.Item key='zh-CN'>
      <span role='img' aria-label='简体中文'>
        🇨🇳
      </span>{' '}
      简体中文
    </Menu.Item>
    <Menu.Item key='zh-TW'>
      <span role='img' aria-label='繁体中文'>
        🇭🇰
      </span>{' '}
      繁体中文
    </Menu.Item>
    <Menu.Item key='en-US'>
      <span role='img' aria-label='English'>
        🇬🇧
      </span>{' '}
      English
    </Menu.Item>
    <Menu.Item key='pt-BR'>
      <span role='img' aria-label='Português'>
        🇵🇹
      </span>{' '}
      Português
    </Menu.Item>
  </Menu>
)

export default function SelectLang (props) {
  return (
    <HeaderDropdown overlay={langMenu} placement='bottomRight'>
      <span className={classNames(styles.dropDown, props.className)}>
        <Icon type='global' title={formatMessage({ id: 'navBar.lang' })} />
      </span>
    </HeaderDropdown>
  )
}
