import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Progress } from '../Progress'
import { Button } from '../Button'
import { excludeProps, preventWindowScroll } from '../helpers'

export class Modal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.handleKeyUp = ::this.handleKeyUp
  }

  componentWillUnmount () {
    if (this.state.visible) {
      this.close()
    }
  }

  open (props) {
    this._props = props
    this.setState({ visible: true })
    preventWindowScroll(true)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  close () {
    const { onClose } = this.getMergedProps()
    this.setState({ visible: false })
    preventWindowScroll(false)
    document.removeEventListener('keyup', this.handleKeyUp)

    onClose && onClose()
  }

  update (props) {
    const { visible } = this.state

    if (visible) {
      this._props = props
      this.forceUpdate()
    }
  }

  getMergedProps () {
    return { ...this.props, ...this._props }
  }

  handleKeyUp (event) {
    if (event.keyCode === 27) {
      this.close()
    }
  }

  renderContent () {
    return this.getMergedProps().children
  }

  renderOkButton () {
    return (
      <Button
        className='Modal__ok'
        size='s'
        rounded
        onClick={::this.close}
      >
        OK
      </Button>
    )
  }

  renderClose () {
    const { closeButtonPosition } = this.props

    return (
      <div
        className={classnames({
          'Modal__close': true,
          [`Modal__close_${closeButtonPosition}`]: true
        })}
        onClick={::this.close}
      />
    )
  }

  render () {
    const {
      className,
      size,
      image,
      title,
      type,
      okButton,
      closeButtonPosition,
      canClose,
      loading
    } = this.getMergedProps()
    const { visible } = this.state
    const _size = type === 'alert' ? 's' : size

    const classNames = classnames({
      'Modal': true,
      [`Modal_${type}`]: true
    }, className)

    return (
      visible
        ? <this.props.component
          className={classNames}
          {...excludeProps(this)}
        >
          <div className='Modal__container'>
            <div className='Modal__overlay' onClick={() => { canClose && this.close() }} />
            {loading
              ? <Progress className='Modal__progress' color='current' />
              : <div
                className={classnames({
                  'Modal__window': true,
                  [`Modal__window_size_${_size}`]: true
                })}
                ref={(ref) => { this.refWindow = ref }}
              >
                {image && <img className='Modal__image' src={image} alt='' />}
                {!!title && <div className='Modal__title'>{title}</div>}
                <div className='Modal__content'>{this.renderContent()}</div>
                {type === 'alert' &&
                  <div className='Modal__footer'>
                    {okButton || this.renderOkButton()}
                  </div>
                }
                {closeButtonPosition === 'inside' && canClose && this.renderClose()}
              </div>
            }
            {closeButtonPosition === 'outside' && canClose && this.renderClose()}
          </div>
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
  image: PropTypes.string,
  title: PropTypes.any,
  okButton: PropTypes.any,
  type: PropTypes.oneOf([
    'default', 'alert'
  ]).isRequired,
  closeButtonPosition: PropTypes.oneOf([
    'inside', 'outside', false
  ]),
  canClose: PropTypes.bool.isRequired,
  onClose: PropTypes.func
}

Modal.defaultProps = {
  component: 'div',
  type: 'default',
  size: 'm',
  closeButtonPosition: 'inside',
  canClose: true
}
