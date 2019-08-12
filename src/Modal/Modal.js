import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.handleKeyUp = ::this.handleKeyUp
    this.preventWindowScroll = ::this.preventWindowScroll
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.preventWindowScroll)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  open (props) {
    this._props = props
    this.setState({ visible: true })
    this.pageYOffset = window.pageYOffset
    window.addEventListener('scroll', this.preventWindowScroll)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  close () {
    const { onClose } = this.props
    this.componentWillUnmount()
    this.setState({ visible: false })

    onClose && onClose()
  }

  preventWindowScroll (event) {
    window.scrollTo(0, this.pageYOffset)
    event.preventDefault()
    event.returnValue = false
  }

  getMergedProps () {
    return { ...this.props, ...this._props }
  }

  handleKeyUp (event) {
    if (event.keyCode === 27) {
      this.close()
    }
  }

  handleMouseDown (event) {
    const window = this.refs.window

    if (window !== event.target && !window.contains(event.target)) {
      this.close()
    }
  }

  renderContent () {
    return this.getMergedProps().children
  }

  renderClose () {
    return <div className='Modal__close' onClick={::this.close} />
  }

  render () {
    const {
      className,
      size,
      title,
      closeButton
    } = this.getMergedProps()
    const { visible } = this.state

    const classNames = classnames({
      'Modal': true,
      [`Modal_size_${size}`]: true
    }, className)

    return (
      visible
        ? <this.props.component
          className={classNames}
          {...excludeProps(this)}
          onMouseDown={::this.handleMouseDown}
        >
          <div className='Modal__overlay' />
          <div className='Modal__container'>
            <div className='Modal__window' ref='window'>
              <div className='Modal__header'>
                <h3 className='Modal__title'>{title}</h3>
                {closeButton === 'inside' && this.renderClose()}
              </div>
              <div className='Modal__content'>{this.renderContent()}</div>
            </div>
          </div>
          {closeButton === 'outside' && this.renderClose()}
        </this.props.component>
        : ''
    )
  }
}

Modal.propTypes = {
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
  size: PropTypes.string.isRequired,
  title: PropTypes.any,
  closeButton: PropTypes.oneOf([
    'inside', 'outside', false
  ]),
  onClose: PropTypes.func
}

Modal.defaultProps = {
  component: 'div',
  size: 'm',
  closeButton: 'inside'
}
