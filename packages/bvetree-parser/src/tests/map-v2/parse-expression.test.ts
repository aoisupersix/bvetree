import {
  assertMapAstNode,
  execParseExpression,
  execParseSingleStatement,
} from './util'
import * as ast from '@bvetree/ast/src/map-v2'

describe('MapV2Parser', () => {
  describe('#parse nullable expressions', () => {
    it('parse empty expression', () => {
      const node = execParseSingleStatement(
        'Curve.SetGauge();'
      ) as ast.MapFunctionNode

      expect(node.arguments.length).toBe(1)
      assertMapAstNode(node.arguments[0], ast.NodeType.Empty, 1, 15, 1, 15, '')
    })

    it('parse null expression', () => {
      const node = execParseSingleStatement(
        'Curve.SetGauge(null);'
      ) as ast.MapFunctionNode

      expect(node.arguments.length).toBe(1)
      assertMapAstNode(
        node.arguments[0],
        ast.NodeType.Null,
        1,
        15,
        1,
        19,
        'null'
      )
    })
  })

  describe('#parse expressions', () => {
    it('parens', () => {
      const parens = execParseExpression('(0);') as ast.ExpressionValueNode
      assertMapAstNode(parens, ast.NodeType.Parens, 1, 0, 1, 3, '(0)')

      const inner = parens.innerValue as ast.ValueNode
      assertMapAstNode(inner, ast.NodeType.Number, 1, 1, 1, 2, '0')
      expect(inner.value).toBe('0')
    })

    it('unary', () => {
      const unary = execParseExpression('-4;') as ast.ExpressionValueNode
      assertMapAstNode(unary, ast.NodeType.Unary, 1, 0, 1, 2, '-4')

      const inner = unary.innerValue as ast.ValueNode
      assertMapAstNode(inner, ast.NodeType.Number, 1, 1, 1, 2, '4')
      expect(inner.value).toBe('4')
    })

    it('addition', () => {
      const addition = execParseExpression('1 + 1;') as ast.InfixExpressionNode
      assertMapAstNode(addition, ast.NodeType.Addition, 1, 0, 1, 5, '1 + 1')

      const left = addition.left as ast.ValueNode
      assertMapAstNode(left, ast.NodeType.Number, 1, 0, 1, 1, '1')
      expect(left.value).toBe('1')

      const right = addition.right as ast.ValueNode
      assertMapAstNode(right, ast.NodeType.Number, 1, 4, 1, 5, '1')
      expect(right.value).toBe('1')
    })

    it('subtraction', () => {
      const subtraction = execParseExpression(
        '1 - 1;'
      ) as ast.InfixExpressionNode
      assertMapAstNode(
        subtraction,
        ast.NodeType.Subtraction,
        1,
        0,
        1,
        5,
        '1 - 1'
      )

      const left = subtraction.left as ast.ValueNode
      assertMapAstNode(left, ast.NodeType.Number, 1, 0, 1, 1, '1')
      expect(left.value).toBe('1')

      const right = subtraction.right as ast.ValueNode
      assertMapAstNode(right, ast.NodeType.Number, 1, 4, 1, 5, '1')
      expect(right.value).toBe('1')
    })

    it('multiplication', () => {
      const multiplication = execParseExpression(
        '1 * 1;'
      ) as ast.InfixExpressionNode
      assertMapAstNode(
        multiplication,
        ast.NodeType.Multiplication,
        1,
        0,
        1,
        5,
        '1 * 1'
      )

      const left = multiplication.left as ast.ValueNode
      assertMapAstNode(left, ast.NodeType.Number, 1, 0, 1, 1, '1')
      expect(left.value).toBe('1')

      const right = multiplication.right as ast.ValueNode
      assertMapAstNode(right, ast.NodeType.Number, 1, 4, 1, 5, '1')
      expect(right.value).toBe('1')
    })

    it('division', () => {
      const division = execParseExpression('1 / 1;') as ast.InfixExpressionNode
      assertMapAstNode(division, ast.NodeType.Division, 1, 0, 1, 5, '1 / 1')

      const left = division.left as ast.ValueNode
      assertMapAstNode(left, ast.NodeType.Number, 1, 0, 1, 1, '1')
      expect(left.value).toBe('1')

      const right = division.right as ast.ValueNode
      assertMapAstNode(right, ast.NodeType.Number, 1, 4, 1, 5, '1')
      expect(right.value).toBe('1')
    })

    it('modulo', () => {
      const modulo = execParseExpression('1 % 1;') as ast.InfixExpressionNode
      assertMapAstNode(modulo, ast.NodeType.Modulo, 1, 0, 1, 5, '1 % 1')

      const left = modulo.left as ast.ValueNode
      assertMapAstNode(left, ast.NodeType.Number, 1, 0, 1, 1, '1')
      expect(left.value).toBe('1')

      const right = modulo.right as ast.ValueNode
      assertMapAstNode(right, ast.NodeType.Number, 1, 4, 1, 5, '1')
      expect(right.value).toBe('1')
    })

    it('abs', () => {
      const abs = execParseExpression('abs(0);') as ast.FunctionNode
      assertMapAstNode(abs, ast.NodeType.Abs, 1, 0, 1, 6, 'abs(0)')

      expect(abs.arguments.length).toBe(1)
      const value = abs.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 4, 1, 5, '0')
      expect(value.value).toBe('0')
    })

    it('atan2', () => {
      const atan2 = execParseExpression('atan2(0,1);') as ast.FunctionNode
      assertMapAstNode(atan2, ast.NodeType.Atan2, 1, 0, 1, 10, 'atan2(0,1)')

      expect(atan2.arguments.length).toBe(2)
      const y = atan2.arguments[0] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 6, 1, 7, '0')
      expect(y.value).toBe('0')

      const x = atan2.arguments[1] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 8, 1, 9, '1')
      expect(x.value).toBe('1')
    })

    it('ceil', () => {
      const ceil = execParseExpression('ceil(0);') as ast.FunctionNode
      assertMapAstNode(ceil, ast.NodeType.Ceil, 1, 0, 1, 7, 'ceil(0)')

      expect(ceil.arguments.length).toBe(1)
      const value = ceil.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 5, 1, 6, '0')
      expect(value.value).toBe('0')
    })

    it('cos', () => {
      const cos = execParseExpression('cos(0);') as ast.FunctionNode
      assertMapAstNode(cos, ast.NodeType.Cos, 1, 0, 1, 6, 'cos(0)')

      expect(cos.arguments.length).toBe(1)
      const value = cos.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 4, 1, 5, '0')
      expect(value.value).toBe('0')
    })

    it('exp', () => {
      const exp = execParseExpression('exp(0);') as ast.FunctionNode
      assertMapAstNode(exp, ast.NodeType.Exp, 1, 0, 1, 6, 'exp(0)')

      expect(exp.arguments.length).toBe(1)
      const value = exp.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 4, 1, 5, '0')
      expect(value.value).toBe('0')
    })

    it('floor', () => {
      const floor = execParseExpression('floor(0);') as ast.FunctionNode
      assertMapAstNode(floor, ast.NodeType.Floor, 1, 0, 1, 8, 'floor(0)')

      expect(floor.arguments.length).toBe(1)
      const value = floor.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 6, 1, 7, '0')
      expect(value.value).toBe('0')
    })

    it('log', () => {
      const log = execParseExpression('log(0);') as ast.FunctionNode
      assertMapAstNode(log, ast.NodeType.Log, 1, 0, 1, 6, 'log(0)')

      expect(log.arguments.length).toBe(1)
      const value = log.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 4, 1, 5, '0')
      expect(value.value).toBe('0')
    })

    it('pow', () => {
      const pow = execParseExpression('pow(0,1);') as ast.FunctionNode
      assertMapAstNode(pow, ast.NodeType.Pow, 1, 0, 1, 8, 'pow(0,1)')

      expect(pow.arguments.length).toBe(2)
      const x = pow.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 4, 1, 5, '0')
      expect(x.value).toBe('0')

      const y = pow.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 6, 1, 7, '1')
      expect(y.value).toBe('1')
    })

    it('rand', () => {
      const rand = execParseExpression('rand(0);') as ast.FunctionNode
      assertMapAstNode(rand, ast.NodeType.Rand, 1, 0, 1, 7, 'rand(0)')

      expect(rand.arguments.length).toBe(1)
      const value = rand.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 5, 1, 6, '0')
      expect(value.value).toBe('0')
    })

    it('empty argument rand', () => {
      const rand = execParseExpression('rand();') as ast.FunctionNode
      assertMapAstNode(rand, ast.NodeType.Rand, 1, 0, 1, 6, 'rand()')

      expect(rand.arguments.length).toBe(1)
      const value = rand.arguments[0]
      expect(value).toBeNull()
    })

    it('sin', () => {
      const sin = execParseExpression('sin(0);') as ast.FunctionNode
      assertMapAstNode(sin, ast.NodeType.Sin, 1, 0, 1, 6, 'sin(0)')

      expect(sin.arguments.length).toBe(1)
      const value = sin.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 4, 1, 5, '0')
      expect(value.value).toBe('0')
    })

    it('sqrt', () => {
      const sqrt = execParseExpression('sqrt(0);') as ast.FunctionNode
      assertMapAstNode(sqrt, ast.NodeType.Sqrt, 1, 0, 1, 7, 'sqrt(0)')

      expect(sqrt.arguments.length).toBe(1)
      const value = sqrt.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 5, 1, 6, '0')
      expect(value.value).toBe('0')
    })

    it('var', () => {
      const variable = execParseExpression('$aBC_0;') as ast.VarNode
      assertMapAstNode(variable, ast.NodeType.Var, 1, 0, 1, 6, '$aBC_0')
      expect(variable.varName).toBe('aBC_0')
    })

    it('number', () => {
      const number = execParseExpression('100;') as ast.ValueNode
      assertMapAstNode(number, ast.NodeType.Number, 1, 0, 1, 3, '100')
      expect(number.value).toBe('100')
    })

    it('empty string', () => {
      const string = execParseExpression(`'';`) as ast.ValueNode
      assertMapAstNode(string, ast.NodeType.String, 1, 0, 1, 2, `''`)
      expect(string.value).toBe('')
    })

    it('reserved word string', () => {
      const string = execParseExpression(`'Curve';`) as ast.ValueNode
      assertMapAstNode(string, ast.NodeType.String, 1, 0, 1, 7, `'Curve'`)
      expect(string.value).toBe('Curve')
    })

    it('distance', () => {
      const distance = execParseExpression('dIsTAnce;') as ast.MapAstNode
      assertMapAstNode(distance, ast.NodeType.Distance, 1, 0, 1, 8, 'dIsTAnce')
    })
  })
})
