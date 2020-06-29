```js
import { InputDate } from '../Input';
import { GridContainer, GridItem } from '../Grid';

const min = new Date();
const max = new Date();
min.setYear(min.getFullYear() - 1);
max.setYear(max.getFullYear() + 1);

<GridContainer spacing={16}>
  <GridItem mobile={12} tablet={6}>
    <InputDate
      label='Date'
      min={min.getTime()}
      max={max.getTime()}
    />
  </GridItem>
</GridContainer>
```
