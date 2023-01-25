import React from 'react'

import { CheckBox } from '../CheckBox'

export default {
  title: 'Components/CheckBox',
  component: CheckBox,
  argTypes: {
    size: { control: 'select', options: ['s', 'm', 'l'] },
    variant: { control: 'select', options: ['default', 'button'] },
    labelPosition: { control: 'select', options: ['start', 'end'] },
    label: { control: 'text' },
    checked: { control: 'boolean' },
    invalid: { control: 'boolean' },
    component: {
      table: {
        category: 'others'
      } },
    componentProps: {
      table: {
        category: 'others'
      } },
    className: {
      table: {
        category: 'others'
      } },
    defaultChecked: { control: 'boolean',
      table: {
        category: 'not works'
      } }
  }
}

const Template = (args) => <CheckBox {...args} />

export const Primary = Template.bind({})
Primary.args = {
  size: 'm',
  color: 'default',
  variant: 'default',
  labelPosition: 'end',
  invalid: false,
  checked: false,
  label: 'checkbox'
}
