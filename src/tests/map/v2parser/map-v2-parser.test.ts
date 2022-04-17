import { MapV2Parser } from '#/map/v2parser/map-v2-parser'
import { DistanceStatementNode, NumberNode, RootNode } from '#/map/ast-nodes'
import { assertMapAstNode } from './util'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('parse empty string', () => {
      const ast = new MapV2Parser().parse('') as RootNode
      expect(ast).toBeTruthy()
    })

    it('the end position of a node also considers whitespace', () => {
      const ast = new MapV2Parser().parse('Curve. SetGauge();') as RootNode
      assertMapAstNode(ast, 1, 0, 1, 18, 'Curve. SetGauge();')
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
