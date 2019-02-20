```js
import { CheckBox } from '../CheckBox';
import { GridContainer, GridItem } from '../Grid';

<GridContainer spacing={16}>
  <GridItem>
    <CheckBox label='Default' />
  </GridItem>
  <GridItem>
    <CheckBox label='Disabled' disabled />
  </GridItem>
  <GridItem>
    <CheckBox label='Invalid' invalid />
  </GridItem>
</GridContainer>
```
