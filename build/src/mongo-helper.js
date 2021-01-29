"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoDBInsertOne = void 0;

var _mongodb = require("mongodb");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var dbConnect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var url, client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/';
            client = new _mongodb.MongoClient(url, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });
            _context.next = 4;
            return client.connect();

          case 4:
            console.log('connected to db');
            return _context.abrupt("return", client);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function dbConnect() {
    return _ref.apply(this, arguments);
  };
}();

var mongoDBInsertOne = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
    var targetDB, targetCollection, dataToInsert, client, db, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            targetDB = _ref3.targetDB, targetCollection = _ref3.targetCollection, dataToInsert = _ref3.dataToInsert;
            console.log("Writing new data: ".concat(dataToInsert));
            _context2.prev = 2;
            _context2.next = 5;
            return dbConnect();

          case 5:
            client = _context2.sent;
            db = client.db(targetDB);
            console.log("connected to db: ".concat(db));
            _context2.next = 10;
            return db.collection(targetCollection).insertOne(dataToInsert);

          case 10:
            result = _context2.sent;
            return _context2.abrupt("return", result.result);

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 14]]);
  }));

  return function mongoDBInsertOne(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.mongoDBInsertOne = mongoDBInsertOne;