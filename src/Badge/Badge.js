import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Badge extends React.Component {
  render () {
    const {
      className,
      children,
      content
    } = this.props

    const classNames = classnames({
      'Badge': true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        {children}
        <div
          className={classnames({
            'Badge__sticker': true,
            '-visible': !!content
          })}
        >
          {content}
        </div>
      </this.props.component>
    )
  }
}

Badge.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  content: PropTypes.any
}

Badge.defaultProps = {
  component: 'div'
}
