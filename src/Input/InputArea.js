import React from 'react'
import { Input } from './Input'

export class InputArea extends Input {
  renderElement (props) {
    const { value } = this.state
    const hiddenText = value.replace(/\n/g, '<br />').replace(/\s\s/g, '&nbsp; ')

    return (
      <div>
        <div className='Input__element Input__element_hidden'
          dangerouslySetInnerHTML={{ __html: hiddenText }} />
        <textarea
          {...props}
          className='Input__element Input__element_visible'
          ref={(node) => { this.inputEl = node }}
        />
      </div>
    )
  }
}

InputArea.propTypes = Input.propTypes

InputArea.defaultProps = {
  ...Input.defaultProps,
  type: 'area'
}
