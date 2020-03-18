```js
import { Input } from '../Input';
import { GridContainer, GridItem } from '../Grid';

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
</GridContainer>
```

```js
import { Input, InputDate, InputSelect, InputArea } from '../Input';
import { GridContainer, GridItem } from '../Grid';
import menu from './menu';

const min = new Date();
const max = new Date();
min.setYear(min.getFullYear() - 1);
max.setYear(max.getFullYear() + 1);

<GridContainer spacing={16}>
  <GridItem mobile={12} tablet={6}>
    <Input
      type='number'
      label='Number'
    />
  </GridItem>
  <GridItem mobile={12} tablet={6}>
    <InputDate
      label='Date'
      min={min.getTime()}
      max={max.getTime()}
    />
  </GridItem>
  <GridItem mobile={12} tablet={6}>
    <InputSelect
      label='Select'
      menu={menu}
    />
  </GridItem>
  <GridItem mobile={12} tablet={6}>
    <Input
      label='Suggestions'
      menu={menu}
      filterMenu
    />
  </GridItem>
  <GridItem mobile={12} tablet={6}>
    <Input
      type='range'
      label='Range'
      min={0}
      max={100000}
      step={1000}
    />
  </GridItem>
  <GridItem mobile={12} tablet={6}>
    <Input
      type='number'
      label='Price'
      format='price'
    />
  </GridItem>
  <GridItem mobile={12} tablet={6}>
    <InputArea label='InputArea' />
  </GridItem>
</GridContainer>
```
