import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputMask from 'react-input-mask'
import Slider from 'react-rangeslider'
import { excludeProps } from '../helpers'

export class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.noramlizeValue(props.value) || this.noramlizeValue(props.defaultValue)
    }
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props

    if (value !== prevProps.value && this.noramlizeValue(value) !== this.state.value) {
      this.setState({ value: this.noramlizeValue(value) })
    }
  }

  noramlizeValue (value) {
    return ['string', 'number'].indexOf(typeof value) >= 0 ? String(value) : ''
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

  filterMenu (menu, value) {
    return menu.filter((item) => {
      return item.primary.match(new RegExp(value, 'i'))
    })
  }

  getMenuSeletedItemIndex () {
    const { value } = this.state

    return this.getMenu().reduce((accumulator, item, index) => {
      if (String(item.value) === String(value)) {
        accumulator = index
      }

      return accumulator
    }, -1)
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
    setTimeout(() => {
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
    })
  }

  handleFocus (event) {
    const { onFocus } = this.props

    this.setState({
      focus: true,
      dropdownVisible: true,
      menuVisible: true,
      menuSeletedItemIndex: this.getMenuSeletedItemIndex()
    }, () => {
      this.getMenu().length && this.scrollMenuToSelected()
    })

    onFocus && onFocus(event)
  }

  handleBlur (event) {
    const { onBlur } = this.props

    if (this.dropdownMouseEnter) {
      this.inputEl.focus()
      return
    }

    this.setState({
      focus: false,
      dropdownVisible: false
    })

    setTimeout(() => {
      this.setState({ menuVisible: false })
    }, 300)

    onBlur && onBlur(event)
  }

  handleChange (event) {
    const { onChange } = this.props
    const state = {
      value: event.target.value,
      dropdownVisible: true
    }

    if (event.type === 'change') {
      state.menuSeletedItemIndex = -1
    }

    this.setState(state)
    onChange && onChange(event)
  }

  handleSliderChange (value) {
    const event = {
      type: 'change',
      target: this.inputEl
    }

    event.target.value = value

    this.handleChange(event)
  }

  handleKeyDown (event) {
    const { menuSeletedItemIndex, dropdownVisible } = this.state
    const menu = this.getMenu()
    const state = {}

    if (!menu.length) {
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
    event.target = this.inputEl
    event.target.value = item.value
    event.target.index = index

    this.handleChange(event)

    setTimeout(() => {
      this.dropdownMouseEnter = false
      this.setState({ dropdownVisible: false })
    })
  }

  renderElement (props) {
    if (this.getMenu().length) {
      props.autoComplete = 'off'
    }

    if (props.type === 'plain') {
      return (
        <div className={props.className}>
          {props.value}
        </div>
      )
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

    return (
      <div
        ref='dropdown'
        className={classnames({
          'Input__dropdown': true,
          'Input__dropdown_visible': dropdownVisible
        })}
        onMouseEnter={() => { this.dropdownMouseEnter = true }}
        onMouseLeave={() => { this.dropdownMouseEnter = false }}
      >
        {children}
      </div>
    )
  }

  renderMenu () {
    const { menuVisible, menuSeletedItemIndex } = this.state
    const menu = this.getMenu()

    return this.renderDropdown(
      menuVisible && <div className='Input__menu' ref='menu'>
        {menu.map((item, index) =>
          <div
            className={classnames({
              'Input__menu-item': true,
              'Input__menu-item_selected': index === menuSeletedItemIndex
            })}
            key={index}
            onMouseMove={() => this.setState({ menuSeletedItemIndex: index })}
            onMouseDown={this.handleMenuItemClick.bind(this, item, index)}
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

  renderSlider () {
    const { min, max, step, rangeProps } = this.props
    const { value } = this.state

    return (
      <Slider
        min={min}
        max={max}
        step={step}
        value={+value}
        tooltip={false}
        labels={{ 0: min, 100: max }}
        {...rangeProps}
        onChange={::this.handleSliderChange}
      />
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
    const { value, focus } = this.state
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

      if (!inputProps.mask) {
        inputProps.mask = (value || '').replace(/\w/g, '9') + '9'
        inputProps.maskChar = null
      }
    }

    const classNames = classnames({
      'Input': true,
      [`Input_size_${size}`]: true,
      [`Input_color_${color}`]: true,
      [`Input_variant_${variant}`]: true,
      [`Input_type_${type}`]: true,
      'Input_rounded': rounded,
      'Input_labeled': !!label,
      'Input_focus': focus,
      'Input_filled': !!value,
      'Input_invalid': invalid,
      'Input_disabled': disabled
    }, className)

    return (
      <this.props.component
        className={classNames}
        {...componentProps}
        onClick={() => { this.inputEl && this.inputEl.focus() }}
      >
        <div className='Input__container'>
          {label &&
            <div className='Input__label'>{label}</div>
          }
          {this.renderElement(inputProps)}
        </div>
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
        {!!this.getMenu().length && this.renderMenu()}
        {type === 'range' && this.renderSlider()}
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
  rangeProps: PropTypes.object
}

Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text',
  adornmentPosition: 'end'
}
