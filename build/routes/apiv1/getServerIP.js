"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServerIP = void 0;

var _express = _interopRequireDefault(require("express"));

var _os = _interopRequireDefault(require("os"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

exports.getServerIP = router;

var networkInterfaces = _os["default"].networkInterfaces();

var en0ipv4 = networkInterfaces;
router.get('/get-server-ip', function (req, res) {
  res.send({
    data: en0ipv4
  });
});