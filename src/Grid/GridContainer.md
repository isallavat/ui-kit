```js
import { GridContainer, GridItem } from '../Grid';

const style = {
  height: 30,
  background: '#398DFA',
  marginBottom: 10
};

<GridContainer spacing={16}>
  <GridItem mobile={4}>
    <div style={style} />
  </GridItem>
  <GridItem mobile={4}>
    <div style={style} />
  </GridItem>
  <GridItem mobile={4}>
    <div style={style} />
  </GridItem>
</GridContainer>
```
