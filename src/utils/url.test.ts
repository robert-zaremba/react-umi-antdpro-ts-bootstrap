import { isUrl, urlToList } from './url'

describe('isUrl tests', () => {
  it('should return false for invalid and corner case inputs', () => {
    // Wrong types are handled by compiler :)
    expect(isUrl('')).toBeFalsy()
  })

  it('should return false for invalid URLs', () => {
    expect(isUrl('foo')).toBeFalsy()
    expect(isUrl('bar')).toBeFalsy()
    expect(isUrl('bar/test')).toBeFalsy()
    expect(isUrl('http:/example.com/')).toBeFalsy()
    expect(isUrl('ttp://example.com/')).toBeFalsy()
  })

  it('should return true for valid URLs', () => {
    expect(isUrl('http://example.com/')).toBeTruthy()
    expect(isUrl('https://example.com/')).toBeTruthy()
    expect(isUrl('http://example.com/test/123')).toBeTruthy()
    expect(isUrl('https://example.com/test/123')).toBeTruthy()
    expect(isUrl('http://example.com/test/123?foo=bar')).toBeTruthy()
    expect(isUrl('https://example.com/test/123?foo=bar')).toBeTruthy()
    expect(isUrl('http://www.example.com/')).toBeTruthy()
    expect(isUrl('https://www.example.com/')).toBeTruthy()
    expect(isUrl('http://www.example.com/test/123')).toBeTruthy()
    expect(isUrl('https://www.example.com/test/123')).toBeTruthy()
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBeTruthy()
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBeTruthy()
  })
})

describe('test urlToList', () => {
  it('A path', () => {
    expect(urlToList('/userinfo')).toEqual(['/userinfo'])
  })
  it('Secondary path', () => {
    expect(urlToList('/userinfo/2144')).toEqual(['/userinfo', '/userinfo/2144'])
  })
  it('Three paths', () => {
    expect(urlToList('/userinfo/2144/addr')).toEqual([
      '/userinfo',
      '/userinfo/2144',
      '/userinfo/2144/addr'
    ])
  })
})
