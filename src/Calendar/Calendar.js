import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { excludeProps } from '../helpers'

const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]
const WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

function getValueProps (props) {
  let value
  const now = new Date()

  if (props.value) {
    value = props.value
  } else if (props.max && new Date(props.max) < now) {
    value = new Date(props.max).toISOString()
  } else if (props.min && new Date(props.min) > now) {
    value = new Date(props.min).toISOString()
  } else {
    value = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  }

  return value
}

export class Calendar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      value: props.value,
      currentValue: getValueProps(props),
      cellType: 'day'
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if ([prevState.value, prevState.propsValue].indexOf(nextProps.value) < 0) {
      return {
        value: nextProps.value,
        currentValue: getValueProps(nextProps),
        propsValue: nextProps.value
      }
    }

    return null
  }

  getHeaderTitle () {
    const { currentValue, cellType } = this.state
    const date = new Date(currentValue)

    if (cellType === 'day') {
      return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
    } else if (cellType === 'month') {
      return date.getFullYear()
    }
  }

  getCells () {
    const { cellType } = this.state

    if (cellType === 'day') {
      return this.createDays()
    } else if (cellType === 'month') {
      return this.createMonths()
    } else if (cellType === 'year') {
      return this.createYears()
    }
  }

  createDays () {
    const { currentValue } = this.state
    const date = new Date(currentValue)
    const cells = {}
    date.setDate(1)
    const firstWeekDay = date.getDay() || 7
    date.setMonth(date.getMonth() + 1)
    date.setDate(0)
    const lastWeekDay = date.getDay()
    let count = date.getDate()
    count += firstWeekDay
    count += 7 - (lastWeekDay || 7)
    date.setDate(1 - firstWeekDay)

    for (let i = 0; i < count - 1; i++) {
      date.setDate(date.getDate() + 1)
      cells[date.toISOString()] = date.getDate()
    }

    return cells
  }

  createMonths () {
    const cells = {}

    for (let i = 0; i < 12; i++) {
      cells[i] = MONTHS[i].substr(0, 3)
    }

    return cells
  }

  createYears () {
    const { min, max } = this.props
    const now = new Date()
    const minDate = new Date(min)
    const maxDate = new Date(max)
    const minYear = minDate.getFullYear() || now.getFullYear() - 100
    const maxYear = maxDate.getFullYear() || now.getFullYear() + 100
    const cells = {}

    for (let i = maxYear; i >= minYear; i--) {
      cells[i] = i
    }

    return cells
  }

  isCellDisabled (cellValue) {
    const { min, max } = this.props
    const { currentValue, cellType } = this.state
    const minDate = new Date(min)
    const maxDate = new Date(max)

    if (cellType === 'day') {
      const date = new Date(cellValue)
      return date > maxDate || date < minDate
    } else if (cellType === 'month') {
      const date = new Date(currentValue)
      date.setMonth(cellValue)
      date.setDate(1)
      if (date > maxDate) {
        return true
      }
      date.setMonth(date.getMonth() + 1)
      date.setDate(-1)
      if (date < minDate) {
        return true
      }
    }
  }

  isCellOverrange (cellValue) {
    const { currentValue, cellType } = this.state
    const date = new Date(currentValue)
    const cellDate = new Date(cellValue)

    if (cellType === 'day') {
      return cellDate.getMonth() !== date.getMonth()
    }
  }

  isCellSelected (cellValue) {
    const { value } = this.state
    return String(cellValue) === String(value)
  }

  handleHeaderTitleClick () {
    const { cellType } = this.state

    if (cellType === 'day') {
      this.setState({ cellType: 'month' })
    } else if (cellType === 'month') {
      this.setState({ cellType: 'year' })
    }
  }

  handleHeaderStepClick (step) {
    const { min, max } = this.props
    const { currentValue, cellType } = this.state
    const date = new Date(currentValue)
    const minDate = new Date(min)
    const maxDate = new Date(max)

    if (cellType === 'day') {
      if (step > 0) {
        date.setMonth(date.getMonth() + step)
        date.setDate(1)
      } else {
        date.setDate(-1)
      }
    } else if (cellType === 'month') {
      if (step > 0) {
        date.setFullYear(date.getFullYear() + step)
        date.setMonth(0)
      } else {
        date.setMonth(-1)
      }
    }

    if (date > maxDate || date < minDate) {
      return
    }

    this.setState({ currentValue: date.toISOString() })
  }

  handleCellSelect (cellValue) {
    const { currentValue, cellType } = this.state
    let date = new Date(currentValue)
    const state = {}

    if (cellType === 'day') {
      date = new Date(cellValue)
    } else if (cellType === 'month') {
      date.setMonth(cellValue)
      state.cellType = 'day'
    } else if (cellType === 'year') {
      date.setFullYear(cellValue)
      state.cellType = 'month'
    }

    state.currentValue = date.toISOString()

    this.setState(state)

    if (cellType === 'day') {
      this.handleChange(state.currentValue)
    }
  }

  handleChange (value) {
    const { onChange } = this.props

    this.setState({ value, currentValue: value })

    onChange && onChange(value)
  }

  renderHeader () {
    return (
      <div className='Calendar__cells Calendar__cells_header'>
        <div className='Calendar__cell'>
          <button
            className='Calendar__cell-button'
            type='button'
            tabIndex='-1'
            onClick={this.handleHeaderStepClick.bind(this, -1)}
          >
            &lt;
          </button>
        </div>
        <div className='Calendar__cell'>
          <button
            className='Calendar__cell-button'
            type='button'
            tabIndex='-1'
            onClick={::this.handleHeaderTitleClick}
          >
            {this.getHeaderTitle()}
          </button>
        </div>
        <div className='Calendar__cell'>
          <button
            className='Calendar__cell-button'
            type='button'
            tabIndex='-1'
            onClick={this.handleHeaderStepClick.bind(this, 1)}
          >
            &gt;
          </button>
        </div>
      </div>
    )
  }

  renderWeekDays () {
    return (
      <div className='Calendar__cells Calendar__cells_weekdays'>
        {WEEKDAYS.map((item, index) =>
          <div className={classnames({
            Calendar__cell: true,
            Calendar__cell_type_weekday: true
          })} key={index}
          >
            {item}
          </div>
        )}
      </div>
    )
  }

  renderCells () {
    const { cellType } = this.state
    const cells = this.getCells()
    let cellsKeys = Object.keys(cells)

    if (cellType === 'year') {
      cellsKeys = cellsKeys.reverse()
    }

    return (
      <div className='Calendar__cells'>
        {cellsKeys.map((key, index) =>
          <div
            className={classnames({
              Calendar__cell: true,
              [`Calendar__cell_type_${cellType}`]: true
            })}
            key={index}
          >
            <button
              className={classnames({
                'Calendar__cell-button': true,
                'Calendar__cell-button_light': this.isCellOverrange(key),
                '--selected': this.isCellSelected(key) && !this.isCellDisabled(key),
                '--disabled': this.isCellDisabled(key)
              })}
              type='button'
              tabIndex='-1'
              disabled={this.isCellDisabled(key)}
              onClick={this.handleCellSelect.bind(this, key)}
            >
              {cells[key]}
            </button>
          </div>
        )}
      </div>
    )
  }

  renderTime () {
    const { currentValue } = this.state
    const date = new Date(currentValue)
    const arr24 = new Array(24).fill(null)
    const arr60 = new Array(60).fill(null)
    const arr1000 = new Array(1000).fill(null)

    return (
      <div className='Calendar__time'>
        <select
          value={date.getHours()}
          onChange={(event) => {
            date.setHours(+event.target.value)
            this.handleChange(date.toISOString())
          }}
        >
          {arr24.map((item, index) =>
            <option value={index} key={index}>{('0' + index).slice(-2)}</option>
          )}
        </select>
        <select
          value={date.getMinutes()}
          onChange={(event) => {
            date.setMinutes(+event.target.value)
            this.handleChange(date.toISOString())
          }}
        >
          {arr60.map((item, index) =>
            <option value={index} key={index}>{('0' + index).slice(-2)}</option>
          )}
        </select>
        <select
          value={date.getSeconds()}
          onChange={(event) => {
            date.setSeconds(+event.target.value)
            this.handleChange(date.toISOString())
          }}
        >
          {arr60.map((item, index) =>
            <option value={index} key={index}>{('0' + index).slice(-2)}</option>
          )}
        </select>
        <select
          value={date.getMilliseconds()}
          onChange={(event) => {
            date.setMilliseconds(+event.target.value)
            this.handleChange(date.toISOString())
          }}
        >
          {arr1000.map((item, index) =>
            <option value={index} key={index}>{('00' + index).slice(-3)}</option>
          )}
        </select>
      </div>
    )
  }

  render () {
    const { className } = this.props
    const { cellType } = this.state

    const classNames = classnames({
      Calendar: true
    }, className)

    return (
      <this.props.component className={classNames} {...excludeProps(this)}>
        {this.getHeaderTitle() && this.renderHeader()}
        {cellType === 'day' && this.renderWeekDays()}
        {this.renderCells()}
        {this.renderTime()}
      </this.props.component>
    )
  }
}

Calendar.propTypes = {
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
  value: PropTypes.string,
  min: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  max: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]),
  locale: PropTypes.string,
  onChange: PropTypes.func
}

Calendar.defaultProps = {
  component: 'div',
  locale: 'ru'
}
