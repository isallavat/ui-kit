import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class FlexTableCell extends React.Component {
  render () {
    const { className } = this.props

    const classNames = classnames({
      FlexTableCell: true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} />
    )
  }
}

FlexTableCell.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired,
    PropTypes.object.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ])
}

FlexTableCell.defaultProps = {
  component: 'div'
}
