```js
import { CheckBox } from '../CheckBox';
import { GridContainer, GridItem } from '../Grid';

<GridContainer valign='center' spacing={16}>
  <GridItem>
    <CheckBox label='Default' />
  </GridItem>
  <GridItem>
    <CheckBox label='Disabled' disabled />
  </GridItem>
  <GridItem>
    <CheckBox label='Invalid' invalid />
  </GridItem>
  <GridItem>
    <CheckBox label='Button' variant='button' />
  </GridItem>
</GridContainer>
```
