"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Camera = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Spin = require("../Spin");

var _helpers = require("../helpers");

require("./polyfill");

var Camera =
/*#__PURE__*/
function (_React$Component) {
  (0, _inheritsLoose2["default"])(Camera, _React$Component);

  function Camera(props) {
    var _context;

    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {};
    _this.facingModes = ['environment', 'user'];
    _this.constraints = {
      audio: false,
      video: {
        facingMode: _this.facingModes[0]
      }
    };
    _this.handleKeyUp = (_context = _this).handleKeyUp.bind(_context);
    _this.handleWindowResize = (_context = _this).handleWindowResize.bind(_context);
    return _this;
  }

  var _proto = Camera.prototype;

  _proto.open = function open() {
    this.init();
    document.addEventListener('keyup', this.handleKeyUp);
    window.addEventListener('resize', this.handleWindowResize);
  };

  _proto.close = function close() {
    var onClose = this.props.onClose;
    this.componentWillUnmount();
    this.setState({
      visible: false,
      snapshot: undefined
    });
    onClose && onClose();
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.state.visible) {
      document.body.style.overflow = 'visible';
      this.videoStreamTrack && this.videoStreamTrack.stop();
      document.removeEventListener('keyup', this.handleKeyUp);
      window.removeEventListener('resize', this.handleWindowResize);
    }
  };

  _proto.init = function init() {
    var _this2 = this;

    this.setState({
      loading: true
    });
    this.initCamera().then(function () {
      _this2.setState({
        loading: false
      });

      document.body.style.overflow = 'hidden';

      _this2.successInit();
    })["catch"](function (err) {
      var onFail = _this2.props.onFail;

      _this2.close();

      onFail && onFail(err);
      console.log(err.message);
    });
  };

  _proto.initCamera = function initCamera() {
    var _this3 = this;

    return new Promise(function (resolve, reject) {
      _this3.videoStreamTrack && _this3.videoStreamTrack.stop();

      _this3.getUserMedia(_this3.constraints).then(function (stream) {
        _this3.videoStreamTrack = stream.getVideoTracks()[0];

        _this3.setState({
          visible: true
        });

        var video = _this3.refs.video;

        if ('srcObject' in video) {
          video.srcObject = stream;
        } else {
          video.src = URL.createObjectURL(stream);
        }

        video.muted = true;
        video.setAttribute('playsinline', '');
        video.play();

        video.onloadeddata = function () {
          _this3.setVideoDimensions();

          resolve();
        };
      })["catch"](reject);
    });
  };

  _proto.getUserMedia = function getUserMedia(constraints) {
    return new Promise(function (resolve, reject) {
      if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia(constraints).then(resolve)["catch"](reject);
      } else {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia(constraints, resolve, reject);
      }
    });
  };

  _proto.setVideoDimensions = function setVideoDimensions() {
    var root = this.refs.root;
    var video = this.refs.video;
    var videoRatio = video.videoWidth / video.videoHeight;
    var width = root.offsetWidth;
    var height = width / videoRatio;

    if (height > root.offsetHeight) {
      height = root.offsetHeight;
      width = height * videoRatio;
    }

    video.width = width;
    video.height = height;
  };

  _proto.toggleCamera = function toggleCamera() {
    this.constraints.video.facingMode = this.constraints.video.facingMode === this.facingModes[0] ? this.facingModes[1] : this.facingModes[0];
    this.init();
  };

  _proto.successInit = function successInit() {};

  _proto.getFrameCanvas = function getFrameCanvas() {
    var video = this.refs.video;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = video.width;
    canvas.height = video.height;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas;
  };

  _proto.getSnapshotCanvas = function getSnapshotCanvas() {
    return this.getFrameCanvas();
  };

  _proto.handleCapture = function handleCapture() {
    var _this4 = this;

    var onCapture = this.props.onCapture;

    if (this.state.capturing) {
      return;
    }

    this.refs.video.pause();
    this.setState({
      capturing: true
    });
    this.getSnapshotCanvas().toBlob(function (blob) {
      _this4.setState({
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
    this.close();
  };

  _proto.handleReset = function handleReset() {
    var onReset = this.props.onReset;
    onReset && onReset();
    this.refs.video.play();
    this.setState({
      snapshot: undefined
    });
  };

  _proto.handleKeyUp = function handleKeyUp(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  };

  _proto.handleWindowResize = function handleWindowResize() {
    this.setVideoDimensions();
  };

  _proto.renderControls = function renderControls() {
    var _this$state = this.state,
        capturing = _this$state.capturing,
        snapshot = _this$state.snapshot;
    return snapshot ? _react["default"].createElement("div", {
      className: "Camera__controls Camera__controls_right"
    }, _react["default"].createElement("div", {
      className: "Camera__control Camera__control_apply",
      onClick: this.handleApply.bind(this)
    }, _react["default"].createElement("svg", {
      className: "Camera__control-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "16.502",
      height: "12.502",
      viewBox: "0 0 16.502 12.502"
    }, _react["default"].createElement("path", {
      id: "Union_1",
      "data-name": "Union 1",
      d: "M.519,12.252a1.279,1.279,0,0,1-.3-.221L-3.626,8.183a1.281,1.281,0,0,1,0-1.809,1.281,1.281,0,0,1,1.809,0L1.251,9.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L2.183,12.128a1.278,1.278,0,0,1-1.664.124Z",
      transform: "translate(4 0)",
      fill: "#fff"
    }))), _react["default"].createElement("div", {
      className: "Camera__control Camera__control_reset",
      onClick: this.handleReset.bind(this)
    }, _react["default"].createElement("svg", {
      className: "Camera__control-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "12.502",
      height: "12.502",
      viewBox: "0 0 12.502 12.502"
    }, _react["default"].createElement("path", {
      id: "Union_1",
      "data-name": "Union 1",
      d: "M10.319,12.128,6.251,8.059,2.183,12.128A1.279,1.279,0,0,1,.374,10.319L4.443,6.251.374,2.183A1.279,1.279,0,0,1,2.183.374L6.251,4.443,10.319.374a1.279,1.279,0,1,1,1.809,1.808L8.059,6.251l4.068,4.068a1.279,1.279,0,1,1-1.808,1.808Z",
      transform: "translate(0 0)",
      fill: "#fff"
    })))) : _react["default"].createElement(_react.Fragment, null, _react["default"].createElement("div", {
      className: "Camera__controls Camera__controls_left"
    }, _react["default"].createElement("div", {
      className: "Camera__control Camera__control_rotate",
      onClick: this.toggleCamera.bind(this)
    }, _react["default"].createElement("svg", {
      className: "Camera__control-icon",
      xmlns: "http://www.w3.org/2000/svg",
      width: "18",
      height: "18",
      viewBox: "0 0 18 18"
    }, _react["default"].createElement("g", {
      id: "icon_repeat_m_black.d4a04a3a70e81ea13648c9e22cf37227",
      transform: "translate(-3 -3)"
    }, _react["default"].createElement("path", {
      id: "Path_668",
      "data-name": "Path 668",
      d: "M20,4H16V8h1V5.707l.646.646.218.2A8,8,0,0,1,12,20a8.113,8.113,0,0,1-1.045-.067l-.128.992A9.191,9.191,0,0,0,12,21,9,9,0,0,0,18.363,5.636L17.719,5H20V4Z",
      fill: "#fff",
      fillRule: "evenodd"
    }), _react["default"].createElement("path", {
      id: "Path_669",
      "data-name": "Path 669",
      d: "M3,12a8.94,8.94,0,0,0,2.637,6.364L6.281,19H4v1H8V16H7v2.293l-.646-.646-.218-.2A8,8,0,0,1,12,4a8.113,8.113,0,0,1,1.045.067l.129-.992A9.219,9.219,0,0,0,12,3a9.01,9.01,0,0,0-9,9Z",
      fill: "#fff",
      fillRule: "evenodd"
    }))))), _react["default"].createElement("div", {
      className: "Camera__controls Camera__controls_right"
    }, _react["default"].createElement("div", {
      className: (0, _classnames["default"])({
        'Camera__control Camera__control_capture': true,
        '-animate': capturing
      }),
      onClick: this.handleCapture.bind(this)
    })));
  };

  _proto.renderChildren = function renderChildren() {
    return this.props.children;
  };

  _proto.render = function render() {
    var className = this.props.className;
    var _this$state2 = this.state,
        visible = _this$state2.visible,
        loading = _this$state2.loading;
    var classNames = (0, _classnames["default"])({
      'Camera': true,
      '-visible': visible
    }, className);
    return _react["default"].createElement(this.props.component, (0, _extends2["default"])({
      className: classNames
    }, (0, _helpers.excludeProps)(this), {
      ref: "root"
    }), _react["default"].createElement("div", {
      className: "Camera__viewport"
    }, _react["default"].createElement("video", {
      className: "Camera__video",
      ref: "video",
      width: "0",
      height: "0"
    })), loading ? _react["default"].createElement(_Spin.Spin, {
      className: "Camera__spin"
    }) : _react["default"].createElement(_react.Fragment, null, this.renderChildren(), this.renderControls()), _react["default"].createElement("div", {
      className: "Camera__close",
      onClick: this.close.bind(this)
    }));
  };

  return Camera;
}(_react["default"].Component);

exports.Camera = Camera;
Camera.propTypes = {
  component: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].func.isRequired]).isRequired,
  className: _propTypes["default"].oneOfType([_propTypes["default"].string.isRequired, _propTypes["default"].object.isRequired, _propTypes["default"].array.isRequired]),
  onCapture: _propTypes["default"].func,
  onApply: _propTypes["default"].func,
  onReset: _propTypes["default"].func,
  onFail: _propTypes["default"].func,
  onClose: _propTypes["default"].func
};
Camera.defaultProps = {
  component: 'div'
};