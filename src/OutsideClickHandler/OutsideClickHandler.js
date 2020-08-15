import React from 'react'
import PropTypes from 'prop-types'
import { excludeProps } from '../helpers'

export class OutsideClickHandler extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = ::this.handleClick
  }

  componentDidMount () {
    if (this.isTouchableDevice()) {
      document.addEventListener('touchstart', this.handleClick, true)
    } else {
      document.addEventListener('click', this.handleClick, true)
    }
  }

  componentWillUnmount () {
    document.removeEventListener('touchstart', this.handleClick, true)
    document.removeEventListener('click', this.handleClick, true)
  }

  isTouchableDevice () {
    return 'ontouchstart' in window
  }

  handleClick (event) {
    const { disabled, onOutsideClick } = this.props
    const root = this.refs.root

    if (!disabled && root !== event.target && !root.contains(event.target)) {
      onOutsideClick && onOutsideClick()
    }
  }

  render () {
    return (
      <div {...excludeProps(this)} ref='root'>
        {this.props.children}
      </div>
    )
  }
}

OutsideClickHandler.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onOutsideClick: PropTypes.func
}
