import {FromSchema} from 'json-schema-to-ts'

export const authenticationSchema = {
  type: 'object',
  properties: {
    isAuthNecessary: {
      type: 'boolean',
      default: false,
    },
    userInfoUrl: {
      type: 'string',
    },
  },
  required: ['isAuthNecessary'],
} as const

export type Authentication = FromSchema<typeof authenticationSchema>
