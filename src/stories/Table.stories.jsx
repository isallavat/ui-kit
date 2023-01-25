import React from 'react'

import { Table, TableRow, TableCell } from '../Table'

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {

  }
}

const Template = (args) => <Table {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: [
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>,
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>,
    <TableRow>
      <TableCell>Cell 1</TableCell>
      <TableCell>Cell 2</TableCell>
      <TableCell>Cell 3</TableCell>
    </TableRow>]
}
