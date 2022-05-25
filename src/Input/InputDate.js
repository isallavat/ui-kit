import React, { Fragment } from 'react'
import { Calendar } from '../Calendar'
import { Input } from './Input'
import { formatDate } from '../helpers'

const iconCalendar = <svg className='Input__icon Input__icon_calendar' xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
  <g fill='currentColor'>
    <rect width='30' height='30' fill='none' />
    <path d='M8.25,1A1.25,1.25,0,0,0,7,2.25V4.125H4.5A2.5,2.5,0,0,0,2,6.625v18.75a2.5,2.5,0,0,0,2.5,2.5h20a2.5,2.5,0,0,0,2.5-2.5V6.625a2.5,2.5,0,0,0-2.5-2.5H22V2.25a1.25,1.25,0,1,0-2.5,0V4.125H9.5V2.25A1.25,1.25,0,0,0,8.25,1ZM19.5,5.375V6A1.25,1.25,0,1,0,22,6V5.375h2.5a1.25,1.25,0,0,1,1.25,1.25v18.75a1.25,1.25,0,0,1-1.25,1.25H4.5a1.251,1.251,0,0,1-1.25-1.25V6.625A1.251,1.251,0,0,1,4.5,5.375H7V6A1.25,1.25,0,1,0,9.5,6V5.375Z' transform='translate(0.501 0.25)' />
    <path d='M5,9h5v2.5H5Zm6.249,0h5v2.5h-5ZM5,15.251h5v2.5H5Zm6.249,0h5v2.5h-5ZM17.5,9h5v2.5h-5Z' transform='translate(1.251 2.249)' />
  </g>
</svg>

export class InputDate extends Input {
  valueToDate (value) {
    const { format } = this.props
    const year = value.substr(format.indexOf('YYYY'), 4) * 1
    const month = value.substr(format.indexOf('MM'), 2) * 1 - 1
    const day = value.substr(format.indexOf('DD'), 2) * 1
    const hours = value.substr(format.indexOf('HH'), 2) * 1
    const minutes = value.substr(format.indexOf('mm'), 2) * 1
    const seconds = value.substr(format.indexOf('ss'), 2) * 1
    const milliseconds = value.substr(format.indexOf('sss'), 3) * 1

    if (year && month && day) {
      return new Date(year, month, day, hours, minutes, seconds, milliseconds)
    }
  }

  handleCalendarChange (value) {
    const { format } = this.props
    const date = new Date(value)
    const event = { target: this.inputEl }
    event.target.value = formatDate(date, format)

    this.handleChange(event)
  }

  handleBlur (event) {
    const { readOnly } = this.props

    if (readOnly) {
      return false
    }

    if (this.dropDownMouseDown) {
      this.inputEl.focus()
      this.dropDownMouseDown = false
    } else {
      super.handleBlur(event)
    }
  }

  renderElement (props) {
    const { min, max, format } = this.props
    const { value } = this.state
    const date = this.valueToDate(value)

    props.type = 'text'
    props.mask = format
      .replace('YYYY', '####')
      .replace('MM', '##')
      .replace('DD', '##')
      .replace('HH', '##')
      .replace('mm', '##')
      .replace('ss', '##')
      .replace('sss', '###')

    return (
      <Fragment>
        {super.renderElement(props)}
        <div onMouseDown={() => { this.dropDownMouseDown = true }}>
          {this.renderDropdown(
            <Calendar
              value={date && String(date) !== 'Invalid Date' ? date.toISOString() : ''}
              min={min}
              max={max}
              onChange={::this.handleCalendarChange}
            />
          )}
        </div>
      </Fragment>
    )
  }
}

InputDate.propTypes = Input.propTypes

InputDate.defaultProps = {
  ...Input.defaultProps,
  type: 'date',
  suffix: iconCalendar,
  format: 'DD.MM.YYYY'
}
