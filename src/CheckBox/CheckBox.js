import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class CheckBox extends React.Component {
  handleChange (event) {
    const { onChange } = this.props

    event.target.value = event.target.checked

    onChange && onChange(event)
  }

  render () {
    const {
      className,
      componentProps,
      size,
      color,
      variant,
      label,
      value,
      labelPosition,
      invalid
    } = this.props

    const classNames = classnames({
      'CheckBox': true,
      [`CheckBox_size_${size}`]: !!size,
      [`CheckBox_color_${color}`]: !!color,
      [`Radio_variant_${variant}`]: !!variant,
      '-invalid': invalid
    }, className)

    return (
      <this.props.component className={classNames} {...componentProps}>
        <input
          {...excludeProps(this)}
          type='checkbox'
          defaultChecked={String(value) === 'true'}
          onChange={::this.handleChange}
        />
        <div className='CheckBox__container'>
          <span className='CheckBox__element'>
            <span className='CheckBox__element-handle' />
          </span>
          {!!label &&
            <div className={classnames(
              'CheckBox__label',
              `CheckBox__label_position_${labelPosition}`
            )}>{label}</div>
          }
        </div>
      </this.props.component>
    )
  }
}

CheckBox.propTypes = {
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
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf([
    'start', 'end'
  ]),
  invalid: PropTypes.bool
}

CheckBox.defaultProps = {
  component: 'label',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end'
}
