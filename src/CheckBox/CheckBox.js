import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class CheckBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      checked: props.checked !== undefined ? Boolean(props.checked) : Boolean(props.defaultChecked)
    }
  }

  componentDidUpdate (prevProps) {
    const { checked } = this.props

    if (checked !== prevProps.checked && checked !== this.state.checked) {
      this.setState({ checked: Boolean(checked) })
    }
  }

  handleChange (event) {
    const { readOnly, onChange } = this.props

    if (readOnly) {
      return
    }

    this.setState({ checked: event.target.checked })

    onChange && onChange(event)
  }

  renderElement () {
    return (
      <div className='CheckBox__element' />
    )
  }

  render () {
    const {
      className,
      componentProps,
      size,
      color,
      variant,
      label,
      labelPosition,
      invalid,
      disabled
    } = this.props
    const { checked } = this.state

    const classNames = classnames({
      'CheckBox': true,
      [`CheckBox_size_${size}`]: true,
      [`CheckBox_color_${color}`]: true,
      [`CheckBox_variant_${variant}`]: true,
      '--checked': checked,
      '--invalid': invalid,
      '--disabled': disabled
    }, className)

    return (
      <this.props.component className={classNames} {...componentProps}>
        <label className='CheckBox__container'>
          <input
            {...excludeProps(this)}
            className='CheckBox__input'
            type='checkbox'
            checked={checked}
            value={String(checked)}
            onChange={::this.handleChange}
          />
          {variant !== 'button' && this.renderElement()}
          {!!label &&
            <div className={classnames({
              'CheckBox__label': true,
              [`CheckBox__label_position_${labelPosition}`]: true
            })}>{label}</div>
          }
        </label>
      </this.props.component>
    )
  }
}

CheckBox.propTypes = {
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
  variant: PropTypes.oneOf([
    'default', 'button'
  ]),
  label: PropTypes.any,
  labelPosition: PropTypes.oneOf([
    'start', 'end'
  ]),
  invalid: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool
}

CheckBox.defaultProps = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end'
}
