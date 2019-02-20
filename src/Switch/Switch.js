import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Switch extends React.Component {
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
      label,
      value,
      invalid,
      labelPosition
    } = this.props

    const classNames = classnames({
      'Switch': true,
      [`Switch_size_${size}`]: !!size,
      [`Switch_color_${color}`]: !!color,
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
        <div className='Switch__container'>
          <span className='Switch__element'>
            <span className='Switch__element-handle' />
          </span>
          {!!label &&
            <div className={classnames(
              'Switch__label',
              `Switch__label_position_${labelPosition}`
            )}>{label}</div>
          }
        </div>
      </this.props.component>
    )
  }
}

Switch.propTypes = {
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
  label: PropTypes.string,
  labelPosition: PropTypes.oneOf([
    'start', 'end'
  ]),
  invalid: PropTypes.bool
}

Switch.defaultProps = {
  component: 'label',
  size: 'm',
  color: 'default',
  labelPosition: 'end'
}
