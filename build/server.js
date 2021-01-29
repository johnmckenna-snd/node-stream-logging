"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

require("dotenv/config");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _streamApiRequester = require("./src/stream-api-requester");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var port = 4000;
var db = 'stream_logging';
var collection = 'stream_logs';
var streamingServerIP = 'http://10.0.0.117:8000';
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.get('/health', function (req, res) {
  res.writeHead(200, 'OK', {
    'Content-Type': 'text/plain'
  });
  res.end('Healthy, daddy!');
});

var logNewServerData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
    var newData;
    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("----------   logNewServerData @ ".concat(new Date(), "   ------------"));
            _context.next = 3;
            return (0, _streamApiRequester.getServerStatus)({
              ipAddress: streamingServerIP
            });

          case 3:
            newData = _context.sent;
            console.log("newData is", newData);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logNewServerData() {
    return _ref.apply(this, arguments);
  };
}();

_nodeCron["default"].schedule('*/5 * * * *', function () {
  console.log("cronJob @ ".concat(new Date()));
  logNewServerData();
});

app.listen(port, function (e) {
  if (e) throw Error("Could not start the server on port: ".concat(port));
  console.log("Hello, and welcome! The node-stream-logging server is running on port ".concat(port));
});