import { MapV2Parser } from '#/map/v2parser/map-v2-parser'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('parse root node', () => {
      const cst = new MapV2Parser().parse('BveTs Map 2.02')
      expect(cst._version.text).toBe('2.02')
    })
  })
})
