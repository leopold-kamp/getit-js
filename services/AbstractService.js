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
exports.__esModule = true;
exports.AbstractApiService = void 0;
var axios_1 = require("axios");
// @ts-ignore
var URITemplate_1 = require("urijs/src/URITemplate");
var _ = require("lodash");
var AbstractApiService = /** @class */ (function () {
    function AbstractApiService(config) {
        this.headers = {};
        this.config = config;
    }
    /**
     *
     * @param data to send via json Body
     * @param urlData any path variables
     * @param params for query
     */
    AbstractApiService.prototype.create = function (data, urlData, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, parsedParams, result, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.endpoints.create === undefined) {
                            throw new Error('Not defined endpoint');
                        }
                        url = this.fillUrl(this.config.endpoints.create, urlData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        parsedParams = this.parseParams(params);
                        return [4 /*yield*/, axios_1["default"].post(url, data, { headers: this.headers, params: parsedParams })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data.data];
                    case 3:
                        e_1 = _a.sent();
                        throw e_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AbstractApiService.prototype.view = function (urlData, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.endpoints.view === undefined) {
                            throw new Error('Not defined endpoint');
                        }
                        url = this.fillUrl(this.config.endpoints.view, urlData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(url, { params: this.parseFilter(params), headers: this.headers })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data.data];
                    case 3:
                        e_2 = _a.sent();
                        throw e_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AbstractApiService.prototype.list = function (urlData, params) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.endpoints.list === undefined) {
                            throw new Error('Not defined endpoint');
                        }
                        url = this.fillUrl(this.config.endpoints.list, urlData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].get(url, { params: this.parseFilter(params), headers: this.headers })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.data.data];
                    case 3:
                        e_3 = _a.sent();
                        throw e_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AbstractApiService.prototype.update = function (data, urlData) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.endpoints.update === undefined) {
                            throw new Error('Not defined endpoint');
                        }
                        url = this.fillUrl(this.config.endpoints.update, urlData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"].patch(url, data, { headers: this.headers })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.getIdentifierFromResponse(result.data)];
                    case 3:
                        e_4 = _a.sent();
                        throw e_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AbstractApiService.prototype["delete"] = function (urlData) {
        return __awaiter(this, void 0, void 0, function () {
            var url, result, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.config.endpoints["delete"] === undefined) {
                            throw new Error('Not defined endpoint');
                        }
                        url = this.fillUrl(this.config.endpoints["delete"], urlData);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1["default"]["delete"](url, { headers: this.headers })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, this.getIdentifierFromResponse(result.data)];
                    case 3:
                        e_5 = _a.sent();
                        throw e_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AbstractApiService.prototype.getIdentifierFromResponse = function (response) {
        var data = response.data;
        if (data) {
            return data.id;
        }
        return null;
    };
    AbstractApiService.prototype.parseFilter = function (filters) {
        var parsed = {};
        _.forEach(filters, function (element, key) {
            if (typeof (element) === typeof ([])) {
                parsed[key] = _.join(element, ',');
            }
            else {
                parsed[key] = element;
            }
        });
        return parsed;
    };
    AbstractApiService.prototype.fillUrl = function (url, data) {
        if (_.isEmpty(data) === false) {
            var uri = new URITemplate_1["default"](this.getBaseUrl() + url);
            var endpointUrl = uri.expand(data);
            return endpointUrl;
        }
        return this.getBaseUrl() + url;
    };
    AbstractApiService.prototype.parseParams = function (params) {
        if (params === undefined || params === null) {
            return params;
        }
        var parsed = {};
        _.forEach(params, function (value, key) {
            if (_.isBoolean(value)) {
                parsed[key] = (value === true) ? '1' : '0';
            }
            else {
                parsed[key] = value;
            }
        });
        return parsed;
    };
    return AbstractApiService;
}());
exports.AbstractApiService = AbstractApiService;
