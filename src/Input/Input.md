```js
import { Input } from '../Input';
import { GridContainer, GridItem } from '../Grid';
import menu from './menu';

<GridContainer spacing={16}>
  <GridItem mobile={12} tablet={4}>
    <Input label='Default' />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input label='Disabled' disabled />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input label='Invalid' invalid />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input
      type='text'
      label='Mask'
      mask='+7 (###) ###-##-##'
    />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input
      type='number'
      label='Number'
    />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input
      label='Suggestions'
      menu={menu}
      filterMenu
    />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input
      type='range'
      label='Range'
      min={0}
      max={100000}
      step={1000}
    />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input
      type='range'
      label='Range2'
      rangeV='rcs'
      min={3895}
      max={58633}
      step={1000}
    />
  </GridItem>
  <GridItem mobile={12} tablet={4}>
    <Input
      type='number'
      label='Price'
      format='price'
    />
  </GridItem>
</GridContainer>
```
