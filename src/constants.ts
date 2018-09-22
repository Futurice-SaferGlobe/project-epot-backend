import dotenv from 'dotenv-safe'

dotenv.config({
  path: '.env',
  sample: '.env.example'
})

const isProd = process.env.NODE_ENV === 'production'

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
  }
}
const devConstants: IApplicationConstants = {
  db: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
}

const prodConstants: IApplicationConstants = {
  db: {
    url: null,
    name: null,
    user: null,
    pass: null
  }
}

// tslint:disable:prefer-object-spread
export const constants = Object.assign(
  { ...commonConstants },
  isProd ? prodConstants : devConstants
)

export default constants
