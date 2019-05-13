import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class GridItem extends React.Component {
  render () {
    const {
      className,
      full,
      mobile,
      tablet,
      desktop
    } = this.props

    const classNames = classnames({
      'GridItem': true,
      'GridItem_full': full,
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
    PropTypes.func.isRequired,
    PropTypes.object.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  full: PropTypes.bool,
  mobile: PropTypes.number,
  tablet: PropTypes.number,
  desktop: PropTypes.number
}

GridItem.defaultProps = {
  component: 'div'
}
