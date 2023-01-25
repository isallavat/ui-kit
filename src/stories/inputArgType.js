const mainArgTypes = {
  size: { control: 'select',
    options: ['s', 'm', 'l'],
    table: {
      category: 'main'
    } },
  color: { control: 'select',
    options: ['default'],
    table: {
      category: 'main'
    } },
  variant: { control: 'select',
    options: ['default', 'outlined'],
    table: {
      category: 'main'
    } },
  type: { control: 'select',
    options: [ 'text', 'number', 'range' ],
    table: {
      category: 'main'
    } },
  label: { control: 'text',
    table: {
      category: 'main'
    } },
  disabled: { control: 'boolean',
    table: {
      category: 'main'
    } },
  progress: { control: 'boolean',
    table: {
      category: 'main'
    } },
  rounded: { control: 'boolean',
    table: {
      category: 'main'
    } },
  value: { control: 'text',
    table: {
      category: 'main'
    } },
  prefix: { control: 'text',
    table: {
      category: 'environment text'
    } },
  suffix: { control: 'text',
    table: {
      category: 'environment text'
    } },
  invalid: { control: 'boolean',
    table: {
      category: 'main'
    } },
  position: {
    table: {
      category: 'main'
    } }
}

const maskArgTypes = {
  mask: { control: 'text',
    table: {
      category: 'mask'
    } },
  maskChar: { control: 'text',
    table: {
      category: 'mask'
    } }
}

const othersArgTypes = {
  component: {
    table: {
      category: 'others'
    } },
  componentProps: {
    table: {
      category: 'others'
    } },
  className: {
    table: {
      category: 'others'
    } },
  defaultValue: { table: {
    category: 'others'
  } },
  roundBy: { control: 'number',
    table: {
      category: 'others'
    } },
  rangeProps: { control: 'number',
    table: {
      category: 'others'
    } }
}

const menuArgTypes = {
  menu: {
    table: {
      category: 'menu'
    } },
  filterMenu: {
    table: {
      category: 'menu'
    } }
}

const rangeArgTypes = {
  step: { control: 'number',
    table: {
      category: 'range'
    } },
  min: { control: 'number',
    table: {
      category: 'range'
    } },
  max: { control: 'number',
    table: {
      category: 'range'
    } }
}

const formatArgTypes = {
  format: { control: 'text',
    table: {
      category: 'format'
    } }
}

export { mainArgTypes, maskArgTypes, othersArgTypes, menuArgTypes, rangeArgTypes, formatArgTypes }
