"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTimeLog = exports.getTimeLogs = exports.createTimeLog = void 0;
var axios_1 = require("axios");
function createTimeLog(timeLogData) {
    return __awaiter(this, void 0, void 0, function () {
        var token, resp, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("user");
                    return [4 /*yield*/, axios_1.default.post("time-log/create", JSON.stringify(timeLogData), {
                            headers: {
                                "Content-Type": "Application/json",
                                "Authorization": "Bearer " + token
                            }
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.data];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.createTimeLog = createTimeLog;
function formatTime(timeInSeconds) {
    var hours = Math.floor(timeInSeconds / (60 * 60));
    var divisor_for_minutes = timeInSeconds % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    var strHours = hours < 10 ? "0" + hours.toString() : hours.toString();
    var strMinutes = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    var strSeconds = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
    return strHours + ":" + strMinutes + ":" + strSeconds;
}
function getTimeLogs() {
    return __awaiter(this, void 0, void 0, function () {
        var token, resp, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("user");
                    return [4 /*yield*/, axios_1.default.get("time-log", {
                            headers: {
                                "Content-Type": "Application/json",
                                "Authorization": "Bearer " + token
                            }
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.data];
                case 2:
                    results = _a.sent();
                    results = results.map(function (tl) { return ({
                        id: tl.id,
                        userId: tl.userId,
                        duration: formatTime(tl.duration),
                        category: tl.category,
                        description: tl.description
                    }); });
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.getTimeLogs = getTimeLogs;
function deleteTimeLog(id) {
    return __awaiter(this, void 0, void 0, function () {
        var token, resp, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    token = localStorage.getItem("user");
                    return [4 /*yield*/, axios_1.default.delete("time-log/delete/" + id, {
                            headers: {
                                "Content-Type": "Application/json",
                                "Authorization": "Bearer " + token
                            }
                        })];
                case 1:
                    resp = _a.sent();
                    return [4 /*yield*/, resp.data];
                case 2:
                    results = _a.sent();
                    return [2 /*return*/, results];
            }
        });
    });
}
exports.deleteTimeLog = deleteTimeLog;
//# sourceMappingURL=TimeLogAPI.js.map