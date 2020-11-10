import { AbstractModel } from '../AbstractModel'
import { EMappingType, IMappingConfig } from '../IMappingConfig'
export class TestModel extends AbstractModel {
  constructor () {
    super()
  }
  loading = false
  name!: string
  otherKey!: number
  deep?: TestModel
  deepList?: TestModel[]
  protected getMappingConfig (): IMappingConfig {
    return {
      mappings: [
        {
          key: 'name'
        },
        {
          key: 'otherKey',
          sourceKey: 'soMe_K3y'
        },
        {
          key: 'deep',
          type: EMappingType.MODEL,
          model: TestModel
        },
        {
          key: 'deepList',
          type: EMappingType.MODEL,
          model: TestModel
        }
      ]
    }
  }
  public beforeUpdate () {
    super.beforeUpdate()
    this.loading = true
  }
  public beforeCreate () {
    super.beforeCreate()
    delete this.loading
  }
}