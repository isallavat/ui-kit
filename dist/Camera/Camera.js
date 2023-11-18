"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Progress = require("../Progress");
var _helpers = require("../helpers");
require("./polyfill");
// Была попытка использовать ImageCapture. Не подходит. Так как на android-планшете не фотка, а говно
var Camera = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2["default"])(Camera, _React$Component);
  function Camera(props) {
    var _context;
    var _this;
    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    _this.constraints = {
      audio: false,
      video: {
        facingMode: props.facingMode,
        width: {
          ideal: props.width
        },
        height: {
          ideal: props.height
        }
      }
    };
    _this.handleKeyUp = (_context = _this).handleKeyUp.bind(_context);
    _this.handleWindowResize = (_context = _this).handleWindowResize.bind(_context);
    return _this;
  }
  var _proto = Camera.prototype;
  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.opened) {
      this.close();
    }
  };
  _proto.open = function open() {
    var _this2 = this;
    var fullscreen = this.props.fullscreen;
    var root = this.refRoot;
    this.opened = true;
    root && root.focus();
    if (fullscreen) {
      (0, _helpers.preventWindowScroll)(true);
    }
    document.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleWindowResize);
    this.setState({
      opened: true
    });
    this.init().then(function () {
      _this2.enumerateDevices().then(function (devices) {
        var videoDevices = devices.filter(function (item) {
          return item.kind === 'videoinput';
        });
        _this2.setState({
          videoDevices: videoDevices
        });
      });
    });
  };
  _proto.close = function close() {
    var onClose = this.props.onClose;
    this.opened = false;
    (0, _helpers.preventWindowScroll)(false);
    this.videoStreamTrack && this.videoStreamTrack.stop();
    document.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('resize', this.handleWindowResize);
    this.setState({
      opened: false,
      cameraInited: false,
      snapshot: null
    });
    onClose && onClose();
  };
  _proto.stop = function stop() {
    this.videoStreamTrack && this.videoStreamTrack.stop();
  };
  _proto.init = function init() {
    var _this3 = this;
    this.setState({
      progress: true
    });
    this.videoStreamTrack && this.videoStreamTrack.stop();
    return this.initCamera().then(function () {
      _this3.setState({
        progress: false
      });
      _this3.handleInit();
    })["catch"](function (err) {
      _this3.setState({
        progress: false
      });
      _this3.handleFail(err);
    });
  };
  _proto.initCamera = function initCamera() {
    var _this4 = this;
    return new Promise(function (resolve, reject) {
      _this4.setState({
        cameraInited: false
      });
      _this4.getUserMedia(_this4.constraints).then(function (stream) {
        _this4.videoStreamTrack = stream.getVideoTracks()[0];
        if (!_this4.opened) {
          return _this4.videoStreamTrack.stop();
        }
        _this4.setState({
          cameraInited: true
        }, function () {
          var video = _this4.refVideo;
          if ('srcObject' in video) {
            video.srcObject = stream;
          } else {
            video.src = URL.createObjectURL(stream);
          }
          video.muted = true;
          video.controls = false;
          video.setAttribute('playsinline', '');
          video.play();
          video.onloadeddata = function () {
            if (_this4.opened) {
              _this4.setVideoDimensions();
              resolve();
            }
          };
        });
      })["catch"](reject);
    });
  };
  _proto.getUserMedia = function getUserMedia(constraints) {
    return new Promise(function (resolve, reject) {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then(resolve)["catch"](reject);
      } else {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (navigator.getUserMedia) {
          navigator.getUserMedia(constraints, resolve, reject);
        } else {
          reject(new Error('getUserMedia not supported'));
        }
      }
    });
  };
  _proto.enumerateDevices = function enumerateDevices() {
    return new Promise(function (resolve, reject) {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        navigator.mediaDevices.enumerateDevices().then(resolve)["catch"](reject);
      } else {
        reject(new Error('enumerateDevices not supported'));
      }
    });
  };
  _proto.tryMaximize = function tryMaximize() {
    var _this5 = this;
    return new Promise(function (resolve, reject) {
      var capabilities = _this5.videoStreamTrack.getCapabilities();
      if (capabilities) {
        _this5.videoStreamTrack.applyConstraints({
          width: {
            ideal: capabilities.width.max
          },
          height: {
            ideal: capabilities.height.max
          }
        }).then(resolve)["catch"](resolve);
      } else {
        resolve();
      }
    });
  };
  _proto.setVideoDimensions = function setVideoDimensions() {
    var root = this.refRoot;
    var video = this.refVideo;
    if (!video) {
      return;
    }
    var height = root.offsetHeight;
    var width = height / video.videoHeight * video.videoWidth;
    if (width < root.offsetWidth) {
      width = root.offsetWidth;
      height = width / video.videoWidth * video.videoHeight;
    }
    video.width = width;
    video.height = height;
  };
  _proto.toggleCamera = function toggleCamera() {
    this.constraints.video.facingMode = this.constraints.video.facingMode === 'environment' ? 'user' : 'environment';
    this.init();
  };
  _proto.getFrameCanvas = function getFrameCanvas(asViewportSize) {
    var root = this.refRoot;
    var video = this.refVideo;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var width;
    var height;
    if (asViewportSize) {
      canvas.width = root.offsetWidth;
      canvas.height = root.offsetHeight;
      width = video.width;
      height = video.height;
    } else {
      var k = video.videoWidth / video.width;
      canvas.width = root.offsetWidth * k;
      canvas.height = root.offsetHeight * k;
      width = video.videoWidth;
      height = video.videoHeight;
    }
    var left = (width - canvas.width) / 2;
    var top = (height - canvas.height) / 2;
    ctx.drawImage(video, -left, -top, width, height);
    return canvas;
  };
  _proto.handleInit = function handleInit() {};
  _proto.handleCapture = function handleCapture() {
    var _this6 = this;
    var onCapture = this.props.onCapture;
    if (this.state.capturing) {
      return;
    }
    this.refVideo.pause();
    this.setState({
      capturing: true
    });
    this.getFrameCanvas().toBlob(function (blob) {
      _this6.setState({
        capturing: false,
        snapshot: blob
      });
      onCapture && onCapture(blob);
    });
  };
  _proto.handleApply = function handleApply() {
    var onApply = this.props.onApply;
    var snapshot = this.state.snapshot;
    onApply && onApply(snapshot);
  };
  _proto.handleReset = function handleReset() {
    var onReset = this.props.onReset;
    this.refVideo.play();
    this.setState({
      snapshot: null
    });
    onReset && onReset();
  };
  _proto.handleFail = function handleFail(err) {
    var onFail = this.props.onFail;
    onFail && onFail(err);
  };
  _proto.handleKeyUp = function handleKeyUp(event) {
    var _this$state = this.state,
      snapshot = _this$state.snapshot,
      progress = _this$state.progress;
    if (event.keyCode === 13 && snapshot) {
      this.handleApply();
    } else if (event.keyCode === 27 && snapshot) {
      this.handleReset();
    } else if (event.keyCode === 27) {
      this.close();
    } else if (event.keyCode === 32 && !progress) {
      this.handleCapture();
    }
  };
  _proto.handleWindowResize = function handleWindowResize() {
    this.setVideoDimensions();
  };
  _proto.renderLeftSide = function renderLeftSide() {
    var _this$state2 = this.state,
      snapshot = _this$state2.snapshot,
      videoDevices = _this$state2.videoDevices;
    return videoDevices && videoDevices.length > 1 && !snapshot && this.renderRotateControl();
  };
  _proto.renderRightSide = function renderRightSide() {
    var snapshot = this.state.snapshot;
    return snapshot ? /*#__PURE__*/_react["default"].createElement("div", null, this.renderApplyControl(), this.renderResetControl()) : this.renderCaptureControl();
  };
  _proto.renderApplyControl = function renderApplyControl() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__control",
      onClick: this.handleApply.bind(this)
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "Camera__control-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "16.502",
      height: "12.502",
      viewBox: "0 0 16.502 12.502"
    }, /*#__PURE__*/_react["default"].createElement("g", {
      fill: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      d: "M.519,12.252a1.279,1.279,0,0,1-.3-.221L-3.626,8.183a1.281,1.281,0,0,1,0-1.809,1.281,1.281,0,0,1,1.809,0L1.251,9.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L2.183,12.128a1.278,1.278,0,0,1-1.664.124Z",
      transform: "translate(4 0)"
    }))));
  };
  _proto.renderResetControl = function renderResetControl() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__control",
      onClick: this.handleReset.bind(this)
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "Camera__control-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "12.502",
      height: "12.502",
      viewBox: "0 0 12.502 12.502"
    }, /*#__PURE__*/_react["default"].createElement("g", {
      fill: "currentColor"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      d: "M10.319,12.128,6.251,8.059,2.183,12.128A1.279,1.279,0,0,1,.374,10.319L4.443,6.251.374,2.183A1.279,1.279,0,0,1,2.183.374L6.251,4.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L8.059,6.251l4.068,4.068a1.279,1.279,0,1,1-1.808,1.808Z",
      transform: "translate(0 0)"
    }))));
  };
  _proto.renderRotateControl = function renderRotateControl() {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__control",
      onClick: this.toggleCamera.bind(this)
    }, /*#__PURE__*/_react["default"].createElement("svg", {
      className: "Camera__control-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    }, /*#__PURE__*/_react["default"].createElement("g", {
      fill: "currentColor",
      transform: "translate(-3 -3)"
    }, /*#__PURE__*/_react["default"].createElement("path", {
      d: "M20,4H16V8h1V5.707l.646.646.218.2A8,8,0,0,1,12,20a8.113,8.113,0,0,1-1.045-.067l-.128.992A9.191,9.191,0,0,0,12,21,9,9,0,0,0,18.363,5.636L17.719,5H20V4Z"
    }), /*#__PURE__*/_react["default"].createElement("path", {
      d: "M3,12a8.94,8.94,0,0,0,2.637,6.364L6.281,19H4v1H8V16H7v2.293l-.646-.646-.218-.2A8,8,0,0,1,12,4a8.113,8.113,0,0,1,1.045.067l.129-.992A9.219,9.219,0,0,0,12,3a9.01,9.01,0,0,0-9,9Z"
    }))));
  };
  _proto.renderCaptureControl = function renderCaptureControl() {
    var capturing = this.state.capturing;
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])({
        Camera__control: true,
        Camera__control_capture: true,
        '--animated': capturing
      }),
      onClick: this.handleCapture.bind(this)
    });
  };
  _proto.renderContent = function renderContent() {
    return this.props.children;
  };
  _proto.render = function render() {
    var _this7 = this;
    var _this$props = this.props,
      className = _this$props.className,
      fullscreen = _this$props.fullscreen;
    var _this$state3 = this.state,
      opened = _this$state3.opened,
      cameraInited = _this$state3.cameraInited,
      progress = _this$state3.progress;
    var classNames = (0, _classnames["default"])({
      Camera: true,
      Camera_fullscreen: fullscreen,
      '--opened': opened
    }, className);
    return /*#__PURE__*/_react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      ref: function ref(_ref2) {
        _this7.refRoot = _ref2;
      },
      tabIndex: "1"
    }), cameraInited && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__video-container"
    }, /*#__PURE__*/_react["default"].createElement("video", {
      className: "Camera__video",
      ref: function ref(_ref) {
        _this7.refVideo = _ref;
      },
      width: "0",
      height: "0"
    })), !progress && /*#__PURE__*/_react["default"].createElement("div", null, this.renderContent(), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__side Camera__side_left"
    }, this.renderLeftSide()), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__side Camera__side_right"
    }, this.renderRightSide()))), progress && /*#__PURE__*/_react["default"].createElement(_Progress.Progress, {
      className: "Camera__progress",
      color: "current"
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__close",
      onClick: this.close.bind(this)
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "Camera__close-icon"
    })));
  };
  return Camera;
}(_react["default"].Component);
exports.Camera = Camera;
Camera.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired, _propTypes["default"].object.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  fullscreen: _propTypes["default"].bool,
  facingMode: _propTypes["default"].oneOf(['environment', 'user']),
  children: _propTypes["default"].any,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  onCapture: _propTypes["default"].func,
  onApply: _propTypes["default"].func,
  onReset: _propTypes["default"].func,
  onFail: _propTypes["default"].func,
  onClose: _propTypes["default"].func
};
Camera.defaultProps = {
  width: 1920,
  height: 1080,
  component: 'div',
  facingMode: 'environment',
  fullscreen: true
};