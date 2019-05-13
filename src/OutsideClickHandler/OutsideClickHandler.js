import React from 'react'
import PropTypes from 'prop-types'

export class OutsideClickHandler extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = ::this.handleClick
  }

  componentDidMount () {
    document.addEventListener('click', this.handleClick, true)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleClick, true)
  }

  handleClick (event) {
    const { disabled, onOutsideClick } = this.props
    const root = this.refs.root

    if (!disabled && root !== event.target && !root.contains(event.target)) {
      onOutsideClick && onOutsideClick()
    }
  }

  render () {
    const { className } = this.props

    return (
      <div className={className} ref='root'>
        {this.props.children}
      </div>
    )
  }
}

OutsideClickHandler.propTypes = {
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onOutsideClick: PropTypes.func
}
