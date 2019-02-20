import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Avatar extends React.Component {
  render () {
    const {
      className,
      children,
      size,
      src
    } = this.props

    const classNames = classnames({
      'Avatar': true,
      [`Avatar_size_${size}`]: !!size
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        {src
          ? <img
            className='Avatar__img'
            src={src}
          />
          : children
        }
      </this.props.component>
    )
  }
}

Avatar.propTypes = {
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
  src: PropTypes.string
}

Avatar.defaultProps = {
  component: 'div',
  size: 'default'
}
