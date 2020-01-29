import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputMask from 'react-input-mask'
import InputRange from 'react-input-range'
import { excludeProps, formatPrice } from '../helpers'

export class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.noramlizeValue(props.value) || this.noramlizeValue(props.defaultValue)
    }

    if (props.defaultValue !== undefined) {
      this.state.value = this.noramlizeValue(props.defaultValue)
    }
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props

    if (value !== prevProps.value && this.noramlizeValue(value) !== this.state.value) {
      this.setState({ value: this.noramlizeValue(value) })
    }
  }

  noramlizeValue (value) {
    const { type, format } = this.props
    value = ['string', 'number'].indexOf(typeof value) >= 0 ? String(value) : ''

    if (
      type === 'tel' ||
      (type === 'number' && format !== 'price')
    ) {
      value = value.replace(/\D/g, '')
    } else if (['number', 'range'].indexOf(type) >= 0) {
      value = value.replace(/[^\d.]/g, '')
    }

    return value
  }

  escapeString (str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  getMenu () {
    const { type, menu, filterMenu } = this.props
    const { value } = this.state
    let _menu = []

    if (type !== 'select' && !value) {
      return _menu
    } if (menu instanceof Array) {
      _menu = menu
    } else if (menu instanceof Object) {
      _menu = Object.keys(menu || {}).map((key) => {
        return {
          value: key,
          primary: menu[key]
        }
      })
    }

    _menu.map((item) => {
      if (item.primary === undefined) {
        item.primary = item.value
      }

      return item
    }, [])

    return filterMenu ? this.filterMenu(_menu, value) : _menu
  }

  findString (children, value) {
    const arr = []
    for (let key in children) {
      if (typeof children[key] === 'string') {
        return !value || children[key].match(new RegExp(this.escapeString(value), 'i'))
      } else if (children[key].props.children) {
        arr.push(children[key].props.children)
      }
    }

    if (arr.length) {
      return this.findString(arr, value)
    }
  }

  filterMenu (menu, value) {
    return menu.filter((item) => {
      if (value && typeof item.primary !== 'string') {
        return this.findString(item.primary.props.children, value)
      }

      return !value || item.primary.match(new RegExp(this.escapeString(value), 'i'))
    })
  }

  getMenuSeletedItemIndex () {
    const { value, menuSeletedItemIndex = -1 } = this.state

    return this.getMenu().reduce((accumulator, item, index) => {
      if (String(item.value) === String(value)) {
        accumulator = index
      }

      return accumulator
    }, menuSeletedItemIndex)
  }

  scrollMenuToSelected (exact) {
    const { menuSeletedItemIndex } = this.state
    const menuEl = findDOMNode(this.refs.menu)

    if (!menuEl) {
      return
    }

    const selectedItemEl = menuEl.childNodes[menuSeletedItemIndex]

    if (menuSeletedItemIndex >= 0 && selectedItemEl) {
      if (exact) {
        menuEl.scrollTop = selectedItemEl.offsetTop
      } else if (selectedItemEl.offsetTop < menuEl.scrollTop) {
        menuEl.scrollTop = selectedItemEl.offsetTop
      } else if (selectedItemEl.offsetTop + selectedItemEl.offsetHeight > menuEl.offsetHeight + menuEl.scrollTop) {
        menuEl.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - menuEl.offsetHeight
      }
    } else {
      menuEl.scrollTop = 0
    }
  }

  setDropdownPosition () {
    const { type } = this.props
    const dropdown = this.refs.dropdown

    if (!dropdown) {
      return
    }

    const dropdownBottom = dropdown.getBoundingClientRect().bottom

    if (type === 'select') {
      if (dropdownBottom > window.innerHeight) {
        dropdown.style.top = -(dropdownBottom - window.innerHeight) + 'px'
      } else {
        dropdown.style.top = '0px'
      }
    }
  }

  handleFocus (event) {
    const { readOnly, onFocus } = this.props
    const { menuSeletedItemIndex } = this.state

    if (readOnly) {
      return
    }

    const state = {
      focused: true,
      dropdownVisible: true
    }

    if (menuSeletedItemIndex === undefined) {
      state.menuSeletedItemIndex = this.getMenuSeletedItemIndex()
    }

    this.setState(state, () => {
      this.getMenu().length && this.scrollMenuToSelected()
    })

    onFocus && onFocus(event)
  }

  handleBlur (event) {
    const { readOnly, onBlur } = this.props

    if (readOnly) {
      return
    }

    if (this.mouseDown) {
      this.mouseDown = false
      this.inputEl.focus()
      return false
    }

    this.setState({
      focused: false,
      dropdownVisible: false
    })

    onBlur && onBlur(event)
  }

  handleChange (event) {
    const { readOnly, onChange } = this.props
    const value = this.noramlizeValue(event.target.value)

    if (readOnly) {
      return
    }

    const state = { value }

    if (event.type === 'change') {
      state.menuSeletedItemIndex = -1
      state.dropdownVisible = true
    } else {
      state.dropdownVisible = false
    }

    this.setState(state)
    onChange && onChange(event)
  }

  handleRangeChange (value) {
    const event = {
      type: 'change',
      target: this.inputEl
    }

    event.target.value = value

    this.handleChange(event)
  }

  handleKeyDown (event) {
    const { readOnly } = this.props
    const { menuSeletedItemIndex, dropdownVisible } = this.state
    const menu = this.getMenu()
    const state = {}

    if (!menu.length || readOnly) {
      return
    } else if ([38, 40].indexOf(event.keyCode) >= 0 && !dropdownVisible) {
      state.dropdownVisible = true
    } else if (event.keyCode === 38) {
      state.menuSeletedItemIndex = menuSeletedItemIndex > 0 ? menuSeletedItemIndex - 1 : menu.length - 1
    } else if (event.keyCode === 40) {
      state.menuSeletedItemIndex = menuSeletedItemIndex < menu.length - 1 ? menuSeletedItemIndex + 1 : 0
    } else if (event.keyCode === 13) {
      event.preventDefault()
      const selectedMenuItem = menu[menuSeletedItemIndex]
      selectedMenuItem && this.handleMenuItemClick(selectedMenuItem, menuSeletedItemIndex, event)
    }

    this.setState(state, this.scrollMenuToSelected)
  }

  handleMenuItemClick (item, index, event) {
    if (event.button) {
      return
    }
    event.target = this.inputEl
    event.target.value = item.value
    event.target.index = index

    this.handleChange(event)
  }

  renderElement (props) {
    const { format, readOnly } = this.props
    const menu = this.getMenu()

    if (menu.length) {
      props.autoComplete = 'off'
    }

    if (format === 'price') {
      props.value = formatPrice(props.value)
    }

    if (props.type === 'plain') {
      if (menu.length) {
        const selectedItem = menu.filter((item) => String(item.value) === String(props.value))[0]
        props.value = selectedItem.primary
      }

      return (
        <div className={props.className}>
          {props.value}
        </div>
      )
    }

    props.beforeMaskedValueChange = (newState, oldState, userInput) => {
      const state = {
        ...newState
      }

      if (readOnly && !oldState.value) {
        state.value = oldState.value
      }

      return state
    }

    return (
      <InputMask
        {...props}
        inputRef={(node) => { this.inputEl = node }}
      />
    )
  }

  renderDropdown (children) {
    const { dropdownVisible } = this.state
    const { position } = this.props

    return (
      <div
        ref='dropdown'
        className={classnames({
          'Input__dropdown': true,
          '--visible': dropdownVisible,
          '--right': position === 'right'
        })}
      >
        {children}
      </div>
    )
  }

  renderMenu () {
    const { dropdownVisible, menuSeletedItemIndex } = this.state
    const menu = this.getMenu()

    return this.renderDropdown(
      <div className='Input__menu' ref='menu'>
        {menu.map((item, index) =>
          <div
            className={classnames({
              'Input__menu-item': true,
              '--selected': index === menuSeletedItemIndex
            })}
            key={index}
            data-value={item.value}
            onMouseMove={() => dropdownVisible && this.setState({ menuSeletedItemIndex: index })}
            onClick={this.handleMenuItemClick.bind(this, item, index)}
          >
            <div className='Input__menu-item-primary'>{item.primary}</div>
            {!!item.secondary &&
              <div className='Input__menu-item-secondary'>{item.secondary}</div>
            }
          </div>
        )}
      </div>
    )
  }

  renderRange () {
    const { min = 0, max = 0, step, readOnly, disabled, rangeProps } = this.props
    let value = Number(this.state.value)
    value = value < min || isNaN(value) ? min : value
    value = value > max ? max : value

    return (
      <div onMouseDown={((event) => event.stopPropagation())}>
        <InputRange
          minValue={min}
          maxValue={max}
          step={step}
          value={value}
          disabled={readOnly || disabled}
          {...rangeProps}
          onChange={::this.handleRangeChange}
        />
      </div>
    )
  }

  render () {
    const {
      className,
      componentProps,
      size,
      color,
      variant,
      rounded,
      invalid,
      disabled,
      type,
      label,
      mask,
      maskChar,
      adornment,
      adornmentPosition
    } = this.props
    const { value, focused } = this.state
    const inputProps = {
      ...excludeProps(this),
      className: 'Input__element',
      disabled,
      type,
      value,
      mask,
      maskChar,
      onClick: ::this.handleFocus,
      onFocus: ::this.handleFocus,
      onBlur: ::this.handleBlur,
      onChange: ::this.handleChange,
      onKeyDown: ::this.handleKeyDown
    }

    if (['number', 'range'].indexOf(type) >= 0) {
      inputProps.type = 'text'
      inputProps.inputMode = 'numeric'
    }

    const classNames = classnames({
      'Input': true,
      [`Input_size_${size}`]: true,
      [`Input_color_${color}`]: true,
      [`Input_variant_${variant}`]: true,
      [`Input_type_${type}`]: true,
      'Input_rounded': rounded,
      'Input_labeled': !!label,
      '--focused': focused,
      '--filled': !!value,
      '--invalid': invalid,
      '--disabled': disabled
    }, className)

    return (
      <this.props.component
        className={classNames}
        {...componentProps}
        onMouseDown={() => {
          this.mouseDown = true
          this.inputEl && this.inputEl.focus()
        }}
        onMouseUp={() => { this.mouseDown = false }}
      >
        {adornment &&
          <div
            className={classnames({
              'Input__adornment': true,
              [`Input__adornment_${adornmentPosition}`]: true
            })}
          >
            {adornment}
          </div>
        }
        <div className='Input__container'>
          {label &&
            <div className='Input__label'>{label}</div>
          }
          {this.renderElement(inputProps)}
        </div>
        {!!this.getMenu().length && this.renderMenu()}
        {type === 'range' && this.renderRange()}
      </this.props.component>
    )
  }
}

Input.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.object.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  componentProps: PropTypes.object,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  type: PropTypes.string.isRequired,
  label: PropTypes.any,
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  adornment: PropTypes.any,
  adornmentPosition: PropTypes.oneOf([
    'start', 'end'
  ]),
  menu: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  filterMenu: PropTypes.bool,
  step: PropTypes.number,
  rangeProps: PropTypes.object,
  position: PropTypes.string
}

Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text',
  adornmentPosition: 'end'
}
