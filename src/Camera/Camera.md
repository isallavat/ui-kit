```js
import { Camera } from '../Camera';
import { Button } from '../Button';
import { Modal } from '../Modal';

let camera;
let modal;

openCamera = (err) => {
  camera.open()
}

onApply = (snapshot) => {
  setState({ snapshot: snapshot })
  camera.close()
  modal.open()
}

onFail = (err) => {
  modal.open({
    title: err.name,
    children: err.message
  })
}

<div>
  <Button onClick={openCamera}>Open camera</Button>
  <Camera
    ref={(ref) => (camera = ref)}
    onApply={onApply}
    onFail={onFail}
  />
  <Modal ref={(ref) => (modal = ref)} closeButtonPosition='outside'>
    {state.snapshot &&
      <img src={URL.createObjectURL(state.snapshot)} style={{ maxWidth: '100%' }} />
    }
  </Modal>
</div>
```
