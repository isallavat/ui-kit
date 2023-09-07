import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Table extends React.Component {
  render () {
    const { className } = this.props

    const classNames = classnames({
      Table: true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} />
    )
  }
}

Table.propTypes = {
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

Table.defaultProps = {
  component: 'div'
}
