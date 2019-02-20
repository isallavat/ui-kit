```js
import { Switch } from '../Switch';
import { GridContainer, GridItem } from '../Grid';

<GridContainer spacing={16}>
  <GridItem>
    <Switch label='Default' />
  </GridItem>
  <GridItem>
    <Switch label='Disabled' disabled />
  </GridItem>
  <GridItem>
    <Switch label='Invalid' invalid />
  </GridItem>
</GridContainer>
```
