import { Authorized as RenderAuthorized } from 'ant-design-pro'
import { getAuthority } from './authority'

// @ts-ignore
let Authorized = RenderAuthorized(getAuthority(undefined))

// Reload the rights component
const reloadAuthorized = () => {
  // @ts-ignore
  Authorized = RenderAuthorized(getAuthority(undefined))
}

export { reloadAuthorized }
export default Authorized
