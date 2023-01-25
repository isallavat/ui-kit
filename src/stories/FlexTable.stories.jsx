import React from 'react'

import { FlexTable, FlexTableCell, FlexTableRow } from '../FlexTable'

export default {
  title: 'Components/FlexTable',
  component: FlexTable,
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
  <FlexTable {...args}>
    <FlexTableRow>
      <FlexTableCell>Row 1 Cell 1</FlexTableCell>
      <FlexTableCell>Row 1 Cell 2</FlexTableCell>
      <FlexTableCell>Row 1 Cell 3</FlexTableCell>
    </FlexTableRow>
    <FlexTableRow>
      <FlexTableCell>Row 2 Cell 1</FlexTableCell>
      <FlexTableCell>Row 2 Cell 2</FlexTableCell>
      <FlexTableCell>Row 2 Cell 3</FlexTableCell>
    </FlexTableRow>
    <FlexTableRow>
      <FlexTableCell>Row 3 Cell 1</FlexTableCell>
      <FlexTableCell>Row 3 Cell 2</FlexTableCell>
      <FlexTableCell>Row 3 Cell 3</FlexTableCell>
    </FlexTableRow> </FlexTable>)

export const Primary = Template.bind({})
Primary.args = {

}
