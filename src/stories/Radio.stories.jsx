import React from 'react'
import { Radio } from '../Radio'

export default {
  title: 'Components/Radio',
  component: Radio,
  argTypes: {
    size: { control: 'select', options: ['s', 'm', 'l'] },
    color: { control: 'select', options: ['default'] },
    variant: { control: 'select', options: ['default', 'button'] },
    label: { control: 'text' },
    labelPosition: { control: 'select', options: ['start', 'end'] },
    invalid: { control: 'boolean' },
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' }
  }
}

const Template = (args) => <Radio {...args} />

export const Primary = Template.bind({})
Primary.args = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end',
  label: 'Radio',
  invalid: false,
  checked: false
}
