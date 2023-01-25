import React from 'react'

import { Tooltip } from '../Tooltip'

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    position: { control: 'select', options: ['top', 'left', 'right', 'bottom'] },
    tooltip: { control: 'text' }
  }
}

const Template = (args) => <Tooltip {...args} />

export const Primary = Template.bind({})
Primary.args = {
  component: 'div',
  position: 'top',
  tooltip: 'подсказка',
  children: <span> текст с подсказкой </span>
}
