```js
import { Blind } from '../Blind';
import { Button } from '../Button';
import { GridContainer, GridItem } from '../Grid';

let modal;

<div>
  <GridContainer spacing={16}>
    <GridItem>
      <Button onClick={() => modal.open()}>Open blind</Button>
    </GridItem>
  </GridContainer>
  <Blind ref={(ref) => (modal = ref)}>
    Blind content
  </Blind>
</div>
```
