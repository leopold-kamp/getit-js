"use strict";
exports.__esModule = true;
exports.AbstractModel = void 0;
/**
 * @Author: Leopold Kamp <develop@leopold-kamp.de>
 * @Date: 2020-01-19 14:16:41
 */
var _ = require("lodash");
var IMappingConfig_1 = require("./IMappingConfig");
var AbstractModel = /** @class */ (function () {
    function AbstractModel() {
    }
    AbstractModel.fromApi = function (Type, data) {
        var c = new Type();
        c.fill(data);
        return c;
    };
    AbstractModel.toApiArray = function (models, toSnakeCase) {
        var _this = this;
        if (toSnakeCase === void 0) { toSnakeCase = false; }
        var array = [];
        _.forEach(models, function (model) {
            if (_.isArray(model)) {
                model = _this.toApiArray(model, toSnakeCase);
            }
            else if (_.isObject(model)) {
                model = _this.toApi(model, toSnakeCase);
            }
            array.push(model);
        });
        return array;
    };
    AbstractModel.toApi = function (model, toSnakeCase) {
        var _this = this;
        if (toSnakeCase === void 0) { toSnakeCase = false; }
        var obj = {};
        _.forEach(model, function (value, key) {
            if (_.isArray(value)) {
                value = _this.toApiArray(value, toSnakeCase);
            }
            else if (_.isObject(value)) {
                value = _this.toApi(value, toSnakeCase);
            }
            if (toSnakeCase) {
                obj[_.snakeCase(key)] = value;
            }
            else {
                obj[key] = value;
            }
        });
        return obj;
    };
    AbstractModel.prototype.fill = function (object) {
        var _this = this;
        var config = this.getMappingConfig().mappings;
        _.forEach(object, function (value, key) {
            var self = _this;
            var mappedKeyConfig = _.find(config, function (item) {
                if (item.sourceKey !== undefined) {
                    var isSourceKey = item.sourceKey === key;
                    if (isSourceKey || item.sourceKeyOptional !== true) {
                        return isSourceKey;
                    }
                }
                var isSame = item.key === key;
                if (isSame) {
                    return isSame;
                }
                return item.key === _.camelCase(key);
            });
            if (mappedKeyConfig !== undefined) {
                if (mappedKeyConfig.type !== undefined) {
                    value = _this.parseType(value, mappedKeyConfig);
                }
                self[mappedKeyConfig.key] = value;
            }
        });
        return this;
    };
    AbstractModel.prototype.parseType = function (origin, config) {
        switch (config.type) {
            case IMappingConfig_1.EMappingType.STRING:
                return _.toString(origin);
            case IMappingConfig_1.EMappingType.NUMBER:
                if (_.isNumber(origin)) {
                    return _.toNumber(origin);
                }
                return origin;
            case IMappingConfig_1.EMappingType.DATE:
                if (_.isDate(origin) || _.isString(origin)) {
                    return new Date("" + origin);
                }
                return origin;
            case IMappingConfig_1.EMappingType.MODEL:
                if (config === undefined || config.model === undefined) {
                    throw new Error('mapping_definition_missmatch');
                }
                else {
                    if (_.isArray(origin)) {
                        return _.map(origin, function (value) {
                            var parsed = new config.model();
                            parsed.fill(value);
                            return parsed;
                        });
                    }
                    return config.model.fromApi(config.model, origin);
                }
                return origin;
            default:
                return origin;
        }
    };
    return AbstractModel;
}());
exports.AbstractModel = AbstractModel;
