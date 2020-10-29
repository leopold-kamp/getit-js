export interface IMappingConfig {
  mappings: IMappingConfigItem[]
  updateable?: string[]
  primaryKey?: string
  createable?: string[]
}

export interface IMappingConfigItem {
  /**
   * The Key to parse to
   */
  key: string
  /**
   * the Key of the source e.g. from API request, will fallback to key if not set
   */
  sourceKey?: string
  /**
   * Wether source key is optional. If true it will fall back to key if sourceKey not found/set
   */
  sourceKeyOptional?: boolean
  /**
   * Optional
   * if the type is different set it here
   */
  type?: EMappingType
  /**
   * Optional
   * SourceType
   */
  sourceType?: EMappingType
  /**
   * Model class
   */
  model?: any
  /**
   * if mapping is List
   */
  isList?: boolean
}

export enum EMappingType {
  STRING,
  NUMBER,
  DATE,
  MODEL
}
