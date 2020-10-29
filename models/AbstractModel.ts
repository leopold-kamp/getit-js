/**
 * @Author: Leopold Kamp <develop@leopold-kamp.de>
 * @Date: 2020-01-19 14:16:41
 */
import * as _ from 'lodash'
import {
  IMappingConfig,
  EMappingType,
  IMappingConfigItem
} from './IMappingConfig'

export abstract class AbstractModel {

  public static fromApi (Type: any, data: any) {
    const c = new Type()
    c.fill(data)
    return c
  }

  public static toApiArray (models: AbstractModel[] | any[], toSnakeCase = false) {
    const array: any[] = []
    _.forEach(models, (model) => {
      if (_.isArray(model)) {
        model = this.toApiArray(model, toSnakeCase)
      } else if (_.isObject(model)) {
        model = this.toApi(model, toSnakeCase)
      }
      array.push(model)
    })
    return array
  }

  public static toApi (model: AbstractModel | any, toSnakeCase = false) {
    const obj: any = {}
    _.forEach(model, (value: any, key: string) => {
      if ( _.isArray(value) ) {
        value = this.toApiArray(value, toSnakeCase)
      } else if (_.isObject(value)) {
        value = this.toApi(value, toSnakeCase)
      }
      if (toSnakeCase) {
        obj[_.snakeCase(key)] = value
      } else {
        obj[key] = value
      }
    })
    return obj
  }

  public fill (object: any) {
    const config = this.getMappingConfig().mappings
    _.forEach(object, (value: any, key: string) => {
      const self: any = this
      const mappedKeyConfig = _.find(config, (item: IMappingConfigItem) => {
        if (item.sourceKey !== undefined) {
          const isSourceKey = item.sourceKey === key
          if (isSourceKey || item.sourceKeyOptional !== true) {
            return isSourceKey
          }
        }
        const isSame = item.key === key
        if (isSame) {
          return isSame
        }
        return item.key === _.camelCase(key)
      })
      if (mappedKeyConfig !== undefined) {
        if (mappedKeyConfig.type !== undefined) {
          value = this.parseType(value, mappedKeyConfig)
        }
        self[mappedKeyConfig.key] = value
      }
    })
    return this
  }

  protected parseType (origin: any, config: IMappingConfigItem): any {
    switch (config.type) {
      case EMappingType.STRING:
        return _.toString(origin)
      case EMappingType.NUMBER:
        if (_.isNumber(origin)) {
          return _.toNumber(origin)
        }
        return origin
      case EMappingType.DATE:
        if (_.isDate(origin) || _.isString(origin)) {
          return new Date(`${origin}`)
        }
        return origin
      case EMappingType.MODEL:
        if (config === undefined || config.model === undefined) {
          throw new Error('mapping_definition_missmatch')
        } else {
          if (_.isArray(origin)) {
            return _.map(origin, (value: any) => {
              const parsed = new config.model()
              parsed.fill(value)
              return parsed
            })
          }
          return config.model.fromApi(config.model, origin)
        }
        return origin
      default:
        return origin
    }
  }

  /**
   * Return the Mapping config for a model
   * TODO: possible type parsing
   * TODO: Deep parsing -> differ between obj and string ...
   */
  protected abstract getMappingConfig (): IMappingConfig
}
