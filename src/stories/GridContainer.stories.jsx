import React from 'react'

import { GridContainer, GridItem } from '../Grid'

const style = {
  height: 30,
  background: '#398DFA',
  marginBottom: 10
}

export default {
  title: 'Components/GridContainer',
  component: GridContainer,
  argTypes: {
    GridContainer: { control: 'select',
      options: ['top', 'center', 'bottom'],
      table: {
        category: 'Container'
      } },
    valign: { control: 'select',
      options: ['top', 'center', 'bottom'],
      table: {
        category: 'Container'
      } },
    align: { control: 'select',
      options: ['left', 'center', 'right', 'around', 'between'],
      table: {
        category: 'Container'
      } },
    spacing: { control: 'number',
      table: {
        category: 'Container'
      } },
    component: {
      table: {
        category: 'others'
      } },
    className: {
      table: {
        category: 'others'
      } },
    full: {
      control: 'boolean',
      table: {
        category: 'children'
      } },
    mobile: {
      control: 'number',
      table: {
        category: 'children'
      } },
    tablet: {
      control: 'number',
      table: {
        category: 'children'
      } },
    desktop: {
      control: 'number',
      table: {
        category: 'children'
      } }
  }
}

const Template = (args) => (
  <GridContainer {...args}>
    <GridItem full={args.full} mobile={args.mobile} desktop={args.desktop} tablet={args.desktop}>
      <div style={style} />
    </GridItem>
    <GridItem full={args.full} mobile={args.mobile} desktop={args.desktop} tablet={args.desktop}>
      <div style={style} />
    </GridItem>
    <GridItem full={args.full} mobile={args.mobile} desktop={args.desktop} tablet={args.desktop}>
      <div style={style} />
    </GridItem>
  </GridContainer>)

export const Primary = Template.bind({})
Primary.args = {
  GridContainer: 'center',
  align: 'center',
  spacing: 20,
  mobile: 4
}
