import { execParseExpression, assertMapAstNode } from './util'
import * as ast from '#/map/ast-nodes'

describe('MapV2Parser', () => {
  describe('#parse_expressions', () => {
    it('parens', () => {
      // In case of parens, return inner expression
      const number = execParseExpression('(0);') as ast.NumberNode
      expect(number).toBeTruthy()
      expect(number.type).toBe(ast.NodeType.Number)
      expect(number.value).toBe('0')
      assertMapAstNode(number, 1, 1, 1, 1, '0')
    })

    it('unary', () => {
      const unary = execParseExpression('-4;') as ast.UnaryNode
      expect(unary).toBeTruthy()
      expect(unary.type).toBe(ast.NodeType.Unary)
      expect(unary.innerValue).toBeTruthy()
      expect(unary.innerValue.type).toBe(ast.NodeType.Number)
      expect(unary.innerValue.text).toBe('4')
      assertMapAstNode(unary, 1, 0, 1, 1, '-4')
    })

    it('addition', () => {
      const addition = execParseExpression('1 + 1;') as ast.AdditionNode
      expect(addition).toBeTruthy()
      expect(addition.type).toBe(ast.NodeType.Addition)
      assertMapAstNode(addition, 1, 0, 1, 4, '1+1')
      assertMapAstNode(addition.left, 1, 0, 1, 0, '1')
      assertMapAstNode(addition.right, 1, 4, 1, 4, '1')
    })

    it('subtraction', () => {
      const subtraction = execParseExpression('1 - 1;') as ast.SubtractionNode
      expect(subtraction).toBeTruthy()
      expect(subtraction.type).toBe(ast.NodeType.Subtraction)
      assertMapAstNode(subtraction, 1, 0, 1, 4, '1-1')
      assertMapAstNode(subtraction.left, 1, 0, 1, 0, '1')
      assertMapAstNode(subtraction.right, 1, 4, 1, 4, '1')
    })

    it('multiplication', () => {
      const multiplication = execParseExpression(
        '1 * 1;'
      ) as ast.MultiplicationNode
      expect(multiplication).toBeTruthy()
      expect(multiplication.type).toBe(ast.NodeType.Multiplication)
      assertMapAstNode(multiplication, 1, 0, 1, 4, '1*1')
      assertMapAstNode(multiplication.left, 1, 0, 1, 0, '1')
      assertMapAstNode(multiplication.right, 1, 4, 1, 4, '1')
    })

    it('division', () => {
      const division = execParseExpression('1 / 1;') as ast.DivisionNode
      expect(division).toBeTruthy()
      expect(division.type).toBe(ast.NodeType.Division)
      assertMapAstNode(division, 1, 0, 1, 4, '1/1')
      assertMapAstNode(division.left, 1, 0, 1, 0, '1')
      assertMapAstNode(division.right, 1, 4, 1, 4, '1')
    })

    it('modulo', () => {
      const modulo = execParseExpression('1 % 1;') as ast.ModuloNode
      expect(modulo).toBeTruthy()
      expect(modulo.type).toBe(ast.NodeType.Modulo)
      assertMapAstNode(modulo, 1, 0, 1, 4, '1%1')
      assertMapAstNode(modulo.left, 1, 0, 1, 0, '1')
      assertMapAstNode(modulo.right, 1, 4, 1, 4, '1')
    })

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
