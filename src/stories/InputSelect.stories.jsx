import React from 'react'
import menu from '../Input/menu.json'
import { InputSelect } from '../Input'
import { formatArgTypes, mainArgTypes, maskArgTypes, menuArgTypes, othersArgTypes, rangeArgTypes } from './inputArgType'

export default {
  title: 'Components/InputSelect',
  component: InputSelect,
  argTypes: {
    ...mainArgTypes,
    ...maskArgTypes,
    ...othersArgTypes,
    ...menuArgTypes,
    ...rangeArgTypes,
    ...formatArgTypes
  }
}

const Template = (args) => <InputSelect {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'select',
  menu: menu
}
