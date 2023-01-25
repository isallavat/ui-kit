import React from 'react'

import { Button } from '../Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: { control: 'select', options: ['s', 'm', 'l'] },
    children: { control: 'text' },
    color: { control: 'select', options: ['default'] },
    align: { control: 'select', options: ['left', 'right', 'center', 'justify'] },
    rounded: { control: 'boolean' },
    circular: { control: 'boolean' },
    noresize: { control: 'boolean' },
    progress: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    disabled: { control: 'boolean' },
    component: {
      table: {
        category: 'others'
      } },
    className: {
      table: {
        category: 'others'
      } }
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  size: 'm',
  children: 'button',
  color: 'default',
  rounded: false,
  circular: false,
  noresize: false,
  progress: false,
  align: 'center',
  fullWidth: false,
  disabled: false
}
