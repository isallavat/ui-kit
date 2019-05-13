import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Progress } from '../Progress'
import { excludeProps } from '../helpers'
import './polyfill'

export class Camera extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.constraints = {
      audio: false,
      video: {
        facingMode: props.facingMode
      }
    }

    this.handleKeyUp = ::this.handleKeyUp
    this.handleWindowResize = ::this.handleWindowResize
    this.preventWindowScroll = ::this.preventWindowScroll
  }

  componentWillUnmount () {
    this.beforeClose()
  }

  open () {
    this.beforeOpen()

    this.init().then(() => {
      this.enumerateDevices().then((devices) => {
        const videoDevices = devices.filter((item) => item.kind === 'videoinput')
        if (videoDevices.length > 1) {
          this.setState({ rotate: true })
        }
      })
    })
  }

  close () {
    const { onClose } = this.props

    this.beforeClose()

    this.setState({
      visible: false,
      snapshot: undefined
    })

    onClose && onClose()
  }

  stop () {
    this.videoStreamTrack && this.videoStreamTrack.stop()
  }

  beforeOpen () {
    const { fullscreen } = this.props
    const root = this.refs.root

    this.opened = true

    root && root.focus()

    if (fullscreen) {
      this.pageYOffset = window.pageYOffset
      window.addEventListener('scroll', this.preventWindowScroll)
    }

    document.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('resize', this.handleWindowResize)
  }

  beforeClose () {
    this.opened = false

    this.videoStreamTrack && this.videoStreamTrack.stop()
    document.removeEventListener('keyup', this.handleKeyUp)
    window.removeEventListener('resize', this.handleWindowResize)
    window.removeEventListener('scroll', this.preventWindowScroll)
  }

  preventWindowScroll (event) {
    window.scrollTo(0, this.pageYOffset)
    event.preventDefault()
    event.returnValue = false
  }

  init () {
    this.setState({ progress: true })

    return this.initCamera()
      .then(() => {
        this.setState({ progress: false })
        this.handleInit()
      })
      .catch((err) => {
        this.setState({ progress: false })
        this.handleFail(err)
      })
  }

  initCamera () {
    return new Promise((resolve, reject) => {
      this.videoStreamTrack && this.videoStreamTrack.stop()

      this.getUserMedia(this.constraints).then((stream) => {
        this.videoStreamTrack = stream.getVideoTracks()[0]
        this.tryMaximize().then(() => {
          this.setState({ visible: true }, () => {
            const video = this.refs.video

            if ('srcObject' in video) {
              video.srcObject = stream
            } else {
              video.src = URL.createObjectURL(stream)
            }

            video.muted = true
            video.setAttribute('playsinline', '')
            video.play()

            video.onloadeddata = () => {
              if (this.opened) {
                this.setVideoDimensions()
                resolve()
              }
            }
          })
        })
      }).catch(reject)
    })
  }

  getUserMedia (constraints) {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then(resolve).catch(reject)
      } else {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia || navigator.msGetUserMedia
        navigator.getUserMedia(constraints, resolve, reject)
      }
    })
  }

  enumerateDevices () {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.enumerateDevices().then(resolve).catch(reject)
      } else {
        navigator.getUserMedia = navigator.enumerateDevices || navigator.webkitEnumerateDevices ||
          navigator.mozEnumerateDevices || navigator.msEnumerateDevices
        navigator.enumerateDevices(resolve, reject)
      }
    })
  }

  tryMaximize () {
    return new Promise((resolve, reject) => {
      resolve()
      // var capabilities = this.videoStreamTrack.getCapabilities()
      // if (capabilities) {
      //   this.videoStreamTrack.applyConstraints({
      //     advanced: [
      //       { width: capabilities.width.max, height: capabilities.height.max }
      //     ]
      //   }).then(resolve).catch(resolve)
      // } else {
      //   resolve()
      // }
    })
  }

  setVideoDimensions () {
    const root = this.refs.root
    const video = this.refs.video

    let height = root.offsetHeight
    let width = video.videoWidth * (height / video.videoHeight)

    if (width < root.offsetWidth) {
      width = root.offsetWidth
      height = video.videoHeight * (width / video.videoWidth)
    }

    video.width = width
    video.height = height
  }

  toggleCamera () {
    this.constraints.video.facingMode = this.constraints.video.facingMode === 'environment'
      ? 'user'
      : 'environment'
    this.init()
  }

  getFrameCanvas () {
    const root = this.refs.root
    const video = this.refs.video
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const left = (video.width - root.offsetWidth) / 2
    const top = (video.height - root.offsetHeight) / 2

    canvas.width = root.offsetWidth
    canvas.height = root.offsetHeight

    ctx.drawImage(video, -left, -top, video.width, video.height)

    return canvas
  }

  getSnapshotCanvas () {
    return this.getFrameCanvas()
  }

  handleInit () {}

  handleCapture () {
    const { onCapture } = this.props
    if (this.state.capturing) {
      return
    }

    this.refs.video.pause()
    this.setState({ capturing: true })

    this.getSnapshotCanvas().toBlob((blob) => {
      this.setState({
        capturing: false,
        snapshot: blob
      })

      onCapture && onCapture(blob)
    })
  }

  handleApply () {
    const { onApply } = this.props
    const { snapshot } = this.state

    onApply && onApply(snapshot)
  }

  handleReset () {
    const { onReset } = this.props

    this.refs.video.play()
    this.setState({ snapshot: undefined })

    onReset && onReset()
  }

  handleFail (err) {
    const { onFail } = this.props

    this.beforeClose()

    this.setState({ visible: false })

    onFail && onFail(err)
  }

  handleKeyUp (event) {
    const { snapshot } = this.state

    if (event.keyCode === 13 && snapshot) {
      this.handleApply()
    } else if (event.keyCode === 27 && snapshot) {
      this.handleReset()
    } else if (event.keyCode === 27) {
      this.close()
    } else if (event.keyCode === 32) {
      this.handleCapture()
    }
  }

  handleWindowResize () {
    this.setVideoDimensions()
  }

  renderLeftSide () {
    const { snapshot, rotate } = this.state

    return rotate && !snapshot && this.renderRotateControl()
  }

  renderRightSide () {
    const { snapshot } = this.state

    return snapshot
      ? <Fragment>
        {this.renderApplyControl()}
        {this.renderResetControl()}
      </Fragment>
      : this.renderCaptureControl()
  }

  renderApplyControl () {
    return (
      <div
        className='Camera__control'
        onClick={::this.handleApply}
      >
        <svg className='Camera__control-icon' xmlns='http://www.w3.org/2000/svg' width='16.502' height='12.502' viewBox='0 0 16.502 12.502'>
          <g fill='currentColor'>
            <path d='M.519,12.252a1.279,1.279,0,0,1-.3-.221L-3.626,8.183a1.281,1.281,0,0,1,0-1.809,1.281,1.281,0,0,1,1.809,0L1.251,9.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L2.183,12.128a1.278,1.278,0,0,1-1.664.124Z' transform='translate(4 0)' />
          </g>
        </svg>
      </div>
    )
  }

  renderResetControl () {
    return (
      <div
        className='Camera__control'
        onClick={::this.handleReset}
      >
        <svg className='Camera__control-icon' xmlns='http://www.w3.org/2000/svg' width='12.502' height='12.502' viewBox='0 0 12.502 12.502'>
          <g fill='currentColor'>
            <path d='M10.319,12.128,6.251,8.059,2.183,12.128A1.279,1.279,0,0,1,.374,10.319L4.443,6.251.374,2.183A1.279,1.279,0,0,1,2.183.374L6.251,4.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L8.059,6.251l4.068,4.068a1.279,1.279,0,1,1-1.808,1.808Z' transform='translate(0 0)' />
          </g>
        </svg>
      </div>
    )
  }

  renderRotateControl () {
    return (
      <div
        className='Camera__control'
        onClick={::this.toggleCamera}
      >
        <svg className='Camera__control-icon' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>
          <g fill='currentColor' transform='translate(-3 -3)'>
            <path d='M20,4H16V8h1V5.707l.646.646.218.2A8,8,0,0,1,12,20a8.113,8.113,0,0,1-1.045-.067l-.128.992A9.191,9.191,0,0,0,12,21,9,9,0,0,0,18.363,5.636L17.719,5H20V4Z' />
            <path d='M3,12a8.94,8.94,0,0,0,2.637,6.364L6.281,19H4v1H8V16H7v2.293l-.646-.646-.218-.2A8,8,0,0,1,12,4a8.113,8.113,0,0,1,1.045.067l.129-.992A9.219,9.219,0,0,0,12,3a9.01,9.01,0,0,0-9,9Z' />
          </g>
        </svg>
      </div>
    )
  }

  renderCaptureControl () {
    const { capturing } = this.state

    return (
      <div
        className={classnames({
          'Camera__control Camera__control_capture': true,
          'Camera__control_animate': capturing
        })}
        onClick={::this.handleCapture}
      />
    )
  }

  renderContent () {
    return this.props.children
  }

  render () {
    const { className, fullscreen } = this.props
    const { visible, progress } = this.state

    const classNames = classnames({
      'Camera': true,
      'Camera_fullscreen': fullscreen,
      'Camera_visible': visible
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} ref='root' tabIndex='1'>
        {visible &&
          <Fragment>
            <video className='Camera__video' ref='video' width='0' height='0' />
            {progress
              ? <Progress className='Camera__progress' color='current' />
              : visible && <Fragment>
                {this.renderContent()}
                <div className='Camera__side Camera__side_left' ref='leftSide'>
                  {this.renderLeftSide()}
                </div>
                <div className='Camera__side Camera__side_right' ref='rightSide'>
                  {this.renderRightSide()}
                </div>
              </Fragment>
            }
          </Fragment>
        }
        <div className='Camera__close' onClick={::this.close} />
      </this.props.component>
    )
  }
}

Camera.propTypes = {
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
  fullscreen: PropTypes.bool,
  facingMode: PropTypes.oneOf([
    'environment', 'user'
  ]),
  onCapture: PropTypes.func,
  onApply: PropTypes.func,
  onReset: PropTypes.func,
  onFail: PropTypes.func,
  onClose: PropTypes.func
}

Camera.defaultProps = {
  component: 'div',
  facingMode: 'environment',
  fullscreen: true
}
