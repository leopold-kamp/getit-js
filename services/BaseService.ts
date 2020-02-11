import AbstractService from './AbstractService'
import { IConfig } from './Config'

export default class BaseService extends AbstractService {
  constructor (config: IConfig) {
    super(config)
  }
}
