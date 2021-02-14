"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _getServerIP = require("./apiv1/getServerIP");

var _getAllData = require("./apiv1/getAllData");

var _getServerStatusSummary = require("./apiv1/getServerStatusSummary");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use('/apiv1', _getServerIP.getServerIP);
router.use('/apiv1', _getAllData.getAllData);
router.use('/apiv1', _getServerStatusSummary.getServerStatusSummary);
var _default = router;
exports["default"] = _default;