import path from 'path'

const isProd = process.env.NODE_ENV === 'production'

require('dotenv-safe').config({
  path: isProd ? path.resolve('../.env') : path.resolve('./.env'),
  sample: isProd
    ? path.resolve('../.env.example')
    : path.resolve('./.env.example')
})

interface IApplicationConstants {
  isProd?: boolean
  server?: {
    port: number
  }
  db?: {
    url: string
    name: string
    user: string
    pass: string
  }
}

const commonConstants: IApplicationConstants = {
  isProd,
  server: {
    port: 8080
  },
  db: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
}
const devConstants: IApplicationConstants = {}

const prodConstants: IApplicationConstants = {}

// tslint:disable:prefer-object-spread
export const constants = Object.assign(
  { ...commonConstants },
  isProd ? prodConstants : devConstants
)

export default constants
