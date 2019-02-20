import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Radio extends React.Component {
  render () {
    const {
      className,
      componentProps,
      size,
      color,
      variant,
      label,
      labelPosition,
      invalid
    } = this.props

    const classNames = classnames({
      'Radio': true,
      [`Radio_size_${size}`]: !!size,
      [`Radio_color_${color}`]: !!color,
      [`Radio_variant_${variant}`]: !!variant,
      '-invalid': invalid
    }, className)

    return (
      <this.props.component className={classNames} {...componentProps}>
        <input
          {...excludeProps(this)}
          type='radio'
        />
        <div className='Radio__container'>
          <span className='Radio__element'>
            <span className='Radio__element-handle' />
          </span>
          {!!label &&
            <div className={classnames(
              'Radio__label',
              `Radio__label_position_${labelPosition}`
            )}>{label}</div>
          }
        </div>
      </this.props.component>
    )
  }
}

Radio.propTypes = {
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

Radio.defaultProps = {
  component: 'label',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end'
}
