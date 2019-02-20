import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputMask from 'react-input-mask'
import { Menu, MenuItem } from '../Menu'
import { Calendar } from '../Calendar'
import { excludeProps } from '../helpers'

export class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  // static getDerivedStateFromProps (nextProps, prevState) {
  //   if ([prevState.value, prevState.propsValue].indexOf(nextProps.value) < 0) {
  //     return {
  //       value: nextProps.value,
  //       propsValue: nextProps.value
  //     }
  //   }
  //
  //   return null
  // }

  componentDidUpdate (prevProps) {
    const { value } = this.props

    if (value !== prevProps.value && value !== this.state.value) {
      this.setState({ value })
    }
  }

  prepareMenu () {
    const { menu } = this.props
    let _menu = []

    if (menu instanceof Array) {
      _menu = menu
    } else if (menu instanceof Object) {
      _menu = Object.keys(menu || {}).map((key) => {
        return {
          value: key,
          primary: menu[key]
        }
      })
    }

    return _menu.map((item) => {
      if (item.primary === undefined) {
        item.primary = item.value
      }

      return item
    })
  }

  scrollMenu (exact) {
    const { selectedMenuItemIndex } = this.state
    const menuEl = this.refs.menu

    if (menuEl) {
      menuEl.scrollToSelected(selectedMenuItemIndex)
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

  formatDate (date, format) {
    if (date instanceof Date) {
      return format
        .replace('YYYY', date.getFullYear())
        .replace('MM', ('0' + (date.getMonth() + 1)).slice(-2))
        .replace('DD', ('0' + date.getDate()).slice(-2))
    } else if (date) {
      let year = date.substr(format.indexOf('YYYY'), 4) * 1
      let month = date.substr(format.indexOf('MM'), 2) * 1 - 1
      let day = date.substr(format.indexOf('DD'), 2) * 1

      return new Date(year, month, day)
    }
  }

  valueToDate (value) {
    const arr = value.split('-')
    const year = arr[0] * 1
    const month = arr[1] * 1 - 1
    const day = arr[2] * 1

    if (year && month && day) {
      return new Date(year, month, day)
    }
  }

  handleFocus (event) {
    const { onFocus } = this.props

    this.setState({
      focus: true,
      menuVisible: true
    })

    onFocus && onFocus(event)
  }

  handleBlur (event) {
    const { onBlur } = this.props

    if (this.dropdownMouseDown) {
      this.dropdownMouseDown = false
      this.inputEl.focus()
      return
    }

    this.setState({
      focus: false,
      menuVisible: false
    })

    onBlur && onBlur(event)
  }

  handleChange (event) {
    const { onChange } = this.props

    this.setState({
      value: event.target.value,
      menuVisible: true
    })

    onChange && onChange(event)
  }

  handleKeyDown (event) {
    const { selectedMenuItemIndex } = this.state
    const menu = this.prepareMenu()
    const state = {}

    if (!menu.length) {
      return
    } else if (event.keyCode === 38) {
      state.selectedMenuItemIndex = selectedMenuItemIndex > 0 ? selectedMenuItemIndex - 1 : menu.length - 1
    } else if (event.keyCode === 40) {
      state.selectedMenuItemIndex = selectedMenuItemIndex < menu.length - 1 ? selectedMenuItemIndex + 1 : 0
    } else if (event.keyCode === 13) {
      event.preventDefault()
      let selectedMenuItem = menu[selectedMenuItemIndex]
      state.selectedMenuItemIndex = undefined
      state.menuVisible = false
      selectedMenuItem && this.handleMenuItemClick(selectedMenuItem.value, event)
    } else if ([37, 39].indexOf(event.keyCode) === -1) {
      state.selectedMenuItemIndex = undefined
    }

    this.setState(state, this.scrollMenu)
  }

  handleMenuItemClick (value, event) {
    event.target = this.inputEl
    event.target.value = value

    this.handleChange(event)

    if (this.refs.dropdown && event.type === 'click') {
      setTimeout(() => {
        this.inputEl.blur()
      })
    }
  }

  handleCalendarChange (value) {
    const date = new Date(value)
    const event = { target: this.inputElHidden }
    event.target.value = this.formatDate(date, 'YYYY-MM-DD')

    this.handleChange(event)

    if (this.refs.dropdown) {
      setTimeout(() => {
        this.inputEl.blur()
      })
    }
  }

  handleDateChange (event) {
    const { dateFormat, onChange } = this.props
    const { value } = event.target
    const year = value.substr(dateFormat.indexOf('YYYY'), 4) * 1
    const month = value.substr(dateFormat.indexOf('MM'), 2) * 1 - 1
    const day = value.substr(dateFormat.indexOf('DD'), 2) * 1

    event.target = this.inputElHidden

    if (year && month && day) {
      let date = new Date(year, month, day)
      event.target.value = this.formatDate(date, 'YYYY-MM-DD')
      this.handleChange(event)
    } else {
      this.setState({ value })
      event.target.value = ''
      onChange && onChange(event)
    }
  }

  handleDropdownMouseDown () {
    this.dropdownMouseDown = true
  }

  renderElement (props) {
    return (
      <InputMask
        {...props}
        inputRef={(node) => { this.inputEl = node }}
      />
    )
  }

  renderElementDate (props) {
    const { min, max, dateFormat } = this.props
    const { value, focus } = this.state
    const date = this.valueToDate(value)

    props.type = 'text'
    props.value = date ? this.formatDate(date, dateFormat) : value
    props.mask = dateFormat
      .replace('DD', 99)
      .replace('MM', 99)
      .replace('YYYY', 9999)

    props.onChange = ::this.handleDateChange

    return (
      <Fragment>
        {this.renderElement(props)}
        <input
          type='hidden'
          value={date ? value : ''}
          name={props.name}
          ref={(node) => { this.inputElHidden = node }}
        />
        {focus && this.renderDropdown(
          <Calendar
            value={date ? date.getTime() : 0}
            min={min}
            max={max}
            onChange={::this.handleCalendarChange}
          />
        )}
      </Fragment>
    )
  }

  renderDropdown (children) {
    return (
      <div
        ref='dropdown'
        className='Input__dropdown'
        onMouseDown={::this.handleDropdownMouseDown}
      >
        {children}
      </div>
    )
  }

  renderMenu () {
    const { value, selectedMenuItemIndex } = this.state
    const menu = this.prepareMenu()

    return (
      !!menu.length && this.renderDropdown(
        <Menu className='Input__menu' ref='menu'>
          {menu.map((item, index) =>
            <MenuItem
              className='Input__menu-item'
              key={index}
              primary={item.primary}
              secondary={item.secondary}
              hover={index === selectedMenuItemIndex}
              selected={item.value === value}
              onClick={this.handleMenuItemClick.bind(this, item.value)}
            />
          )}
        </Menu>
      )
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
      adornment,
      adornmentPosition
    } = this.props
    const { value, focus, menuVisible } = this.state
    const inputProps = {
      ...excludeProps(this),
      className: 'Input__element Input__element_native',
      type,
      value,
      disabled,
      mask,
      onFocus: ::this.handleFocus,
      onBlur: ::this.handleBlur,
      onChange: ::this.handleChange,
      onKeyDown: ::this.handleKeyDown
    }

    if (type === 'number' && inputProps.mask) {
      inputProps.type = 'text'
      inputProps.inputMode = 'numeric'
    } else if (type === 'select') {
      inputProps.readOnly = true
    }

    let element

    switch (type) {
      case 'date':
        element = this.renderElementDate(inputProps)
        break
      default:
        element = this.renderElement(inputProps)
    }

    const classNames = classnames({
      'Input': true,
      [`Input_size_${size}`]: !!size,
      [`Input_color_${color}`]: !!color,
      [`Input_variant_${variant}`]: !!variant,
      [`Input_type_${type}`]: !!type,
      'Input_rounded': rounded,
      'Input_labeled': !!label,
      '-filled': !!value,
      '-focus': focus,
      '-invalid': invalid,
      '-disabled': disabled
    }, className)

    return (
      <this.props.component className={classNames} {...componentProps}>
        {label &&
          <div className='Input__label'>{label}</div>
        }
        {element}
        {adornment &&
          <div className={classnames({
            'Input__adornment': true,
            [`Input__adornment_${adornmentPosition}`]: true
          })}>{adornment}</div>
        }
        {menuVisible && this.renderMenu()}
      </this.props.component>
    )
  }
}

Input.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  componentProps: PropTypes.object,
  size: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]).isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]).isRequired,
  variant: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]).isRequired,
  rounded: PropTypes.bool,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  mask: PropTypes.string,
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  value: PropTypes.any.isRequired,
  adornment: PropTypes.any,
  adornmentPosition: PropTypes.oneOf([
    'start', 'end'
  ]),
  menu: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        primary: PropTypes.any,
        secondary: PropTypes.any
      }).isRequired
    ).isRequired
  ])
}

Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text',
  value: '',
  dateFormat: 'DD.MM.YYYY',
  adornmentPosition: 'end'
}
