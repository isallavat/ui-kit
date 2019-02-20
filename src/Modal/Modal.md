```js
import { Modal } from '../Modal';
import { Button } from '../Button';

let modal;

<div>
  <Button onClick={() => modal.open()}>Open modal</Button>
  <Modal ref={(ref) => (modal = ref)} title='Modal title'>
    Modal content
  </Modal>
</div>
```
