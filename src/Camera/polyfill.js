(function () {
  window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL || {}
  window.URL.createObjectURL = window.URL.createObjectURL || function () {}

  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function (callback, type, quality) {
        const dataURL = this.toDataURL(type, quality).split(',')[1]
        setTimeout(function () {
          const binStr = atob(dataURL)
          const len = binStr.length
          const arr = new Uint8Array(len)

          for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i)
          }

          callback(new Blob([arr], { type: type || 'image/png' }))
        })
      }
    })
  }
})()
