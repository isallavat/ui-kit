import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Table } from '../Table'

export class Tooltip extends React.Component {
  render () {
    const { children, className, tooltip, position = 'top' } = this.props

    const classNames = classnames({
      'Tooltip': true
    }, className)

    return (
      <div className={classNames}>
        <div className={`Tooltip__content --${position}`}>{tooltip}</div>
        <div>{children}</div>
      </div>
    )
  }
}

Tooltip.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  children: PropTypes.element.isRequired,
  tooltip: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.element.isRequired
  ]),
  position: PropTypes.oneOf([
    'top', 'left', 'right', 'bottom'
  ])
}

Table.defaultProps = {
  position: 'top'
}
