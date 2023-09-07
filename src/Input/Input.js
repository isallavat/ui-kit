import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import InputMask from 'react-input-mask'
import { Range } from 'react-range'
import { Progress } from '../Progress'
import { ScrollArea } from '../ScrollArea'
import { excludeProps, formatPrice } from '../helpers'

export class Input extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: this.normalizeValue(props.value)
    }

    if (!this.state.value && props.defaultValue !== undefined) {
      this.state.value = this.normalizeValue(props.defaultValue)
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    const { value } = this.props
    const { dropdownVisible } = this.state

    if (value !== prevProps.value && this.normalizeValue(value) !== this.state.value) {
      this.setState({ value: this.normalizeValue(value) })
    }

    if (dropdownVisible && !prevState.dropdownVisible) {
      this.setDropdownPosition()
    }
  }

  normalizeValue (value) {
    return ['string', 'number'].indexOf(typeof value) >= 0 ? String(value) : ''
  }

  isValueValid (value) {
    const { type } = this.props

    if (['tel', 'number', 'range'].includes(type)) {
      return /\d+/.test(value)
    } else if (type === 'decimal') {
      return /[\d.]+/.test(value)
    } else {
      return true
    }
  }

  escapeString (str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  }

  getMenu () {
    const { menu, filterMenu } = this.props
    const { value } = this.state
    let _menu = []

    if (menu instanceof Array) {
      _menu = menu
    } else if (menu instanceof Object) {
      _menu = Object.keys(menu).map((key) => {
        return {
          value: key,
          primary: menu[key]
        }
      })
    }

    _menu = _menu.map((item) => {
      return {
        ...item,
        primary: item.primary || item.label || item.value
      }
    }, [])

    return filterMenu ? this.filterMenu(_menu, value) : _menu
  }

  findString (children, value) {
    const arr = []
    for (const key in children) {
      if (typeof children[key] === 'string') {
        return children[key].match(new RegExp(this.escapeString(value), 'i'))
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
      if (!value) {
        return true
      } else if (typeof item.primary !== 'string' && item.primary.props) {
        return this.findString(item.primary.props.children, value)
      }

      return item.primary.toString().match(new RegExp(this.escapeString(value), 'i'))
    })
  }

  getMenuSelectedItemIndex () {
    const { value } = this.state

    return this.getMenu().reduce((accumulator, item, index) => {
      if (String(item.value) === String(value)) {
        accumulator = index
      }

      return accumulator
    }, undefined)
  }

  shiftMenuSelectedItemIndex (menuSelectedItemIndex, shift) {
    const menu = this.getMenu()
    const _menuSelectedItemIndex = menuSelectedItemIndex + shift

    if (_menuSelectedItemIndex > menu.length - 1) {
      return this.shiftMenuSelectedItemIndex(-shift, shift)
    } else if (_menuSelectedItemIndex < 0) {
      return this.shiftMenuSelectedItemIndex(menu.length - 1 - shift, shift)
    } else if (menu[_menuSelectedItemIndex].disabled) {
      return this.shiftMenuSelectedItemIndex(_menuSelectedItemIndex, shift)
    } else {
      return _menuSelectedItemIndex
    }
  }

  scrollMenuToSelected (exact) {
    const { menuSelectedItemIndex } = this.state

    if (!this.menuEl) {
      return
    }

    const selectedItemEl = this.menuEl.childNodes[menuSelectedItemIndex]

    if (menuSelectedItemIndex >= 0 && selectedItemEl) {
      if (exact) {
        this.menuEl.scrollTop = selectedItemEl.offsetTop
      } else if (selectedItemEl.offsetTop < this.menuEl.scrollTop) {
        this.menuEl.scrollTop = selectedItemEl.offsetTop
      } else if (
        selectedItemEl.offsetTop + selectedItemEl.offsetHeight > this.menuEl.offsetHeight + this.menuEl.scrollTop
      ) {
        this.menuEl.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - this.menuEl.offsetHeight
      }
    } else {
      this.menuEl.scrollTop = 0
    }
  }

  setDropdownPosition () {
    const dropdown = this.refDropdown

    if (!dropdown) {
      return
    }

    dropdown.removeAttribute('style')
    const dropdownBottom = dropdown.getBoundingClientRect().bottom

    if (dropdownBottom > window.innerHeight) {
      dropdown.style.top = 'auto'
      dropdown.style.bottom = '100%'
    }
  }

  handleClick (event) {
    const { readOnly, onClick } = this.props

    if (readOnly) {
      return false
    }

    this.handleFocus(event)

    onClick && onClick(event)
  }

  handleFocus (event) {
    const { readOnly, onFocus } = this.props
    const menuSelectedItemIndex = this.getMenuSelectedItemIndex()

    if (readOnly) {
      return false
    }

    const state = {
      focused: true,
      dropdownVisible: true,
      menuSelectedItemIndex: menuSelectedItemIndex === undefined ? -1 : menuSelectedItemIndex
    }

    this.setState(state, () => {
      this.getMenu().length && this.scrollMenuToSelected()
    })

    onFocus && onFocus(event)
  }

  handleBlur (event) {
    const { readOnly, onBlur } = this.props

    if (readOnly) {
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

    if (readOnly) {
      return false
    }

    this.setState({
      value: event.target.value,
      dropdownVisible: event.type === 'change'
    })

    onChange && onChange(event)
  }

  handlePaste (event) {
    const value = (event.clipboardData || window.clipboardData).getData('text')

    if (!this.isValueValid(value)) {
      event.preventDefault()
    }
  }

  handleRangeChange (value) {
    const { min, max, step, roundBy = step, readOnly, disabled } = this.props

    if (readOnly || disabled) {
      return false
    }

    const event = {
      type: 'change',
      target: this.inputEl
    }

    if (value > min && value < max) {
      value -= min % roundBy
    } else if (value > max) {
      value = max - max % roundBy
    }

    event.target.value = value

    this.handleChange(event)
  }

  handleKeyDown (event) {
    const { readOnly, onKeyDown } = this.props
    const { menuSelectedItemIndex, dropdownVisible } = this.state
    const menu = this.getMenu()
    const menuOnlyEnabled = menu.filter((item) => !item.disabled)
    const state = {}

    if (
      event.key !== undefined &&
      event.key.length === 1 &&
      !event.metaKey &&
      !this.isValueValid(event.key)
    ) {
      event.preventDefault()
    }

    if (readOnly) {
      return false
    } else if ([38, 40].indexOf(event.keyCode) >= 0 && menu.length) {
      state.dropdownVisible = true
    }

    if (event.keyCode === 38 && menuOnlyEnabled.length) {
      state.menuSelectedItemIndex = this.shiftMenuSelectedItemIndex(menuSelectedItemIndex, -1)
    } else if (event.keyCode === 40 && menuOnlyEnabled.length) {
      state.menuSelectedItemIndex = this.shiftMenuSelectedItemIndex(menuSelectedItemIndex, 1)
    } else if (event.keyCode === 13 && dropdownVisible && menuOnlyEnabled.length) {
      event.preventDefault()
      const selectedMenuItem = menu[menuSelectedItemIndex]
      selectedMenuItem && this.handleMenuItemClick(selectedMenuItem, menuSelectedItemIndex, event)
    }

    if (state.dropdownVisible) {
      this.setState(state, this.scrollMenuToSelected)
    }

    onKeyDown && onKeyDown(event)
  }

  handleMenuItemClick (item, index, event) {
    if (item.disabled || event.button) {
      return
    }
    event.target = this.inputEl
    event.target.value = item.value
    event.target.index = index

    this.handleChange(event)
  }

  handleSliderDown () {
    const { min } = this.props
    const { value } = this.state

    if (['', null].indexOf(value) >= 0) {
      this.handleRangeChange(min)
    }
  }

  renderElement (props) {
    const { format, readOnly, maskChar } = this.props
    const menu = this.getMenu()

    if (menu.length) {
      props.autoComplete = 'off'
    }

    if (props.mask) {
      props.maskChar = maskChar
      props.formatChars = {
        '#': '[0-9]',
        9: '[0-9]',
        a: '[A-Za-zА-Яа-яЁё]',
        w: '[A-Za-zА-Яа-яЁё\\d]',
        '*': '.'
      }
    }

    if (format === 'price') {
      props.value = formatPrice(props.value)
    } else if (typeof format === 'function') {
      props.value = format(props.value)
    }

    if (props.type === 'plain') {
      const selectedItem = menu.filter((item) => String(item.value) === String(props.value))[0]
      if (selectedItem) {
        props.value = selectedItem.primary
      }

      if (props.mask) {
        const inputMask = new InputMask(props)

        props.value = inputMask.value
      }

      if (props.value) {
        props.value = props.value.replace(/\n/g, '<br />').replace(/\s\s/g, '&nbsp; ')
      }

      return (
        <div
          className={props.className}
          dangerouslySetInnerHTML={{
            __html: props.value
          }}
        />
      )
    } else if (props.mask) {
      props.beforeMaskedValueChange = (newState, oldState) => {
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
    } else {
      return (
        <input
          {...props}
          ref={(node) => { this.inputEl = node }}
        />
      )
    }
  }

  renderDropdown (children) {
    const { dropdownVisible } = this.state
    const { position } = this.props

    return (
      <div
        ref={(ref) => { this.refDropdown = ref }}
        className={classnames({
          Input__dropdown: true,
          '--visible': dropdownVisible,
          '--right': position === 'right'
        })}
      >
        {children}
      </div>
    )
  }

  renderMenu () {
    const { dropdownVisible, menuSelectedItemIndex } = this.state
    const menu = this.getMenu()

    return this.renderDropdown(
      <ScrollArea className='Input__menu' containerRef={(node) => { this.menuEl = node }}>
        {menu.map((item, index) =>
          <div
            className={classnames({
              'Input__menu-item': true,
              '--selected': index === menuSelectedItemIndex,
              '--disabled': item.disabled
            })}
            key={index}
            data-value={item.value}
            onMouseMove={() => dropdownVisible && this.setState({ menuSelectedItemIndex: index })}
            onMouseDown={this.handleMenuItemClick.bind(this, item, index)}
          >
            <div className='Input__menu-item-primary'>{item.primary}</div>
            {!!item.secondary &&
              <div className='Input__menu-item-secondary'>{item.secondary}</div>
            }
          </div>
        )}
      </ScrollArea>
    )
  }

  renderRange () {
    const { min = 0, max = 0, step, readOnly, disabled, rangeProps = {} } = this.props
    const _max = max > min ? max : min + step
    let value = parseFloat(this.state.value) || min
    let valuePercents = (value - min) / (_max - min) * 100

    if (value < min) {
      value = min
      valuePercents = 0
    } else if (value > max) {
      value = max
      valuePercents = 100
    }

    return (
      <div className='Input__slider'>
        <Range
          min={min}
          max={_max}
          step={step}
          values={[value]}
          disabled={disabled || readOnly || max <= min}
          renderTrack={({ props, children }) => (
            <div {...props}>
              {children}
              <div
                className='Input__slider-track'
                style={{
                  width: valuePercents + '%'
                }}
              />
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              className='Input__slider-handle'
              {...props}
              tabIndex='-1'
              onMouseDown={::this.handleSliderDown}
            />
          )}
          onChange={(values) => { this.handleRangeChange(values[0]) }}
        />
        <div className='Input__slider-label-min'>
          {rangeProps.formatLabel ? rangeProps.formatLabel(min, 'min') : min}
        </div>
        <div className='Input__slider-label-max'>
          {rangeProps.formatLabel ? rangeProps.formatLabel(max, 'max') : max}
        </div>
      </div>
    )
  }

  renderSuffix (element, type) {
    return (
      <div
        className={`Input__${type}`}
        onClick={() => {
          this.inputEl && this.inputEl.focus()
        }}
      >
        {element}
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
      progress,
      type,
      label,
      mask,
      prefix,
      suffix
    } = this.props
    const { value, focused } = this.state
    const inputProps = {
      ...excludeProps(this),
      className: 'Input__element',
      disabled,
      type,
      value,
      mask,
      onClick: ::this.handleClick,
      onFocus: ::this.handleFocus,
      onBlur: ::this.handleBlur,
      onChange: ::this.handleChange,
      onKeyDown: ::this.handleKeyDown,
      onPaste: ::this.handlePaste
    }

    if (['number', 'decimal', 'range'].indexOf(type) >= 0) {
      inputProps.type = 'text'
      inputProps.inputMode = 'numeric'
    }

    const classNames = classnames({
      Input: true,
      [`Input_size_${size}`]: true,
      [`Input_color_${color}`]: true,
      [`Input_variant_${variant}`]: true,
      [`Input_type_${type}`]: true,
      Input_rounded: rounded,
      Input_labeled: !!label,
      '--focused': focused,
      '--filled': [undefined, null, ''].indexOf(value) < 0,
      '--invalid': invalid,
      '--disabled': disabled,
      '--progress': progress
    }, className)

    return (
      <this.props.component
        className={classNames}
        {...componentProps}
      >
        {prefix && this.renderSuffix(prefix, 'prefix')}
        <div className='Input__container'>
          {!!label &&
            <div className='Input__label'>{label}</div>
          }
          {this.renderElement(inputProps)}
        </div>
        {suffix && this.renderSuffix(suffix, 'suffix')}
        {progress &&
          <Progress className='Input__progress' color='current' />
        }
        {type !== 'plain' && !!this.getMenu().length && this.renderMenu()}
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
  format: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]),
  min: PropTypes.number,
  max: PropTypes.number,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  invalid: PropTypes.bool,
  progress: PropTypes.bool,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  menu: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  filterMenu: PropTypes.bool,
  step: PropTypes.number,
  roundBy: PropTypes.number,
  rangeProps: PropTypes.object,
  position: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyDown: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

Input.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'text'
}
