import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Tooltip extends React.Component {
  render () {
    const { className, tooltip, position } = this.props

    const classNames = classnames({
      'Tooltip': true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        <div className={`Tooltip__content --${position}`}>{tooltip}</div>
        <div>{this.props.children}</div>
      </this.props.component>
    )
  }
}

Tooltip.propTypes = {
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
  tooltip: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired
  ]),
  position: PropTypes.oneOf([
    'top', 'left', 'right', 'bottom'
  ])
}

Tooltip.defaultProps = {
  component: 'div',
  position: 'top'
}
