import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

const div = document.createElement('div')
const div2 = document.createElement('div')
div.style.left = '0px'
div.style.right = '0px'
div.style.bottom = '100%'
div2.style.height = '100000px'
div.appendChild(div2)
document.body.appendChild(div)
const scrollbarWidth = window.innerWidth - div.offsetWidth
document.body.removeChild(div)

export class ScrollArea extends React.Component {
  render () {
    const props = { ...this.props }
    const Component = scrollbarWidth ? PerfectScrollbar : 'div'

    if (Component === 'div') {
      props.ref = props.containerRef
      delete props.containerRef
      delete props.options
    } else {
      props.options = {
        wheelSpeed: 0.5,
        wheelPropagation: false,
        ...props.options
      }
    }

    return (
      <Component {...props}>
        {this.props.children}
      </Component>
    )
  }
}
