"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoDBGetLastHour = exports.mongoDBGetAllDocuments = exports.mongoDBInsertOne = void 0;

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

var mongoDBGetAllDocuments = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
    var targetDB, targetCollection, client, db, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            targetDB = _ref5.targetDB, targetCollection = _ref5.targetCollection;
            console.log('Getting all the data. all of it. all at once.');
            _context3.prev = 2;
            _context3.next = 5;
            return dbConnect();

          case 5:
            client = _context3.sent;
            db = client.db(targetDB);
            console.log("connected to db: ".concat(db));
            _context3.next = 10;
            return db.collection(targetCollection).find({}).toArray();

          case 10:
            result = _context3.sent;
            return _context3.abrupt("return", result);

          case 14:
            _context3.prev = 14;
            _context3.t0 = _context3["catch"](2);
            console.log(_context3.t0);

          case 17:
            ;

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[2, 14]]);
  }));

  return function mongoDBGetAllDocuments(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.mongoDBGetAllDocuments = mongoDBGetAllDocuments;

var mongoDBGetLastHour = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(_ref7) {
    var targetDB, targetCollection, ONE_HOUR, currentTime, oneHourAgo, oneHourAgoID, findStage, dateConversionStage, sortStage, client, db, result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            targetDB = _ref7.targetDB, targetCollection = _ref7.targetCollection;
            console.log("mongoDBGetLastHour from db: ".concat(targetDB, " and collection: ").concat(targetCollection));
            ONE_HOUR = 60 * 60 * 1000;
            currentTime = new Date();
            oneHourAgo = new Date(currentTime.getTime() - ONE_HOUR);
            console.log('oneHourAgo', oneHourAgo);
            oneHourAgoID = (0, _mongodb.ObjectID)(Math.floor(oneHourAgo / 1000).toString(16) + '0000000000000000');
            console.log('oneHourAgoID', oneHourAgoID);
            findStage = {
              '$match': {
                '_id': {
                  '$gt': oneHourAgoID
                }
              }
            };
            dateConversionStage = {
              '$addFields': {
                'date': {
                  '$toDate': '$_id'
                }
              }
            };
            sortStage = {
              '$sort': {
                'date': 1
              }
            };
            _context4.prev = 11;
            _context4.next = 14;
            return dbConnect();

          case 14:
            client = _context4.sent;
            db = client.db(targetDB);
            console.log("connected to db: ".concat(db));
            _context4.next = 19;
            return db.collection(targetCollection).aggregate([findStage, dateConversionStage, sortStage]).toArray();

          case 19:
            result = _context4.sent;
            console.log("found ".concat(result.length, " documents"));
            return _context4.abrupt("return", result);

          case 24:
            _context4.prev = 24;
            _context4.t0 = _context4["catch"](11);
            console.log(_context4.t0);

          case 27:
            ;

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[11, 24]]);
  }));

  return function mongoDBGetLastHour(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.mongoDBGetLastHour = mongoDBGetLastHour;