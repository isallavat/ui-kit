```js
import { InputSelect } from '../Input';
import { GridContainer, GridItem } from '../Grid';
import menu from './menu';

<GridContainer spacing={16}>
  <GridItem mobile={12} tablet={6}>
    <InputSelect
      label='Select'
      menu={menu}
    />
  </GridItem>
</GridContainer>
```
