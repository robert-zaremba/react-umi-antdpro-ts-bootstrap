// use localStorage to store the authority info, which might be sent from server
// auth can be "admin", ["admin"]
export function getAuthority (auth?: string | Array<string>) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const _auth = auth || localStorage.getItem('antd-pro-authority') || ''
  if (_auth === '') {
    return ['admin']
  }
  auth = _auth
  let authority: Array<string>
  // let's parse string
  if (typeof auth === 'string') {
    try {
      const parsed = JSON.parse(auth)
      if (typeof parsed === 'string') {
        authority = [parsed]
      } else {
        authority = parsed
      }
    } catch (e) {
      authority = [auth]
    }
  } else {
    authority = auth
  }
  return authority
}

export function setAuthority (authority: string | Array<string>) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority))
}
