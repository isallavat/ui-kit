import React from 'react'
import { Calendar } from '../Calendar'
import { Input } from './Input'

const iconCalendar = <svg className='Input__icon Input__icon_calendar' xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'>
  <g fill='currentColor'>
    <rect width='30' height='30' fill='none' />
    <path d='M8.25,1A1.25,1.25,0,0,0,7,2.25V4.125H4.5A2.5,2.5,0,0,0,2,6.625v18.75a2.5,2.5,0,0,0,2.5,2.5h20a2.5,2.5,0,0,0,2.5-2.5V6.625a2.5,2.5,0,0,0-2.5-2.5H22V2.25a1.25,1.25,0,1,0-2.5,0V4.125H9.5V2.25A1.25,1.25,0,0,0,8.25,1ZM19.5,5.375V6A1.25,1.25,0,1,0,22,6V5.375h2.5a1.25,1.25,0,0,1,1.25,1.25v18.75a1.25,1.25,0,0,1-1.25,1.25H4.5a1.251,1.251,0,0,1-1.25-1.25V6.625A1.251,1.251,0,0,1,4.5,5.375H7V6A1.25,1.25,0,1,0,9.5,6V5.375Z' transform='translate(0.501 0.25)' />
    <path d='M5,9h5v2.5H5Zm6.249,0h5v2.5h-5ZM5,15.251h5v2.5H5Zm6.249,0h5v2.5h-5ZM17.5,9h5v2.5h-5Z' transform='translate(1.251 2.249)' />
  </g>
</svg>

export class InputDate extends Input {
  formatDate (date, format) {
    return format
      .replace('YYYY', date.getFullYear())
      .replace('MM', ('0' + (date.getMonth() + 1)).slice(-2))
      .replace('DD', ('0' + date.getDate()).slice(-2))
  }

  valueToDate (value) {
    const { format } = this.props
    const year = value.substr(format.indexOf('YYYY'), 4) * 1
    const month = value.substr(format.indexOf('MM'), 2) * 1 - 1
    const day = value.substr(format.indexOf('DD'), 2) * 1

    if (year && month && day) {
      return new Date(year, month, day)
    }
  }

  handleCalendarChange (value) {
    const { format } = this.props
    const date = new Date(value)
    const event = { target: this.inputEl }
    event.target.value = this.formatDate(date, format)

    this.handleChange(event)
  }

  renderElement (props) {
    const { min, max, format } = this.props
    const { value } = this.state
    const date = this.valueToDate(value)

    props.type = 'text'
    props.mask = format
      .replace('DD', '99')
      .replace('MM', '99')
      .replace('YYYY', '9999')

    return (
      <div>
        {super.renderElement(props)}
        {this.renderDropdown(
          <Calendar
            value={date ? date.toISOString() : ''}
            min={min}
            max={max}
            onChange={::this.handleCalendarChange}
          />
        )}
      </div>
    )
  }
}

InputDate.propTypes = Input.propTypes

InputDate.defaultProps = {
  ...Input.defaultProps,
  type: 'date',
  adornment: iconCalendar,
  format: 'DD.MM.YYYY'
}
