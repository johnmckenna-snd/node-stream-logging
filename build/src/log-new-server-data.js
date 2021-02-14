"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logNewServerData = void 0;

var _getEndpoint = require("./get-endpoint");

var _mongoHelper = require("./mongo-helper");

require("dotenv/config");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var db = process.env.DB;
var collection = process.env.COLLECTION;
var streamingServerIP = process.env.STREAMING_SERVER_IP;
var serverStatusEndpoint = process.env.SERVER_STATUS_ENDPOINT;
var serverStreamsEndpoint = process.env.SERVER_STREAMS_ENDPOINT;

var logNewServerData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var serverStatus, serverStreams, dbEntry, insertServerData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("----------   logNewServerData @ ".concat(new Date(), "   ------------"));
            _context.next = 3;
            return (0, _getEndpoint.getEndpoint)({
              ipAddress: streamingServerIP,
              endpoint: serverStatusEndpoint
            });

          case 3:
            serverStatus = _context.sent;
            console.log("serverStatus is", serverStatus);
            _context.next = 7;
            return (0, _getEndpoint.getEndpoint)({
              ipAddress: streamingServerIP,
              endpoint: serverStreamsEndpoint
            });

          case 7:
            serverStreams = _context.sent;
            console.log('serverStreams are', serverStreams);
            dbEntry = {
              serverStatus: serverStatus,
              serverStreams: serverStreams
            };
            _context.next = 12;
            return (0, _mongoHelper.mongoDBInsertOne)({
              targetDB: db,
              targetCollection: collection,
              dataToInsert: dbEntry
            });

          case 12:
            insertServerData = _context.sent;
            console.log('insertServerData:', insertServerData);

          case 14:
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

exports.logNewServerData = logNewServerData;