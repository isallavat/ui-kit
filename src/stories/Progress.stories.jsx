import React from 'react'
import { Progress } from '../Progress'

export default {
  title: 'Components/Progress',
  component: Progress,
  argTypes: {
    color: { control: 'select', options: ['default'] },
    variant: { control: 'select', options: ['circle', 'line'] },
    animated: { control: 'boolean' },
    strokeWidth: { control: 'number' },
    seconds: { control: 'number' },
    percent: { control: 'number' }
  }
}

const Template = (args) => <Progress {...args} />

export const Primary = Template.bind({})
Primary.args = {
  component: 'div',
  color: 'default',
  variant: 'circle',
  animated: true,
  strokeWidth: 3,
  percent: 25
}
