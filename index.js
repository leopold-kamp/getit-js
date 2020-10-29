"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.AbstractApiService = exports.EMappingType = exports.AbstractModel = void 0;
var AbstractModel_1 = require("./models/AbstractModel");
__createBinding(exports, AbstractModel_1, "AbstractModel");
var IMappingConfig_1 = require("./models/IMappingConfig");
__createBinding(exports, IMappingConfig_1, "EMappingType");
var AbstractService_1 = require("./services/AbstractService");
__createBinding(exports, AbstractService_1, "AbstractApiService");
