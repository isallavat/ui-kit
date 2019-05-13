import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps, formatDate } from '../helpers'

export class Progress extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    const { seconds } = this.props
    const root = this.refs.root
    const circleLength = Math.PI * (root.offsetWidth - root.offsetWidth * 0.08)

    this.setState({ circleLength })

    seconds && this.countdownSeconds()
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
  }

  setCircleLength () {
    const root = this.refs.root
    const circleLength = Math.PI * (root.offsetWidth - root.offsetWidth * 0.08)

    this.setState({ circleLength })
  }

  countdownSeconds (seconds) {
    seconds = seconds || this.props.seconds
    const date = new Date(null)
    date.setSeconds(seconds)
    const value = formatDate(date, 'mm:ss')

    this.setState({ value }, () => {
      this.timeout = setTimeout(this.countdownSeconds.bind(this, seconds - 1), 1000)
    })
  }

  render () {
    const {
      className,
      color,
      variant,
      percent
    } = this.props
    const { value, circleLength } = this.state

    const classNames = classnames({
      'Progress': true,
      [`Progress_color_${color}`]: true,
      [`Progress_variant_${variant}`]: true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} ref='root'>
        {variant === 'circle'
          ? circleLength &&
            <svg xmlns='http://www.w3.org/2000/svg'>
              <circle
                className='Progress__circle Progress__circle_1'
                fill='none' strokeWidth='4%' cx='50%' cy='50%' r='46%'
              />
              <circle
                className='Progress__circle Progress__circle_2'
                fill='none' strokeWidth='4%' cx='50%' cy='50%' r='46%'
                strokeDasharray={`${circleLength / 100 * percent},${circleLength}`}
              />
            </svg>
          : <svg xmlns='http://www.w3.org/2000/svg'>
            <rect
              className='Progress__line Progress__line_1'
              x='0' y='0' width='100%' height='100%'
            />
            <rect
              className='Progress__line Progress__line_2'
              x='0' y='0' width={percent + '%'} height='100%'
            />
          </svg>
        }
        {value && <div className='Progress__value'>{value}</div>}
      </this.props.component>
    )
  }
}

Progress.propTypes = {
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
  color: PropTypes.string.isRequired,
  variant: PropTypes.oneOf([
    'circle', 'line'
  ]).isRequired,
  seconds: PropTypes.number,
  percent: PropTypes.number
}

Progress.defaultProps = {
  component: 'div',
  color: 'default',
  variant: 'circle',
  percent: 25
}
