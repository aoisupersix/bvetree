import { execParseExpression, assertMapAstNode } from './util'
import { NumberNode, NodeType } from '#/map/ast-nodes'

describe('MapV2Parser', () => {
  describe('#parse', () => {
    it('number', () => {
      const number = execParseExpression('100;') as NumberNode
      expect(number).toBeTruthy()
      expect(number.type).toBe(NodeType.Number)
      expect(number.value).toBe('100')
      assertMapAstNode(number, 1, 0, 1, 2, '100')
    })
  })
})
