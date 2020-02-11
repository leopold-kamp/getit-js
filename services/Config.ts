export interface IConfig {
  endpoints: IEndpoints
}

export interface IEndpoints {
  view?: string
  list?: string
  create?: string
  update?: string
  delete?: string
}
