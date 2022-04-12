import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps, formatDate } from '../helpers'

export class Progress extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  componentDidMount () {
    const { seconds, strokeWidth } = this.props
    const root = this.refRoot
    const diameter = root.offsetWidth - strokeWidth * 2
    const circleLength = Math.PI * diameter

    this.setState({ diameter, circleLength })

    seconds && this.countdownSeconds()
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
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
      animated,
      percent,
      strokeWidth,
      children
    } = this.props
    const { value, diameter, circleLength } = this.state

    const classNames = classnames({
      'Progress': true,
      [`Progress_color_${color}`]: true,
      [`Progress_variant_${variant}`]: true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)} ref={(ref) => { this.refRoot = ref }}>
        {variant === 'circle' && !!circleLength &&
          <svg
            className={classnames({
              '--animated': animated
            })}
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle
              className='Progress__circle Progress__circle_1'
              fill='none' strokeWidth={strokeWidth} cx='50%' cy='50%' r={diameter / 2}
            />
            <circle
              className='Progress__circle Progress__circle_2'
              fill='none' strokeWidth={strokeWidth} cx='50%' cy='50%' r={diameter / 2}
              strokeDasharray={`${circleLength / 100 * percent},${circleLength}`}
            />
          </svg>
        }
        {variant === 'line' &&
          <Fragment>
            <div
              className='Progress__line Progress__line_1'
              style={{ width: '100%' }}
            />
            <div
              className={classnames({
                'Progress__line Progress__line_2': true,
                '--animated': animated
              })}
              style={{ width: percent + '%' }}
            />
          </Fragment>
        }
        {!!value && <div className='Progress__value'>{value}</div>}
        {children}
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
  animated: PropTypes.bool,
  strokeWidth: PropTypes.number,
  seconds: PropTypes.number,
  percent: PropTypes.number
}

Progress.defaultProps = {
  component: 'div',
  color: 'default',
  variant: 'circle',
  animated: true,
  strokeWidth: 3,
  percent: 25
}
