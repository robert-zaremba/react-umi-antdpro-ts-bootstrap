// tslint:disable-next-line no-useless-escape max-line-length
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export function isUrl (path: string): boolean {
  return reg.test(path)
}

// eg: /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList (url: string) {
  const urllist = url.split('/').filter(i => i)
  return urllist.map((_, index) => '/' + urllist.slice(0, index + 1).join('/'))
}
