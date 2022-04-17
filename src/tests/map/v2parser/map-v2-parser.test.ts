import { MapV2Parser } from '#/map/v2parser/map-v2-parser'
import {
  DistanceStatementNode,
  NodeType,
  RootNode,
  ValueNode,
} from '#/map/ast-nodes'
import { assertMapAstNode } from './util'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('parse empty string', () => {
      const node = new MapV2Parser().parse('') as RootNode
      assertMapAstNode(node, NodeType.Root, 1, 0, 1, 0, '')
      expect(node.statements.length).toBe(0)
    })

    it('the end position of a node also considers whitespace', () => {
      const ast = new MapV2Parser().parse('Curve. SetGauge();')
      assertMapAstNode(ast, NodeType.Root, 1, 0, 1, 18, 'Curve. SetGauge();')
    })

    it('parse number distance statement', () => {
      const node = new MapV2Parser().parse('100;') as RootNode
      assertMapAstNode(node, NodeType.Root, 1, 0, 1, 4, '100;')

      expect(node.statements.length).toBe(1)
      const distance = node.statements[0] as DistanceStatementNode
      assertMapAstNode(distance, NodeType.DistanceStatement, 1, 0, 1, 4, '100;')

      const number = distance.value as ValueNode
      assertMapAstNode(number, NodeType.Number, 1, 0, 1, 3, '100')
      expect(number.value).toBe('100')
    })
  })
})
