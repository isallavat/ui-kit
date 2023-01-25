import React from 'react'

import { Calendar } from '../Calendar'

export default {
  title: 'Components/Calendar',
  component: Calendar,
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

const Template = (args) => <Calendar {...args} />

export const Primary = Template.bind({})
