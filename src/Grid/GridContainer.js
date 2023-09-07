import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class GridContainer extends React.Component {
  render () {
    const { className, spacing, align, valign } = this.props

    const classNames = classnames({
      GridContainer: true,
      [`GridContainer_spacing_${spacing}`]: !!spacing,
      [`GridContainer_align_${align}`]: !!align,
      [`GridContainer_valign_${valign}`]: !!valign
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} />
    )
  }
}

GridContainer.propTypes = {
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
  spacing: PropTypes.number,
  align: PropTypes.oneOf([
    'left', 'center', 'right', 'around', 'between'
  ]),
  valign: PropTypes.oneOf([
    'top', 'center', 'bottom'
  ])
}

GridContainer.defaultProps = {
  component: 'div'
}
