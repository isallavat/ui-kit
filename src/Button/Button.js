import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Progress } from '../Progress'
import { excludeProps } from '../helpers'

export class Button extends React.Component {
  render () {
    const {
      className,
      children,
      size,
      color,
      variant,
      align,
      rounded,
      circular,
      noresize,
      progress,
      fullWidth,
      disabled
    } = this.props

    const classNames = classnames({
      'Button': true,
      [`Button_size_${size}`]: true,
      [`Button_color_${color}`]: true,
      [`Button_variant_${variant}`]: true,
      [`Button_align_${align}`]: true,
      'Button_full-width': fullWidth,
      'Button_rounded': rounded,
      'Button_circular': circular,
      '--progress': progress,
      '--disabled': disabled
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        <div className={classnames({
          'Button__content': true,
          'Button__content_centered': noresize,
          'Button__content_hidden': progress
        })}>{children}</div>
        {progress &&
          <div className='Button__progress-container'>
            <Progress
              className='Button__progress'
              color='current'
            />
          </div>
        }
      </this.props.component>
    )
  }
}

Button.propTypes = {
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
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  rounded: PropTypes.bool,
  circular: PropTypes.bool,
  noresize: PropTypes.bool,
  progress: PropTypes.bool,
  fullWidth: PropTypes.bool,
  align: PropTypes.oneOf([
    'left', 'center', 'right', 'justify'
  ]).isRequired
}

Button.defaultProps = {
  component: 'button',
  size: 'm',
  color: 'default',
  variant: 'default',
  align: 'center',
  type: 'button'
}
