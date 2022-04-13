```js
import { Modal } from '../Modal';
import { Button } from '../Button';
import { GridContainer, GridItem } from '../Grid';

let modal;
let modalAlert;
let modalBlind;

<div>
  <GridContainer spacing={16}>
    <GridItem>
      <Button onClick={() => modal.open()}>Open modal</Button>
    </GridItem>
    <GridItem>
      <Button onClick={() => modalAlert.open()}>Open alert</Button>
    </GridItem>
    <GridItem>
      <Button onClick={() => modalBlind.open()}>Open blind</Button>
    </GridItem>
  </GridContainer>
  <Modal ref={(ref) => (modal = ref)} title='Modal title'>
    Modal content
  </Modal>
  <Modal
    ref={(ref) => (modalAlert = ref)}
    title='ALert title'
    type='alert'
    image='https://assets-global.website-files.com/5bcb5ee81fb2091a2ec550c7/61f723b06f70e0880ae3c656_DrawKit%20Webflow%20Grid-min.png'
  >
    Alert content
  </Modal>
  <Modal
    ref={(ref) => (modalBlind = ref)}
    type='blind'
    closeButtonPosition={false}
  >
    Blind content
  </Modal>
</div>
```
