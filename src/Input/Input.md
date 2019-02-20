```js
import { Input } from '../Input';
import { GridContainer, GridItem } from '../Grid';

<GridContainer spacing={16}>
  <GridItem mobile={12} tablet>
    <Input label='Default' />
  </GridItem>
  <GridItem mobile={12} tablet>
    <Input label='Disabled' disabled />
  </GridItem>
  <GridItem mobile={12} tablet>
    <Input label='Invalid' invalid />
  </GridItem>
</GridContainer>
```

```js
import { Input } from '../Input';
import { GridContainer, GridItem } from '../Grid';
import menu from './menu';

const min = new Date();
const max = new Date();
min.setYear(min.getFullYear() - 1);
max.setYear(max.getFullYear() + 1);

<GridContainer spacing={16}>
  <GridItem mobile={12} tablet>
    <Input
      type='date'
      label='Date'
      value='2019-05-10'
      min={min.getTime()}
      max={max.getTime()}
    />
  </GridItem>
  <GridItem mobile={12} tablet>
    <Input
      type='select'
      label='Select'
      menu={menu}
    />
  </GridItem>
  <GridItem mobile={12} tablet>
    <Input
      label='Suggestions'
      menu={menu}
    />
  </GridItem>
</GridContainer>
```
