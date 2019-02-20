import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Spin } from '../Spin'
import { excludeProps } from '../helpers'

export class Button extends React.Component {
  render () {
    const {
      className,
      children,
      size,
      color,
      variant,
      rounded,
      circular,
      progress,
      fullWidth
    } = this.props

    const classNames = classnames({
      'Button': true,
      [`Button_size_${size}`]: !!size,
      [`Button_color_${color}`]: !!color,
      [`Button_variant_${variant}`]: !!variant,
      'Button_full-width': fullWidth,
      'Button_rounded': rounded,
      'Button_circular': circular,
      'Button_progress': progress
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        <span className='Button__content'>{children}</span>
        {progress && <Spin className='Button__spin' />}
      </this.props.component>
    )
  }
}

Button.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
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
  circular: PropTypes.bool,
  progress: PropTypes.bool,
  fullWidth: PropTypes.bool
}

Button.defaultProps = {
  component: 'button',
  size: 'm',
  color: 'default',
  variant: 'default',
  type: 'button'
}
