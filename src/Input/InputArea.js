import React, { Fragment } from 'react'
import { Input } from './Input'

export class InputArea extends Input {
  renderElement (props) {
    const { value } = this.state
    const hiddenText = value.replace(/\n/g, '<br />').replace(/\s\s/g, '&nbsp; ')

    return (
      <Fragment>
        <div className='Input__element Input__element_hidden'
          dangerouslySetInnerHTML={{ __html: hiddenText }} />
        <textarea
          {...props}
          ref={(node) => { this.inputEl = node }}
        />
      </Fragment>
    )
  }
}

InputArea.propTypes = Input.propTypes

InputArea.defaultProps = {
  ...Input.defaultProps,
  type: 'area'
}
