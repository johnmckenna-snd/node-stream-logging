"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllData = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoHelper = require("../../src/mongo-helper");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var router = _express["default"].Router();

exports.getAllData = router;
var db = process.env.DB;
var collection = process.env.COLLECTION;
router.get('/get-all-data', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var data, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mongoHelper.mongoDBGetAllDocuments)({
              targetDB: db,
              targetCollection: collection
            });

          case 2:
            data = _context.sent;
            console.log('found', data.length, 'documents');
            result = res.send({
              data: data
            });
            console.log('/get-all-data called. status: ', result.statusMessage);

          case 6:
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