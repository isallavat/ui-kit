import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Menu extends React.Component {
  scrollToSelected (index, exact) {
    if (index >= 0) {
      const selectedItemEl = this.refRoot.childNodes[index]
      if (exact) {
        this.refRoot.scrollTop = selectedItemEl.offsetTop
      } else if (selectedItemEl.offsetTop < this.refRoot.scrollTop) {
        this.refRoot.scrollTop = selectedItemEl.offsetTop
      } else if (
        selectedItemEl.offsetTop + selectedItemEl.offsetHeight > this.refRoot.offsetHeight + this.refRoot.scrollTop
      ) {
        this.refRoot.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - this.refRoot.offsetHeight
      }
    } else {
      this.refRoot.scrollTop = 0
    }
  }

  render () {
    const {
      className
    } = this.props

    const classNames = classnames({
      Menu: true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} ref={(ref) => { this.refRoot = ref }} />
    )
  }
}

Menu.propTypes = {
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

Menu.defaultProps = {
  component: 'ul'
}
