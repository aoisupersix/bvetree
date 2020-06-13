import { MapV2Parser } from '#/map/v2parser/map-v2-parser'
import { RootNode } from '#/map/ast-nodes/root-node'
import { DistanceStatementNode } from '#/map/ast-nodes/distance-statement-node'
import { NumberNode } from '#/map/ast-nodes/number-node'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('parse empty string', () => {
      const ast = new MapV2Parser().parse('') as RootNode
      expect(ast).toBeTruthy()
    })

    it('parse number distance statement', () => {
      const ast = new MapV2Parser().parse('100;') as RootNode
      expect(ast).toBeTruthy()
      expect(ast.statements.length).toBe(1)
      const distance = ast.statements[0] as DistanceStatementNode
      expect(distance).toBeTruthy()
      const number = distance.value as NumberNode
      expect(number.value).toBe('100')
    })
  })
})
