import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Spin } from '../Spin'
import { excludeProps } from '../helpers'
import './polyfill'

export class Camera extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.facingModes = ['environment', 'user']
    this.constraints = {
      audio: false,
      video: {
        facingMode: this.facingModes[0]
      }
    }

    this.handleKeyUp = ::this.handleKeyUp
    this.handleWindowResize = ::this.handleWindowResize
  }

  open () {
    this.init()
    document.addEventListener('keyup', this.handleKeyUp)
    window.addEventListener('resize', this.handleWindowResize)
  }

  close () {
    const { onClose } = this.props

    this.componentWillUnmount()

    this.setState({
      visible: false,
      snapshot: undefined
    })

    onClose && onClose()
  }

  componentWillUnmount () {
    if (this.state.visible) {
      document.body.style.overflow = 'visible'
      this.videoStreamTrack && this.videoStreamTrack.stop()
      document.removeEventListener('keyup', this.handleKeyUp)
      window.removeEventListener('resize', this.handleWindowResize)
    }
  }

  init () {
    this.setState({ loading: true })

    this.initCamera()
      .then(() => {
        this.setState({ loading: false })
        document.body.style.overflow = 'hidden'
        this.successInit()
      }).catch((err) => {
        const { onFail } = this.props
        this.close()
        onFail && onFail(err)
        console.log(err.message)
      })
  }

  initCamera () {
    return new Promise((resolve, reject) => {
      this.videoStreamTrack && this.videoStreamTrack.stop()

      this.getUserMedia(this.constraints).then((stream) => {
        this.videoStreamTrack = stream.getVideoTracks()[0]
        this.setState({ visible: true })

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
          this.setVideoDimensions()
          resolve()
        }
      }).catch(reject)
    })
  }

  getUserMedia (constraints) {
    return new Promise((resolve, reject) => {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then(resolve).catch(reject)
      } else {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
        navigator.getUserMedia(constraints, resolve, reject)
      }
    })
  }

  setVideoDimensions () {
    const root = this.refs.root
    const video = this.refs.video
    const videoRatio = video.videoWidth / video.videoHeight
    let width = root.offsetWidth
    let height = width / videoRatio

    if (height > root.offsetHeight) {
      height = root.offsetHeight
      width = height * videoRatio
    }

    video.width = width
    video.height = height
  }

  toggleCamera () {
    this.constraints.video.facingMode = this.constraints.video.facingMode === this.facingModes[0]
      ? this.facingModes[1]
      : this.facingModes[0]
    this.init()
  }

  successInit () {}

  getFrameCanvas () {
    const video = this.refs.video
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = video.width
    canvas.height = video.height

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    return canvas
  }

  getSnapshotCanvas () {
    return this.getFrameCanvas()
  }

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
    this.close()
  }

  handleReset () {
    const { onReset } = this.props

    onReset && onReset()
    this.refs.video.play()
    this.setState({ snapshot: undefined })
  }

  handleKeyUp (event) {
    if (event.keyCode === 27) {
      this.close()
    }
  }

  handleWindowResize () {
    this.setVideoDimensions()
  }

  renderControls () {
    const { capturing, snapshot } = this.state

    return snapshot
      ? <div className='Camera__controls Camera__controls_right'>
        <div
          className='Camera__control Camera__control_apply'
          onClick={::this.handleApply}
        >
          <svg className='Camera__control-icon' xmlns='http://www.w3.org/2000/svg' width='16.502' height='12.502' viewBox='0 0 16.502 12.502'>
            <path id='Union_1' data-name='Union 1' d='M.519,12.252a1.279,1.279,0,0,1-.3-.221L-3.626,8.183a1.281,1.281,0,0,1,0-1.809,1.281,1.281,0,0,1,1.809,0L1.251,9.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L2.183,12.128a1.278,1.278,0,0,1-1.664.124Z' transform='translate(4 0)' fill='#fff' />
          </svg>
        </div>
        <div
          className='Camera__control Camera__control_reset'
          onClick={::this.handleReset}
        >
          <svg className='Camera__control-icon' xmlns='http://www.w3.org/2000/svg' width='12.502' height='12.502' viewBox='0 0 12.502 12.502'>
            <path id='Union_1' data-name='Union 1' d='M10.319,12.128,6.251,8.059,2.183,12.128A1.279,1.279,0,0,1,.374,10.319L4.443,6.251.374,2.183A1.279,1.279,0,0,1,2.183.374L6.251,4.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L8.059,6.251l4.068,4.068a1.279,1.279,0,1,1-1.808,1.808Z' transform='translate(0 0)' fill='#fff' />
          </svg>
        </div>
      </div>
      : <Fragment>
        <div className='Camera__controls Camera__controls_left'>
          <div
            className='Camera__control Camera__control_rotate'
            onClick={::this.toggleCamera}
          >

            <svg className='Camera__control-icon' xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 18 18'>
              <g id='icon_repeat_m_black.d4a04a3a70e81ea13648c9e22cf37227' transform='translate(-3 -3)'>
                <path id='Path_668' data-name='Path 668' d='M20,4H16V8h1V5.707l.646.646.218.2A8,8,0,0,1,12,20a8.113,8.113,0,0,1-1.045-.067l-.128.992A9.191,9.191,0,0,0,12,21,9,9,0,0,0,18.363,5.636L17.719,5H20V4Z' fill='#fff' fillRule='evenodd' />
                <path id='Path_669' data-name='Path 669' d='M3,12a8.94,8.94,0,0,0,2.637,6.364L6.281,19H4v1H8V16H7v2.293l-.646-.646-.218-.2A8,8,0,0,1,12,4a8.113,8.113,0,0,1,1.045.067l.129-.992A9.219,9.219,0,0,0,12,3a9.01,9.01,0,0,0-9,9Z' fill='#fff' fillRule='evenodd' />
              </g>
            </svg>
          </div>
        </div>
        <div className='Camera__controls Camera__controls_right'>
          <div
            className={classnames({
              'Camera__control Camera__control_capture': true,
              '-animate': capturing
            })}
            onClick={::this.handleCapture}
          />
        </div>
      </Fragment>
  }

  renderChildren () {
    return this.props.children
  }

  render () {
    const { className } = this.props
    const { visible, loading } = this.state

    const classNames = classnames({
      'Camera': true,
      '-visible': visible
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} ref='root'>
        <div className='Camera__viewport'>
          <video className='Camera__video' ref='video' width='0' height='0' />
        </div>
        {loading
          ? <Spin className='Camera__spin' />
          : <Fragment>
            {this.renderChildren()}
            {this.renderControls()}
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
    PropTypes.func.isRequired
  ]).isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
    PropTypes.array.isRequired
  ]),
  onCapture: PropTypes.func,
  onApply: PropTypes.func,
  onReset: PropTypes.func,
  onFail: PropTypes.func,
  onClose: PropTypes.func
}

Camera.defaultProps = {
  component: 'div'
}
