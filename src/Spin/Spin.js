import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Spin extends React.Component {
  render () {
    const {
      className,
      size
    } = this.props

    const classNames = classnames({
      'Spin': true,
      [`Spin_size_${size}`]: !!size
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        <svg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'>
          <circle fill='none' strokeWidth='2' strokeLinecap='round' cx='15' cy='15' r='13' />
        </svg>
      </this.props.component>
    )
  }
}

Spin.propTypes = {
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
  ]).isRequired
}

Spin.defaultProps = {
  component: 'div',
  size: 'default'
}
