import axios from 'axios'
// @ts-ignore
import URITemplate from 'urijs/src/URITemplate'
import * as _ from 'lodash'
import { IConfig } from './Config'

export abstract class AbstractApiService {
  protected config: IConfig

  protected headers: object = {}

  constructor (config: IConfig) {
    this.config = config
  }

  /**
   *
   * @param data to send via json Body
   * @param urlData any path variables
   * @param params for query
   */
  public async create (data: any, urlData: any, params: any) {
    if (this.config.endpoints.create === undefined) {
      throw new Error('Not defined endpoint')
    }
    let url = this.fillUrl(this.config.endpoints.create, urlData)
    try {
      let parsedParams = this.parseParams(params)
      let result = await axios.post(url, data, { headers: this.headers, params: parsedParams })
      return result.data.data
    } catch (e) {
      throw e
    }
  }

  public async view (urlData: any, params: any) {
    if (this.config.endpoints.view === undefined) {
      throw new Error('Not defined endpoint')
    }
    let url = this.fillUrl(this.config.endpoints.view, urlData)
    try {
      let result = await axios.get(url, { params: this.parseFilter(params), headers: this.headers })
      return result.data.data
    } catch (e) {
      throw e
    }
  }

  public async list (urlData: any, params: any) {
    if (this.config.endpoints.list === undefined) {
      throw new Error('Not defined endpoint')
    }
    let url = this.fillUrl(this.config.endpoints.list, urlData)
    try {
      let result = await axios.get(url, { params: this.parseFilter(params), headers: this.headers })
      return result.data.data
    } catch (e) {
      throw e
    }
  }

  public async update (data: any, urlData: any) {
    if (this.config.endpoints.update === undefined) {
      throw new Error('Not defined endpoint')
    }
    let url = this.fillUrl(this.config.endpoints.update, urlData)
    try {
      let result = await axios.patch(url, data, { headers: this.headers })
      return this.getIdentifierFromResponse(result.data)
    } catch (e) {
      throw e
    }
  }

  public async delete (urlData: any) {
    if (this.config.endpoints.delete === undefined) {
      throw new Error('Not defined endpoint')
    }
    let url = this.fillUrl(this.config.endpoints.delete, urlData)
    try {
      let result = await axios.delete(url, { headers: this.headers })
      return this.getIdentifierFromResponse(result.data)
    } catch (e) {
      throw e
    }
  }

  protected getIdentifierFromResponse (response: any) {
    let data = response.data
    if (data) {
      return data.id
    }
    return null
  }

  protected parseFilter (filters: any) {
    let parsed: any = {}
    _.forEach(filters, (element: any, key: string) => {
      if (typeof (element) === typeof ([])) {
        parsed[key] = _.join(element, ',')
      } else {
        parsed[key] = element
      }
    })
    return parsed
  }

  protected fillUrl (url: string, data: any) {
    if (_.isEmpty(data) === false) {
      let uri = new URITemplate(this.getBaseUrl() + url)
      let endpointUrl = uri.expand(data)
      return endpointUrl.toString()
    }
    return this.getBaseUrl() + url
  }

  protected abstract getBaseUrl (): string

  protected parseParams (params: any) {
    if (params === undefined || params === null) { return params }
    let parsed: any = {}
    _.forEach(params, (value, key) => {
      if (_.isBoolean(value)) {
        parsed[key] = (value === true) ? '1' : '0'
      } else {
        parsed[key] = value
      }
    })
    return parsed
  }
}
