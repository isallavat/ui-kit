import React from 'react'

import { Switch } from '../Switch'

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    size: { control: 'select', options: ['s', 'm', 'l'] },
    children: { control: 'text' },
    color: { control: 'select', options: ['default'] },
    variant: { control: 'select', options: ['default'] },
    label: { control: 'text' },
    labelPosition: { control: 'select', options: ['start', 'end'] },
    invalid: { control: 'boolean' },
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' }
  }
}

const Template = (args) => <Switch {...args} />

export const Primary = Template.bind({})
Primary.args = {
  component: 'div',
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end',
  label: 'label'
}
