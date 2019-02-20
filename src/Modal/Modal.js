import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.handleKeyUp = ::this.handleKeyUp
  }

  open () {
    this.setState({ visible: true })
    document.body.style.overflow = 'hidden'
    document.addEventListener('keyup', this.handleKeyUp)
  }

  close () {
    const { onClose } = this.props
    this.componentWillUnmount()
    this.setState({ visible: false })

    onClose && onClose()
  }

  componentWillUnmount () {
    if (this.state.visible) {
      document.body.style.overflow = 'visible'
      document.removeEventListener('keyup', this.handleKeyUp)
    }
  }

  handleKeyUp (event) {
    if (event.keyCode === 27) {
      this.close()
    }
  }

  render () {
    const {
      className,
      children,
      size,
      title,
      closeButton
    } = this.props
    const { visible } = this.state

    const classNames = classnames({
      'Modal': true,
      [`Modal_size_${size}`]: !!size
    }, className)

    return (
      visible
        ? <this.props.component className={classNames} {...excludeProps(this)}>
          <div className='Modal__overlay' onClick={::this.close} />
          <div className='Modal__container'>
            <div className='Modal__window'>
              <div className='Modal__header'>
                <h3 className='Modal__title'>{title}</h3>
                {closeButton &&
                <div className='Modal__close' onClick={::this.close} />
                }
              </div>
              <div className='Modal__content'>{children}</div>
            </div>
          </div>
        </this.props.component>
        : ''
    )
  }
}

Modal.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.func.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  size: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]).isRequired,
  title: PropTypes.any,
  closeButton: PropTypes.bool,
  onClose: PropTypes.func
}

Modal.defaultProps = {
  component: 'div',
  size: 'm',
  closeButton: true
}
