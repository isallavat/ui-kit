import React from 'react'
import { Menu, MenuItem } from '../Menu'

export default {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
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

const Template = (args) => (
  <Menu {...args}>
    <MenuItem
      primary='Item 1 primary'
      secondary='Item 1 secondary'
    />
    <MenuItem
      primary='Item 2 primary'
      secondary='Item 2 secondary'
    />
    <MenuItem
      primary='Item 3 primary'
      secondary='Item 3 secondary'
    />
  </Menu>)
export const Primary = Template.bind({})
Primary.args = {
}
