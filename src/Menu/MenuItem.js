import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class MenuItem extends React.Component {
  render () {
    const {
      className,
      divider,
      icon,
      primary,
      secondary,
      action,
      selected
    } = this.props

    const classNames = classnames({
      MenuItem: true,
      MenuItem_bordered: divider,
      '--selected': selected
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        {icon &&
          <div className='MenuItem__icon'>{icon}</div>
        }
        <div className='MenuItem__text'>
          {primary &&
            <div className='MenuItem__text-primary'>{primary}</div>
          }
          {secondary &&
            <div className='MenuItem__text-secondary'>{secondary}</div>
          }
        </div>
        {action &&
          <div className='MenuItem__action'>{action}</div>
        }
      </this.props.component>
    )
  }
}

MenuItem.propTypes = {
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
  divider: PropTypes.bool,
  icon: PropTypes.any,
  primary: PropTypes.any,
  secondary: PropTypes.any,
  action: PropTypes.any,
  selected: PropTypes.bool
}

MenuItem.defaultProps = {
  component: 'li'
}
