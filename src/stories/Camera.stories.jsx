import React, { useState } from 'react'

import { Camera } from '../Camera'
import { Button } from '../Button'
import { Modal } from '../Modal'
export default {
  title: 'Components/Camera',
  component: Camera,
  argTypes: {
    width: {
      control: 'number',
      table: {
        category: 'camera resolution'
      } },
    height: { control: 'number',
      table: {
        category: 'camera resolution'
      } },
    component: {
      table: {
        category: 'others'
      } },
    className: {
      table: {
        category: 'others'
      } },
    fullscreen: { control: 'boolean' },
    facingMode: { control: 'select', options: ['environment', 'user'] }
  }
}

const Template = (args) => {
  const [snapshot, setSnapshot] = useState()
  let camera
  let modal

  const openCamera = () => {
    camera.open()
  }

  const onApply = (snapshot) => {
    setSnapshot(snapshot)
    camera.close()
    modal.open()
  }

  const onFail = (err) => {
    modal.open({
      title: err.name,
      children: err.message
    })
  }

  return (
    <div>
      <Button onClick={openCamera}>Open camera</Button>
      <Camera
        ref={(ref) => (camera = ref)}
        onApply={onApply}
        onFail={onFail}
        {...args}
      />
      <Modal ref={(ref) => (modal = ref)} closeButtonPosition='outside'>
        {snapshot &&
          <img src={URL.createObjectURL(snapshot)} style={{ maxWidth: '100%' }} alt={''} />
        }
      </Modal>
    </div>)
}

export const Primary = Template.bind({})
Primary.args = {
  width: 1920,
  height: 1080,
  fullscreen: true,
  facingMode: 'environment',
  component: 'div'
}
