import React from 'react'

import { InputArea } from '../Input'
import { mainArgTypes, maskArgTypes, othersArgTypes, menuArgTypes, formatArgTypes, rangeArgTypes } from './inputArgType'

export default {
  title: 'Components/InputArea',
  component: InputArea,
  argTypes: {
    ...mainArgTypes,
    ...maskArgTypes,
    ...othersArgTypes,
    ...menuArgTypes,
    ...rangeArgTypes,
    ...formatArgTypes
  }
}

const Template = (args) => <InputArea {...args} />

export const Primary = Template.bind({})
Primary.args = {
  size: 'm',
  color: 'default',
  variant: 'default',
  label: 'label',
  disabled: false,
  progress: false,
  rounded: false
}
