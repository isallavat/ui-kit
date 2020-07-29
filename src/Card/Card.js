import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

export class Card extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  toggle (collapsed) {
    this.setState({ collapsed })
  }

  render () {
    const { className, title } = this.props
    const { collapsed } = this.state

    const classNames = classnames({
      'Card': true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        {!!title &&
          <div className={classnames({
            'Card__header': true,
            '--collapsed': collapsed
          })}>
            <span className='Card__title'>{title}</span>
            <span
              className={classnames({
                'Card__switcher': true,
                '--collapsed': collapsed
              })}
              onClick={this.toggle.bind(this, !collapsed)}
            >
              <svg className='Card__switcher-icon' width='64px' height='64px' viewBox='0 0 64 64' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                <title>acute-angle</title>
                <desc>Created with Sketch.</desc>
                <g id='acute-angle' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                  <g id='Arrow-2' transform='translate(12.000000, 0.000000)' fill='currentColor'>
                    <path d='M1.76667803,28.8463909 C0.945602951,29.6360244 0.481590525,30.7260393 0.481590525,31.8651992 C0.481590525,33.0043592 0.945602951,34.0943741 1.76667803,34.8840076 L32.3132587,62.2522049 C34.0988202,63.7894038 36.7401905,63.7894038 38.525752,62.2522049 C39.341081,61.5586057 39.8109015,60.5421057 39.8109015,59.471666 C39.8109015,58.4012263 39.341081,57.3847264 38.525752,56.6911271 L10.9039835,31.9635674 L38.5170082,7.19666034 C39.3323371,6.5030611 39.8021577,5.48656115 39.8021577,4.41612144 C39.8021577,3.34568174 39.3323371,2.32918178 38.5170082,1.63558254 C36.7314466,0.0983837132 34.0900764,0.0983837132 32.3045148,1.63558254 L1.76667803,28.8463909 Z' id='Arrow' />
                  </g>
                </g>
              </svg>
            </span>
          </div>
        }
        <div className={classnames({
          'Card__content': true,
          '--hidden': collapsed
        })}>
          {this.props.children}
        </div>
      </this.props.component>
    )
  }
}

Card.propTypes = {
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
  title: PropTypes.string
}

Card.defaultProps = {
  component: 'div'
}
