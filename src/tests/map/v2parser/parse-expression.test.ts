import { execParseExpression, assertMapAstNode } from './util'
import * as ast from '#/map/ast-nodes'

describe('MapV2Parser', () => {
  describe('#parse_unary_expressions', () => {
    it('var', () => {
      const variable = execParseExpression('$aBC_0;') as ast.VarNode
      expect(variable).toBeTruthy()
      expect(variable.type).toBe(ast.NodeType.Var)
      expect(variable.varName).toBe('aBC_0')
      assertMapAstNode(variable, 1, 0, 1, 5, '$aBC_0')
    })

    it('number', () => {
      const number = execParseExpression('100;') as ast.NumberNode
      expect(number).toBeTruthy()
      expect(number.type).toBe(ast.NodeType.Number)
      expect(number.value).toBe('100')
      assertMapAstNode(number, 1, 0, 1, 2, '100')
    })

    it('empty string', () => {
      const string = execParseExpression(`'';`) as ast.StringNode
      expect(string).toBeTruthy()
      expect(string.type).toBe(ast.NodeType.String)
      expect(string.value).toBe('')
      assertMapAstNode(string, 1, 0, 1, 1, `''`)
    })

    it('reserved word string', () => {
      const string = execParseExpression(`'Curve';`) as ast.StringNode
      expect(string).toBeTruthy()
      expect(string.type).toBe(ast.NodeType.String)
      expect(string.value).toBe('Curve')
      assertMapAstNode(string, 1, 0, 1, 6, `'Curve'`)
    })

    it('distance', () => {
      const distance = execParseExpression('dIsTAnce;') as ast.DistanceNode
      expect(distance).toBeTruthy()
      expect(distance.type).toBe(ast.NodeType.Distance)
      assertMapAstNode(distance, 1, 0, 1, 7, 'dIsTAnce')
    })
  })
})
