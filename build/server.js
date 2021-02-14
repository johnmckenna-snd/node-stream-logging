"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _nodeCron = _interopRequireDefault(require("node-cron"));

require("dotenv/config");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _logNewServerData = require("./src/log-new-server-data");

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var port = process.env.PORT || 4000;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use(_index["default"]);
app.get('/health', function (req, res) {
  res.writeHead(200, 'OK', {
    'Content-Type': 'text/plain'
  });
  res.end('Healthy, daddy!');
});

_nodeCron["default"].schedule('*/5 * * * *', function () {
  console.log("cronJob @ ".concat(new Date()));
  (0, _logNewServerData.logNewServerData)();
});

app.listen(port, function (e) {
  if (e) throw Error("Could not start the server on port: ".concat(port));
  console.log("Hello, and welcome! The node-stream-logging server is running on port ".concat(port));
});