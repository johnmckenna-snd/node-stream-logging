"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEndpoint = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getEndpoint = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var ipAddress, endpoint, response, errorReturn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            ipAddress = _ref2.ipAddress, endpoint = _ref2.endpoint;
            console.log("GET request to ".concat(ipAddress).concat(endpoint));
            _context.prev = 2;
            _context.next = 5;
            return _axios["default"].get("".concat(ipAddress).concat(endpoint));

          case 5:
            response = _context.sent;
            console.log("Successful.");
            return _context.abrupt("return", response.data);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            errorReturn = {
              'error': _context.t0
            };
            return _context.abrupt("return", errorReturn);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function getEndpoint(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getEndpoint = getEndpoint;