import { AutoComplete, Icon, Input } from 'antd'
import classNames from 'classnames'
import Bind from 'lodash-decorators/bind'
import Debounce from 'lodash-decorators/debounce'
import React, { createRef, useEffect, useState } from 'react'

const styles = require('./index.less')

interface HeaderSearchProps {
  placeholder?: string
  dataSource?: string[]
  defaultOpen?: boolean
  open?: boolean
  onSearch?: (value: string) => void
  onChange?: (value: string) => void
  onVisibleChange?: (visible: boolean) => void
  onPressEnter?: (value: string) => void
  className?: string
}

export default function HeaderSearch (props: HeaderSearchProps) {
  const [searchMode, setSearchMode] = useState(props.defaultOpen)
  const [value, setValue] = useState('')
  // TO Verify: onVisibleChange not defined or passed as props
  const { className, placeholder, open, onChange, onPressEnter, ...restProps } = props
  const textInput = createRef()

  useEffect(() => {
    // this condition is never been hit. focus is not applicable to Object element
    // if (searchMode) {
    //   if (textInput.current) {
    //     textInput.current.focus()
    //   }
    // }
    return function cleanup () {
      return clearTimeout
    }
  }, [searchMode])

  function onKeyDown (e) {
    if (e.key === 'Enter') {
      setTimeout(() => {
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
    setSearchMode(open)
  }

  function changeVisibility ({ propertyName }) {
    if (propertyName === 'width' && !searchMode) {
      // TO Verify: onVisibleChange not defined or passed as props
      // onVisibleChange(searchMode)
    }
  }

  return (
    <span
      className={classNames(className, styles.headerSearch)}
      onClick={enterSearchMode}
      onTransitionEnd={changeVisibility}
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
