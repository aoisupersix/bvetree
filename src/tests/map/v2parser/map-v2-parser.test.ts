import { MapV2Parser } from '#/map/v2parser/map-v2-parser'
import { RootNode } from '#/map/ast-nodes/root-node'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('parse root node', () => {
      const ast = new MapV2Parser().parse('BveTs Map 2.02')
      expect(ast instanceof RootNode).toBeTruthy()
      const rootNode = ast as RootNode
      expect(rootNode.version.text).toBe('2.02')
      expect(rootNode.encoding).toBeUndefined()
    })
  })
})
