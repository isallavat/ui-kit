"use strict";

(function () {
  window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL || {};
  window.URL.createObjectURL = window.URL.createObjectURL || function () {};
  if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
      value: function value(callback, type, quality) {
        var dataURL = this.toDataURL(type, quality).split(',')[1];
        setTimeout(function () {
          var binStr = atob(dataURL);
          var len = binStr.length;
          var arr = new Uint8Array(len);
          for (var i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], {
            type: type || 'image/png'
          }));
        });
      }
    });
  }
})();