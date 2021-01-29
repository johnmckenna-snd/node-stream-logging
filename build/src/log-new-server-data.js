"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logNewServerData = void 0;

var _getEndpoint = require("./get-endpoint");

var _mongoHelper = require("./mongo-helper");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var logNewServerData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
    var streamingServerIP, serverStatusEndpoint, serverStreamsEndpoint, db, collection, serverStatus, serverStreams, dbEntry, insertServerData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            streamingServerIP = _ref2.streamingServerIP, serverStatusEndpoint = _ref2.serverStatusEndpoint, serverStreamsEndpoint = _ref2.serverStreamsEndpoint, db = _ref2.db, collection = _ref2.collection;
            console.log("----------   logNewServerData @ ".concat(new Date(), "   ------------"));
            _context.next = 4;
            return (0, _getEndpoint.getEndpoint)({
              ipAddress: streamingServerIP,
              endpoint: serverStatusEndpoint
            });

          case 4:
            serverStatus = _context.sent;
            console.log("serverStatus is", serverStatus);
            _context.next = 8;
            return (0, _getEndpoint.getEndpoint)({
              ipAddress: streamingServerIP,
              endpoint: serverStreamsEndpoint
            });

          case 8:
            serverStreams = _context.sent;
            console.log('serverStreams are', serverStreams);
            dbEntry = {
              serverStatus: serverStatus,
              serverStreams: serverStreams
            };
            _context.next = 13;
            return (0, _mongoHelper.mongoDBInsertOne)({
              targetDB: db,
              targetCollection: collection,
              dataToInsert: dbEntry
            });

          case 13:
            insertServerData = _context.sent;
            console.log('insertServerData:', insertServerData);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function logNewServerData(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.logNewServerData = logNewServerData;