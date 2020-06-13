import { MapV2Parser } from '#/map/v2parser/map-v2-parser'
import { RootNode } from '#/map/ast-nodes/root-node'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('parse empty string', () => {
      const ast = new MapV2Parser().parse('') as RootNode
      expect(ast).toBeTruthy()
    })

    it('parse number distance statement', () => {
      const ast = new MapV2Parser().parse('100;') as RootNode
      expect(ast).toBeTruthy()
    })
  })
})
