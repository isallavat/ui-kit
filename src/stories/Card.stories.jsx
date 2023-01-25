import React from 'react'

import { Card } from '../Card'

export default {
  title: 'Components/Card',
  component: Card,
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

const Template = (args) => <Card {...args} />

export const Primary = Template.bind({})
Primary.args = {
  title: 'card',
  children: `card content`
}
