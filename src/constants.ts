const isProd = process.env.NODE_ENV === 'production'

interface IApplicationConstants {
  isProd?: boolean
  server?: {
    port?: number
  }
}

const commonConstants: IApplicationConstants = {
  isProd,
  server: {
    port: 8080
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
