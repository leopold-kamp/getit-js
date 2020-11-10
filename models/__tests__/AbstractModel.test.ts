import { TestModel } from '../__mocks__/TestModel';

describe('AbstractModel tests', () => {
	test('Test mapping', () => {
		const mapped = TestModel.fromApi(TestModel, {
        name: 'test',
        soMe_K3y: 'strange_key',
        deep: {
          name: 'name_deep',
          soMe_K3y: 'deep_key',
          deep_list: [
            {
              name: 'dl1',
              soMe_K3y: 'strange_key_dl1'
            },
            {
              name: 'dl2',
              soMe_K3y: 'strange_key_dl2'
            }
          ]
        }
    })
    expect(mapped).toBeInstanceOf(TestModel)
    expect(mapped.name).toEqual('test')
    expect(mapped.otherKey).toEqual('strange_key')
    expect(mapped.deep).toBeInstanceOf(TestModel)
    expect(mapped.deep.deepList).toHaveLength(2)
    expect(mapped.deep.deepList[0]).toBeInstanceOf(TestModel)
  })
	// tslint:disable-next-line: only-arrow-functions
	test('Test beforeUpdate', function () {
		const mapped = TestModel.fromApi(TestModel, {
      name: 'test',
      soMe_K3y: 'strange_key',
      deep: {
        name: 'name_deep',
        soMe_K3y: 'deep_key',
        deep_list: [
          {
            name: 'dl1',
            soMe_K3y: 'strange_key_dl1'
          },
          {
            name: 'dl2',
            soMe_K3y: 'strange_key_dl2'
          }
        ]
      }
    })
    mapped.beforeUpdate()
    expect(mapped.loading).toBeTruthy()
    expect(mapped.deep.loading).toBeTruthy()
    expect(mapped.deep.deepList[0].loading).toBeTruthy()
	})
	test('Test beforeCreate', () => {
		const mapped = TestModel.fromApi(TestModel, {
      name: 'test',
      soMe_K3y: 'strange_key',
      deep: {
        name: 'name_deep',
        soMe_K3y: 'deep_key',
        deep_list: [
          {
            name: 'dl1',
            soMe_K3y: 'strange_key_dl1'
          },
          {
            name: 'dl2',
            soMe_K3y: 'strange_key_dl2'
          }
        ]
      }
    })
    mapped.beforeCreate()
    expect(mapped.loading).toBeUndefined()
    expect(mapped.deep.loading).toBeUndefined()
    expect(mapped.deep.deepList[0].loading).toBeUndefined()
	})
})
