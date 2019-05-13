import React, { Fragment } from 'react'
import classnames from 'classnames'
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
    super.handleBlur(event)
    this.setState({ searchValue: '' })
  }

  handleSearch (event) {
    const { value } = event.target

    this.setState({
      searchValue: value,
      menuSeletedItemIndex: value && this.getMenu().length ? 0 : -1,
      dropdownVisible: true
    })
  }

  handleMenuItemClick (item, index, event) {
    super.handleMenuItemClick(item, index, event)
    this.setState({ searchValue: '' })
  }

  renderElement (props) {
    const { searchValue = '', value } = this.state
    const menu = this.getMenu()
    const selectedItem = menu.filter((item) => item.value === value)[0]

    props.type = 'text'
    props.value = searchValue
    props.onChange = ::this.handleSearch

    return (
      <Fragment>
        {!searchValue && selectedItem &&
          <div
            className={classnames(
              props.className,
              'Input__element_fake'
            )}
          >
            {selectedItem.primary}
          </div>
        }
        {super.renderElement(props)}
      </Fragment>
    )
  }
}

InputSelect.propTypes = Input.propTypes

InputSelect.defaultProps = {
  ...Input.defaultProps,
  adornment: iconArrow,
  type: 'select',
  filterMenu: true
}
