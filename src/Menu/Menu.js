import React from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Menu extends React.Component {
  scrollToSelected (index, exact) {
    const rootEl = findDOMNode(this.refs.root)

    if (index >= 0) {
      let selectedItemEl = rootEl.childNodes[index]
      if (exact) {
        rootEl.scrollTop = selectedItemEl.offsetTop
      } else if (selectedItemEl.offsetTop < rootEl.scrollTop) {
        rootEl.scrollTop = selectedItemEl.offsetTop
      } else if (selectedItemEl.offsetTop + selectedItemEl.offsetHeight > rootEl.offsetHeight + rootEl.scrollTop) {
        rootEl.scrollTop = selectedItemEl.offsetTop + selectedItemEl.offsetHeight - rootEl.offsetHeight
      }
    } else {
      rootEl.scrollTop = 0
    }
  }

  render () {
    const {
      className
    } = this.props

    const classNames = classnames({
      'Menu': true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} ref='root' />
    )
  }
}

Menu.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired
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
