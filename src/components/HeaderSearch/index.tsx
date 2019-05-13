import React, { useState, useEffect, createRef } from 'react'
import PropTypes from 'prop-types'
import { Input, Icon, AutoComplete } from 'antd'
import classNames from 'classnames'
import Debounce from 'lodash-decorators/debounce'
import Bind from 'lodash-decorators/bind'

const styles = require('./index.less')

// TODO: define on next task
// static propTypes = {
//   className: PropTypes.string,
//   placeholder: PropTypes.string,
//   onSearch: PropTypes.func,
//   onPressEnter: PropTypes.func,
//   defaultActiveFirstOption: PropTypes.bool,
//   dataSource: PropTypes.array,
//   defaultOpen: PropTypes.bool,
//   onVisibleChange: PropTypes.func
// }

// static defaultProps = {
//   defaultActiveFirstOption: false,
//   onPressEnter: () => {},
//   onSearch: () => {},
//   className: '',
//   placeholder: '',
//   dataSource: [],
//   defaultOpen: false,
//   onVisibleChange: () => {}
// }

export default function HeaderSearch (props) {
  const [searchMode, setSearchMode] = useState(props.defaultOpen)
  const [value, setValue] = useState('')
  // TO Verify: onVisibleChange not defined or passed as props
  const { className, placeholder, open, onChange, onPressEnter, ...restProps } = props
  let textInput = React.createRef()

  let timeout

  useEffect(() => {
    if (searchMode) {
      if (textInput.current) {
        textInput.current.focus()
      }
    }
    return function cleanup () {
      clearTimeout(timeout)
    }
  }, [searchMode])

  function onKeyDown (e) {
    if (e.key === 'Enter') {
      timeout = setTimeout(() => {
        onPressEnter(value) // Fix duplicate onPressEnter
      }, 0)
    }
  }

  function onChangeInput (value) {
    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  function enterSearchMode (event) {
    // TO Verify: onVisibleChange not defined or passed as props
    // onVisibleChange(true)
    setSearchMode(true)
  }

  function leaveSearchMode () {
    setSearchMode(false)
    setValue('')
  }

  // NOTE: 不能小于500，如果长按某键，第一次触发auto repeat的间隔是500ms，小于500会导致触发2次
  @Bind()
  @Debounce(500, {
    leading: true,
    trailing: false
  })

  function debouncePressEnter () {
    onPressEnter(value)
  }

  delete restProps.defaultOpen // for rc-select not affected
  const inputClass = classNames(styles.input, { [styles.show]: searchMode })

  // getDerivedStateFromProps
  if ('open' in props) {
    setSearchMode(props.open)
  }

  return (
    <span
      className={classNames(className, styles.headerSearch)}
      onClick={enterSearchMode}
      onTransitionEnd={({ propertyName }) => {
        if (propertyName === 'width' && !searchMode) {
          // TO Verify: onVisibleChange not defined or passed as props
          // onVisibleChange(searchMode)
        }
      }}
    >
      <Icon type='search' key='Icon' />
      <AutoComplete
        key='AutoComplete'
        {...restProps}
        className={inputClass}
        value={value}
        onChange={onChangeInput}
      >
        <Input
          ref={textInput}
          aria-label={placeholder}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
          onBlur={leaveSearchMode}
        />
      </AutoComplete>
    </span>
  )
}
