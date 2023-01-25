import React from 'react'

import { InputDate } from '../Input'
import { formatArgTypes, mainArgTypes, maskArgTypes, menuArgTypes, othersArgTypes, rangeArgTypes } from './inputArgType'

export default {
  title: 'Components/InputDate',
  component: InputDate,
  argTypes: {
    ...mainArgTypes,
    ...maskArgTypes,
    ...othersArgTypes,
    ...menuArgTypes,
    ...rangeArgTypes,
    ...formatArgTypes
  }
}

const Template = (args) => <div style={{ height: 400, width: 300 }}><InputDate {...args} /> </div>

export const Primary = Template.bind({})
Primary.args = {
  type: 'date',
  size: 'm',
  color: 'default',
  variant: 'default',
  label: 'label',
  disabled: false,
  progress: false,
  rounded: false
}
