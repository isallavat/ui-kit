import React from 'react'
import { OutsideClickHandler } from '../OutsideClickHandler'

export default {
  title: 'Components/OutsideClickHandler',
  component: OutsideClickHandler,
  argTypes: {

  }
}

const Template = (args) => <OutsideClickHandler {...args} />

export const Primary = Template.bind({})
Primary.args = {

}
