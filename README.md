[![npm version](https://badge.fury.io/js/getit-js.svg)](https://badge.fury.io/js/getit-js)

# getit-js #
This is a small helper package for parsing API Responses.
This is still under construction.

## Usage ##

Create classes that extend ```AbstractModel```

### Example ###
```ts
class OtherClass extends AbstractModel {
  description!: string

  protected getMappingConfig (): IMappingConfig {
    return {
      mappings: [
        {
          key: 'description'
        }
      ]
    }
  }
}

class User extends AbstractModel {
  loading: false
  reference!: number
  email!: string
  details!: OtherClass

  protected getMappingConfig (): IMappingConfig {
    return {
      mappings: [
        {
          key: 'reference',
          sourceKey: 'id'
        },
        {
          key: 'email'
        },
        {
          key: 'details',
          type: EMappingType.MODEL,
          model: OtherClass
        }
      ]
    }
  }

  public beforeUpdate () {
    this.loading = true
    super.beforeUpdate()
  }
}
```

Note: snake_case will be parsed to camelCase by default.

## Contributions ##

Feel free to add feedback, and ideas to make this better :)
