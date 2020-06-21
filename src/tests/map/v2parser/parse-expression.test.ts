import { execParseExpression, assertMapAstNode } from './util'
import * as ast from '#/map/ast-nodes'

describe('MapV2Parser', () => {
  describe('#parse_expressions', () => {
    it('parens', () => {
      const parens = execParseExpression('(0);') as ast.ParensNode
      expect(parens).toBeTruthy()
      expect(parens.type).toBe(ast.NodeType.Parens)
      assertMapAstNode(parens, 1, 0, 1, 2, '(0)')
      assertMapAstNode(parens.innerValue, 1, 1, 1, 1, '0')
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

    it('abs', () => {
      const abs = execParseExpression('abs(0);') as ast.AbsNode
      expect(abs).toBeTruthy()
      expect(abs.type).toBe(ast.NodeType.Abs)
      assertMapAstNode(abs, 1, 0, 1, 6, 'abs(1)')
      assertMapAstNode(abs.value, 1, 5, 1, 5, '1')
    })

    it('atan2', () => {
      const atan2 = execParseExpression('atan2(0,1);') as ast.Atan2Node
      expect(atan2).toBeTruthy()
      expect(atan2.type).toBe(ast.NodeType.Atan2)
      assertMapAstNode(atan2, 1, 0, 1, 9, 'atan2(0,1)')
      assertMapAstNode(atan2.y, 1, 6, 1, 6, '0')
      assertMapAstNode(atan2.x, 1, 8, 1, 8, '1')
    })

    it('ceil', () => {
      const ceil = execParseExpression('ceil(0);') as ast.CeilNode
      expect(ceil).toBeTruthy()
      expect(ceil.type).toBe(ast.NodeType.Ceil)
      assertMapAstNode(ceil, 1, 0, 1, 6, 'ceil(0)')
      assertMapAstNode(ceil.value, 1, 5, 1, 5, '0')
    })

    it('cos', () => {
      const cos = execParseExpression('cos(0);') as ast.CosNode
      expect(cos).toBeTruthy()
      expect(cos.type).toBe(ast.NodeType.Cos)
      assertMapAstNode(cos, 1, 0, 1, 5, 'cos(0)')
      assertMapAstNode(cos.value, 1, 4, 1, 4, '0')
    })

    it('exp', () => {
      const exp = execParseExpression('exp(0);') as ast.ExpNode
      expect(exp).toBeTruthy()
      expect(exp.type).toBe(ast.NodeType.Exp)
      assertMapAstNode(exp, 1, 0, 1, 5, 'exp(0)')
      assertMapAstNode(exp.value, 1, 4, 1, 4, '0')
    })

    it('floor', () => {
      const floor = execParseExpression('floor(0);') as ast.FloorNode
      expect(floor).toBeTruthy()
      expect(floor.type).toBe(ast.NodeType.Floor)
      assertMapAstNode(floor, 1, 0, 1, 7, 'floor(0)')
      assertMapAstNode(floor.value, 1, 6, 1, 6, '0')
    })

    it('log', () => {
      const log = execParseExpression('log(0);') as ast.LogNode
      expect(log).toBeTruthy()
      expect(log.type).toBe(ast.NodeType.Log)
      assertMapAstNode(log, 1, 0, 1, 5, 'log(0)')
      assertMapAstNode(log.value, 1, 4, 1, 4, '0')
    })

    it('pow', () => {
      const pow = execParseExpression('pow(0,1);') as ast.PowNode
      expect(pow).toBeTruthy()
      expect(pow.type).toBe(ast.NodeType.Pow)
      assertMapAstNode(pow, 1, 0, 1, 7, 'pow(0,1)')
      assertMapAstNode(pow.x, 1, 4, 1, 4, '0')
      assertMapAstNode(pow.y, 1, 6, 1, 6, '1')
    })

    it('rand', () => {
      const rand = execParseExpression('rand(0);') as ast.RandNode
      expect(rand).toBeTruthy()
      expect(rand.type).toBe(ast.NodeType.Rand)
      assertMapAstNode(rand, 1, 0, 1, 6, 'rand(0)')
      expect(rand.value).toBeTruthy()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      assertMapAstNode(rand.value!, 1, 5, 1, 5, '0')
    })

    it('empty argument rand', () => {
      const rand = execParseExpression('rand();') as ast.RandNode
      expect(rand).toBeTruthy()
      expect(rand.type).toBe(ast.NodeType.Rand)
      assertMapAstNode(rand, 1, 0, 1, 5, 'rand()')
      expect(rand.value).toBeFalsy()
    })

    it('sin', () => {
      const sin = execParseExpression('sin(0);') as ast.SinNode
      expect(sin).toBeTruthy()
      expect(sin.type).toBe(ast.NodeType.Sin)
      assertMapAstNode(sin, 1, 0, 1, 5, 'sin(0)')
      assertMapAstNode(sin.value, 1, 4, 1, 4, '0')
    })

    it('sqrt', () => {
      const sqrt = execParseExpression('sqrt(0);') as ast.SqrtNode
      expect(sqrt).toBeTruthy()
      expect(sqrt.type).toBe(ast.NodeType.Sqrt)
      assertMapAstNode(sqrt, 1, 0, 1, 6, 'sqrt(0)')
      assertMapAstNode(sqrt.value, 1, 5, 1, 5, '0')
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
