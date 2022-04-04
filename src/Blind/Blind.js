import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Progress } from '../Progress'
import { excludeProps, preventWindowScroll } from '../helpers'

export class Blind extends React.Component {
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

  render () {
    const {
      className,
      loading
    } = this.getMergedProps()
    const { visible } = this.state

    const classNames = classnames({
      'Blind': true
    }, className)

    return (
      visible
        ? <this.props.component
          className={classNames}
          {...excludeProps(this)}
        >
          <div className='Blind__overlay' onClick={() => { this.close() }} />
          <div className='Blind__window'>
            {loading
              ? <Progress className='Blind__progress' color='current' />
              : this.renderContent()
            }
          </div>
        </this.props.component>
        : ''
    )
  }
}

Blind.propTypes = {
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
  onClose: PropTypes.func
}

Blind.defaultProps = {
  component: 'div'
}
