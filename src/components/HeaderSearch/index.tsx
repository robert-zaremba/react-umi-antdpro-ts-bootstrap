import { AutoComplete, Icon, Input } from 'antd'
import classNames from 'classnames'
import Bind from 'lodash/bind'
import Debounce from 'lodash/debounce'
import React, { createRef, useEffect, useState } from 'react'

const styles = require('./index.less')

declare type SelectValue = string | string[]
interface HeaderSearchProps {
  placeholder?: string
  dataSource?: string[]
  defaultOpen?: boolean
  open?: boolean
  onSearch?: (value: string) => void
  onChange?: (value: SelectValue) => void
  onVisibleChange?: (visible: boolean) => void
  onPressEnter?: (value: string) => void
  className?: string
}

export default function HeaderSearch (props: HeaderSearchProps) {
  const [searchMode, setSearchMode] = useState(props.defaultOpen)
  const [value, setValue] = useState('')
  // TO Verify: onVisibleChange not defined or passed as props
  const { className, placeholder, open, onChange, onPressEnter, ...restProps } = props
  // fix from: https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
  const textInput = createRef<Input>()

  useEffect(() => {
    Bind(() => {
      // these states arent set or used
      // Debounce(() => {
      //   leading: true
      //   trailing: false
      // }, 600)
    }, 100)
    return () => {
      // clearTimeout(100)
    }
  }, [searchMode])

  function onKeyDown (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      // onPressEnter(value) // Fix duplicate onPressEnter
    }
  }

  function onChangeInput (value: SelectValue) {
    setValue(value)
    if (onChange) {
      onChange(value)
    }
  }

  function enterSearchMode (event: MouseEvent) {
    // TO Verify: onVisibleChange not defined or passed as props
    // onVisibleChange(true)
    setSearchMode(true)
  }

  function leaveSearchMode () {
    setSearchMode(false)
    setValue('')
  }

  delete restProps.defaultOpen // for rc-select not affected
  const inputClass = classNames(styles.input, { [styles.show]: searchMode })

  // getDerivedStateFromProps
  if ('open' in props) {
    setSearchMode(open)
  }

  interface VisibilityProps {
    propertyName: string
  }

  function changeVisibility (visibility: VisibilityProps) {
    if (visibility.propertyName === 'width' && !searchMode) {
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
