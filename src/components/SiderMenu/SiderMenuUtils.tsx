import { urlToList } from '@/utils/url'
import pathToRegexp from 'path-to-regexp'
import { MenuDataProps } from '@/components/SiderMenu/SiderMenu'

/**
 * Recursively flatten the data
 * [{path:string},{path:string}] => {path,path2}
 * @param  menus
 */
export const getFlatMenuKeys = (menuData: Array<MenuDataProps>) => {
  let keys: Array<string> = []
  for (let item of menuData) {
    debugger
    keys.push(item.path)
    if (item.children) {
      keys = keys.concat(getFlatMenuKeys(item.children))
    }
  }
  return keys
}

export const getMenuMatches = (flatMenuKeys, path) =>
  flatMenuKeys.filter(item => {
    if (item) {
      return pathToRegexp(item).test(path)
    }
    return false
  })
/**
 * 获得菜单子节点
 * @memberof SiderMenu
 */
export const getDefaultCollapsedSubMenus = props => {
  const {
    location: { pathname },
    flatMenuKeys
  } = props
  return urlToList(pathname)
    .map(item => getMenuMatches(flatMenuKeys, item)[0])
    .filter(item => item)
}
