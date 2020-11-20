import React from 'react'
import { Input } from './Input'

const iconArrow = <svg className='Input__icon Input__icon_arrow' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
  <g fill='currentColor' transform='translate(5)'>
    <path d='M-5,0H19V24H-5Z' fill='none' fillRule='evenodd' />
    <path
      d='M12.077,9,13,9.933,7,16,1,9.933,1.923,9,7,14.133Z' fill='#0b1f35' fillRule='evenodd' />
  </g>
</svg>

export class InputSelect extends Input {
  filterMenu (menu) {
    const { searchValue } = this.state

    return super.filterMenu(menu, searchValue)
  }

  handleBlur (event) {
    const { searchValue } = this.state
    if (searchValue === '') {
      const event = {
        type: 'change',
        target: this.inputEl
      }

      event.target.value = searchValue
      this.handleChange(event)
    }

    super.handleBlur(event)
    this.setState({ searchValue: undefined })
  }

  handleSearch (event) {
    const { value } = event.target

    this.setState({
      searchValue: value,
      menuSelectedItemIndex: value && this.getMenu().length ? 0 : -1,
      dropdownVisible: true
    })
  }

  handleMenuItemClick (item, index, event) {
    super.handleMenuItemClick(item, index, event)
    this.setState({ searchValue: undefined })
  }

  renderElement (props) {
    const { filterMenu } = this.props
    const { searchValue, value } = this.state
    const menu = this.getMenu()
    const selectedItem = menu.filter((item) => String(item.value) === String(value))[0]

    if (searchValue !== undefined) {
      props.value = searchValue
    } else if (selectedItem) {
      props.value = selectedItem.primary
    }

    props.readOnly = props.readOnly || !filterMenu
    props.type = 'text'
    props.onChange = ::this.handleSearch

    return super.renderElement(props)
  }
}

InputSelect.propTypes = Input.propTypes

InputSelect.defaultProps = {
  ...Input.defaultProps,
  adornment: iconArrow,
  type: 'select',
  filterMenu: true
}
