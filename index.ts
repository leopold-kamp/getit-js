import { AbstractModel as model } from './models/AbstractModel'
import { IMappingConfig as config, IMappingConfigItem as configItem } from './models/IMappingConfig'
import ApiService from './services/AbstractService'

export const AbstractModel = model
export interface IMappingConfig extends config {}
export interface IMappingConfigItem extends configItem {}
export abstract class AbstractApiService extends ApiService {}
