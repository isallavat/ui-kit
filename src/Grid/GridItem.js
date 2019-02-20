import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class GridItem extends React.Component {
  render () {
    const {
      className,
      mobile,
      tablet,
      desktop
    } = this.props

    const classNames = classnames({
      'GridItem': true,
      [`GridItem_mobile_${mobile}`]: !!mobile,
      [`GridItem_tablet_${tablet}`]: !!tablet,
      [`GridItem_desktop_${desktop}`]: !!desktop
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} />
    )
  }
}

GridItem.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  mobile: PropTypes.oneOf([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true
  ]),
  tablet: PropTypes.oneOf([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true
  ]),
  desktop: PropTypes.oneOf([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, true
  ])
}

GridItem.defaultProps = {
  component: 'div'
}
