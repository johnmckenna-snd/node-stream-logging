"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getServerStatusSummary = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoHelper = require("../../src/mongo-helper");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var router = _express["default"].Router();

exports.getServerStatusSummary = router;
var db = process.env.DB;
var collection = process.env.COLLECTION;
router.get('/get-server-status-summary', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var lastHourData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mongoHelper.mongoDBGetLastHour)({
              targetDB: db,
              targetCollection: collection
            });

          case 2:
            lastHourData = _context.sent;
            res.send({
              data: {
                lastHourData: lastHourData,
                lastDayData: [],
                lastWeekData: [],
                lastMonthData: []
              }
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());