import React from 'react'

import { Input } from '../Input'
import menu from '../Input/menu.json'
import { mainArgTypes, maskArgTypes, othersArgTypes, menuArgTypes, formatArgTypes, rangeArgTypes } from './inputArgType'

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    ...mainArgTypes,
    ...maskArgTypes,
    ...othersArgTypes,
    ...menuArgTypes,
    ...rangeArgTypes,
    ...formatArgTypes
  }
}

const Template = (args) => <div style={{ height: 250, width: 300 }}><Input {...args} /></div>

export const text = Template.bind({})
text.args = {
  type: 'text',
  size: 'm',
  color: 'default',
  variant: 'default',
  label: 'label',
  disabled: false,
  progress: false,
  rounded: false,
  invalid: false
}

export const Range = Template.bind({})
Range.args = {
  type: 'range',
  label: 'Range',
  min: 0,
  max: 100000,
  step: 1000
}

export const withMask = Template.bind({})
withMask.args = {
  mask: '+7 (###) ###-##-##',
  type: 'number',
  size: 'm',
  color: 'default',
  variant: 'default',
  label: 'mask',
  disabled: false,
  progress: false,
  rounded: false,
  invalid: false
}

export const Menu = Template.bind({})
Menu.args = {
  label: 'Suggestions',
  menu: menu,
  filterMenu: true
}

export const Price = Template.bind({})
Price.args = {
  type: 'number',
  label: 'Price',
  format: 'price'
}
