import { execParseSingleStatement, assertMapAstNode } from './util'
import * as ast from '@bvetree/ast/src/map-v2'

describe('MapV2Parser', () => {
  describe('#parse_map_function', () => {
    it('parse Curve.Setgauge(Value)', () => {
      const statement = execParseSingleStatement(
        `Curve.Setgauge(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        20,
        `Curve.Setgauge(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('setgauge')

      expect(statement.arguments.length).toBe(1)
      const value = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 15, 1, 18, `1.0`)
      expect(value.value).toBe('1.0')
    })

    it('parse Gauge.Set(Value)', () => {
      const statement = execParseSingleStatement(
        `Gauge.Set(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        15,
        `Gauge.Set(1.0);`
      )
      expect(statement.element).toBe('gauge')
      expect(statement.function).toBe('set')

      expect(statement.arguments.length).toBe(1)
      const value = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 10, 1, 13, `1.0`)
      expect(value.value).toBe('1.0')
    })

    it('parse Curve.Gauge(Value)', () => {
      const statement = execParseSingleStatement(
        `Curve.Gauge(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        17,
        `Curve.Gauge(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('gauge')

      expect(statement.arguments.length).toBe(1)
      const value = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 12, 1, 15, `1.0`)
      expect(value.value).toBe('1.0')
    })

    it('parse Curve.Setcenter(X)', () => {
      const statement = execParseSingleStatement(
        `Curve.Setcenter(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        21,
        `Curve.Setcenter(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('setcenter')

      expect(statement.arguments.length).toBe(1)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(x.value).toBe('1.0')
    })

    it('parse Curve.Setfunction(Id)', () => {
      const statement = execParseSingleStatement(
        `Curve.Setfunction(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        23,
        `Curve.Setfunction(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('setfunction')

      expect(statement.arguments.length).toBe(1)
      const id = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(id, ast.NodeType.Number, 1, 18, 1, 21, `1.0`)
      expect(id.value).toBe('1.0')
    })

    it('parse Curve.Begintransition()', () => {
      const statement = execParseSingleStatement(
        `Curve.Begintransition();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        24,
        `Curve.Begintransition();`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('begintransition')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        22,
        1,
        22,
        ''
      )
    })

    it('parse Curve.Begin(Radius)', () => {
      const statement = execParseSingleStatement(
        `Curve.Begin(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        17,
        `Curve.Begin(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('begin')

      expect(statement.arguments.length).toBe(1)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 12, 1, 15, `1.0`)
      expect(radius.value).toBe('1.0')
    })

    it('parse Curve.Begin(Radius,Cant)', () => {
      const statement = execParseSingleStatement(
        `Curve.Begin(1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        21,
        `Curve.Begin(1.0,1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('begin')

      expect(statement.arguments.length).toBe(2)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 12, 1, 15, `1.0`)
      expect(radius.value).toBe('1.0')

      const cant = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Curve.Begincircular(Radius,Cant)', () => {
      const statement = execParseSingleStatement(
        `Curve.Begincircular(1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        29,
        `Curve.Begincircular(1.0,1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('begincircular')

      expect(statement.arguments.length).toBe(2)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(radius.value).toBe('1.0')

      const cant = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 24, 1, 27, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Curve.End()', () => {
      const statement = execParseSingleStatement(
        `Curve.End();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        12,
        `Curve.End();`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('end')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        10,
        1,
        10,
        ''
      )
    })

    it('parse Curve.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Curve.Interpolate();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        20,
        `Curve.Interpolate();`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('interpolate')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        18,
        1,
        18,
        ''
      )
    })

    it('parse Curve.Interpolate(Radius)', () => {
      const statement = execParseSingleStatement(
        `Curve.Interpolate(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        23,
        `Curve.Interpolate(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('interpolate')

      expect(statement.arguments.length).toBe(1)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 18, 1, 21, `1.0`)
      expect(radius.value).toBe('1.0')
    })

    it('parse Curve.Interpolate(Radius,Cant)', () => {
      const statement = execParseSingleStatement(
        `Curve.Interpolate(1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        27,
        `Curve.Interpolate(1.0,1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('interpolate')

      expect(statement.arguments.length).toBe(2)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 18, 1, 21, `1.0`)
      expect(radius.value).toBe('1.0')

      const cant = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 22, 1, 25, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Curve.Change(Radius)', () => {
      const statement = execParseSingleStatement(
        `Curve.Change(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        18,
        `Curve.Change(1.0);`
      )
      expect(statement.element).toBe('curve')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(1)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 13, 1, 16, `1.0`)
      expect(radius.value).toBe('1.0')
    })

    it('parse Gradient.Begintransition()', () => {
      const statement = execParseSingleStatement(
        `Gradient.Begintransition();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        27,
        `Gradient.Begintransition();`
      )
      expect(statement.element).toBe('gradient')
      expect(statement.function).toBe('begintransition')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        25,
        1,
        25,
        ''
      )
    })

    it('parse Gradient.Begin(Gradient)', () => {
      const statement = execParseSingleStatement(
        `Gradient.Begin(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        20,
        `Gradient.Begin(1.0);`
      )
      expect(statement.element).toBe('gradient')
      expect(statement.function).toBe('begin')

      expect(statement.arguments.length).toBe(1)
      const gradient = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(gradient, ast.NodeType.Number, 1, 15, 1, 18, `1.0`)
      expect(gradient.value).toBe('1.0')
    })

    it('parse Gradient.Beginconst(Gradient)', () => {
      const statement = execParseSingleStatement(
        `Gradient.Beginconst(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        25,
        `Gradient.Beginconst(1.0);`
      )
      expect(statement.element).toBe('gradient')
      expect(statement.function).toBe('beginconst')

      expect(statement.arguments.length).toBe(1)
      const gradient = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(gradient, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(gradient.value).toBe('1.0')
    })

    it('parse Gradient.End()', () => {
      const statement = execParseSingleStatement(
        `Gradient.End();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        15,
        `Gradient.End();`
      )
      expect(statement.element).toBe('gradient')
      expect(statement.function).toBe('end')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        13,
        1,
        13,
        ''
      )
    })

    it('parse Gradient.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Gradient.Interpolate();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        23,
        `Gradient.Interpolate();`
      )
      expect(statement.element).toBe('gradient')
      expect(statement.function).toBe('interpolate')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        21,
        1,
        21,
        ''
      )
    })

    it('parse Gradient.Interpolate(Gradient)', () => {
      const statement = execParseSingleStatement(
        `Gradient.Interpolate(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        26,
        `Gradient.Interpolate(1.0);`
      )
      expect(statement.element).toBe('gradient')
      expect(statement.function).toBe('interpolate')

      expect(statement.arguments.length).toBe(1)
      const gradient = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(gradient, ast.NodeType.Number, 1, 21, 1, 24, `1.0`)
      expect(gradient.value).toBe('1.0')
    })

    it('parse Track[TrackKey].X.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].X.Interpolate();`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        34,
        `Track['TrackKey'].X.Interpolate();`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('x')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        32,
        1,
        32,
        ''
      )
    })

    it('parse Track[TrackKey].X.Interpolate(X)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].X.Interpolate(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        37,
        `Track['TrackKey'].X.Interpolate(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('x')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 32, 1, 35, `1.0`)
      expect(x.value).toBe('1.0')
    })

    it('parse Track[TrackKey].X.Interpolate(X,Radius)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].X.Interpolate(1.0,1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        41,
        `Track['TrackKey'].X.Interpolate(1.0,1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('x')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(2)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 32, 1, 35, `1.0`)
      expect(x.value).toBe('1.0')

      const radius = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 36, 1, 39, `1.0`)
      expect(radius.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Y.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Y.Interpolate();`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        34,
        `Track['TrackKey'].Y.Interpolate();`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('y')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        32,
        1,
        32,
        ''
      )
    })

    it('parse Track[TrackKey].Y.Interpolate(Y)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Y.Interpolate(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        37,
        `Track['TrackKey'].Y.Interpolate(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('y')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const y = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 32, 1, 35, `1.0`)
      expect(y.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Y.Interpolate(Y,Radius)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Y.Interpolate(1.0,1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        41,
        `Track['TrackKey'].Y.Interpolate(1.0,1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('y')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(2)
      const y = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 32, 1, 35, `1.0`)
      expect(y.value).toBe('1.0')

      const radius = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 36, 1, 39, `1.0`)
      expect(radius.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Position(X,Y)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Position(1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        36,
        `Track['TrackKey'].Position(1.0,1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.function).toBe('position')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(2)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 27, 1, 30, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 31, 1, 34, `1.0`)
      expect(y.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Position(X,Y,RadiusH)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Position(1.0,1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        40,
        `Track['TrackKey'].Position(1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.function).toBe('position')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(3)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 27, 1, 30, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 31, 1, 34, `1.0`)
      expect(y.value).toBe('1.0')

      const radiush = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(radiush, ast.NodeType.Number, 1, 35, 1, 38, `1.0`)
      expect(radiush.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Position(X,Y,RadiusH,RadiusV)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Position(1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        44,
        `Track['TrackKey'].Position(1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.function).toBe('position')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(4)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 27, 1, 30, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 31, 1, 34, `1.0`)
      expect(y.value).toBe('1.0')

      const radiush = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(radiush, ast.NodeType.Number, 1, 35, 1, 38, `1.0`)
      expect(radiush.value).toBe('1.0')

      const radiusv = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(radiusv, ast.NodeType.Number, 1, 39, 1, 42, `1.0`)
      expect(radiusv.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Cant.Setgauge(Gauge)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Setgauge(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        37,
        `Track['TrackKey'].Cant.Setgauge(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('setgauge')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const gauge = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(gauge, ast.NodeType.Number, 1, 32, 1, 35, `1.0`)
      expect(gauge.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Gauge(Gauge)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Gauge(1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        29,
        `Track['TrackKey'].Gauge(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.function).toBe('gauge')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const gauge = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(gauge, ast.NodeType.Number, 1, 24, 1, 27, `1.0`)
      expect(gauge.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Cant.Setcenter(X)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Setcenter(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        38,
        `Track['TrackKey'].Cant.Setcenter(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('setcenter')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 33, 1, 36, `1.0`)
      expect(x.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Cant.Setfunction(Id)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Setfunction(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        40,
        `Track['TrackKey'].Cant.Setfunction(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('setfunction')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const id = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(id, ast.NodeType.Number, 1, 35, 1, 38, `1.0`)
      expect(id.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Cant.Begintransition()', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Begintransition();`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        41,
        `Track['TrackKey'].Cant.Begintransition();`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('begintransition')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        39,
        1,
        39,
        ''
      )
    })

    it('parse Track[TrackKey].Cant.Begin(Cant)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Begin(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        34,
        `Track['TrackKey'].Cant.Begin(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('begin')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const cant = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 29, 1, 32, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Cant.End()', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.End();`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        29,
        `Track['TrackKey'].Cant.End();`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('end')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        27,
        1,
        27,
        ''
      )
    })

    it('parse Track[TrackKey].Cant.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Interpolate();`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        37,
        `Track['TrackKey'].Cant.Interpolate();`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        35,
        1,
        35,
        ''
      )
    })

    it('parse Track[TrackKey].Cant.Interpolate(Cant)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant.Interpolate(1.0);`
      ) as ast.MapFunctionWithKeyAndSubelementNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKeyAndSubelement,
        1,
        0,
        1,
        40,
        `Track['TrackKey'].Cant.Interpolate(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.subElement).toBe('cant')
      expect(statement.function).toBe('interpolate')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const cant = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 35, 1, 38, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Track[TrackKey].Cant(Cant)', () => {
      const statement = execParseSingleStatement(
        `Track['TrackKey'].Cant(1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        28,
        `Track['TrackKey'].Cant(1.0);`
      )
      expect(statement.element).toBe('track')
      expect(statement.function).toBe('cant')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrackKey'`)
      expect(key.value).toBe('TrackKey')

      expect(statement.arguments.length).toBe(1)
      const cant = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 23, 1, 26, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Structure.Load(FilePath)', () => {
      const statement = execParseSingleStatement(
        `Structure.Load('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        36,
        `Structure.Load('string_test_value');`
      )
      expect(statement.element).toBe('structure')
      expect(statement.function).toBe('load')

      expect(statement.arguments.length).toBe(1)
      const filepath = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        15,
        1,
        34,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')
    })

    it('parse Structure[StructureKey].Put(TrackKey,X,Y,Z,RX,RY,RZ,Tilt,Span)', () => {
      const statement = execParseSingleStatement(
        `Structure['StructureKey'].Put('string_test_value',1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        83,
        `Structure['StructureKey'].Put('string_test_value',1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('structure')
      expect(statement.function).toBe('put')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 10, 1, 24, `'StructureKey'`)
      expect(key.value).toBe('StructureKey')

      expect(statement.arguments.length).toBe(9)
      const trackkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        30,
        1,
        49,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const x = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 50, 1, 53, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 54, 1, 57, `1.0`)
      expect(y.value).toBe('1.0')

      const z = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(z, ast.NodeType.Number, 1, 58, 1, 61, `1.0`)
      expect(z.value).toBe('1.0')

      const rx = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(rx, ast.NodeType.Number, 1, 62, 1, 65, `1.0`)
      expect(rx.value).toBe('1.0')

      const ry = statement.arguments[5] as ast.ValueNode
      assertMapAstNode(ry, ast.NodeType.Number, 1, 66, 1, 69, `1.0`)
      expect(ry.value).toBe('1.0')

      const rz = statement.arguments[6] as ast.ValueNode
      assertMapAstNode(rz, ast.NodeType.Number, 1, 70, 1, 73, `1.0`)
      expect(rz.value).toBe('1.0')

      const tilt = statement.arguments[7] as ast.ValueNode
      assertMapAstNode(tilt, ast.NodeType.Number, 1, 74, 1, 77, `1.0`)
      expect(tilt.value).toBe('1.0')

      const span = statement.arguments[8] as ast.ValueNode
      assertMapAstNode(span, ast.NodeType.Number, 1, 78, 1, 81, `1.0`)
      expect(span.value).toBe('1.0')
    })

    it('parse Structure[StructureKey].Put0(TrackKey,Tilt,Span)', () => {
      const statement = execParseSingleStatement(
        `Structure['StructureKey'].Put0('string_test_value',1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        60,
        `Structure['StructureKey'].Put0('string_test_value',1.0,1.0);`
      )
      expect(statement.element).toBe('structure')
      expect(statement.function).toBe('put0')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 10, 1, 24, `'StructureKey'`)
      expect(key.value).toBe('StructureKey')

      expect(statement.arguments.length).toBe(3)
      const trackkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        31,
        1,
        50,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const tilt = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(tilt, ast.NodeType.Number, 1, 51, 1, 54, `1.0`)
      expect(tilt.value).toBe('1.0')

      const span = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(span, ast.NodeType.Number, 1, 55, 1, 58, `1.0`)
      expect(span.value).toBe('1.0')
    })

    it('parse Structure[StructureKey].Putbetween(TrackKey1,TrackKey2)', () => {
      const statement = execParseSingleStatement(
        `Structure['StructureKey'].Putbetween('string_test_value','string_test_value');`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        78,
        `Structure['StructureKey'].Putbetween('string_test_value','string_test_value');`
      )
      expect(statement.element).toBe('structure')
      expect(statement.function).toBe('putbetween')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 10, 1, 24, `'StructureKey'`)
      expect(key.value).toBe('StructureKey')

      expect(statement.arguments.length).toBe(2)
      const trackkey1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey1,
        ast.NodeType.String,
        1,
        37,
        1,
        56,
        `'string_test_value'`
      )
      expect(trackkey1.value).toBe('string_test_value')

      const trackkey2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        trackkey2,
        ast.NodeType.String,
        1,
        57,
        1,
        76,
        `'string_test_value'`
      )
      expect(trackkey2.value).toBe('string_test_value')
    })

    it('parse Structure[StructureKey].Putbetween(TrackKey1,TrackKey2,Flag)', () => {
      const statement = execParseSingleStatement(
        `Structure['StructureKey'].Putbetween('string_test_value','string_test_value',1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        82,
        `Structure['StructureKey'].Putbetween('string_test_value','string_test_value',1.0);`
      )
      expect(statement.element).toBe('structure')
      expect(statement.function).toBe('putbetween')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 10, 1, 24, `'StructureKey'`)
      expect(key.value).toBe('StructureKey')

      expect(statement.arguments.length).toBe(3)
      const trackkey1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey1,
        ast.NodeType.String,
        1,
        37,
        1,
        56,
        `'string_test_value'`
      )
      expect(trackkey1.value).toBe('string_test_value')

      const trackkey2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        trackkey2,
        ast.NodeType.String,
        1,
        57,
        1,
        76,
        `'string_test_value'`
      )
      expect(trackkey2.value).toBe('string_test_value')

      const flag = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(flag, ast.NodeType.Number, 1, 77, 1, 80, `1.0`)
      expect(flag.value).toBe('1.0')
    })

    it('parse Repeater[RepeaterKey].Begin(TrackKey,X,Y,Z,RX,RY,RZ,Tilt,Span,Interval,StructureKey)', () => {
      const statement = execParseSingleStatement(
        `Repeater['RepeaterKey'].Begin('string_test_value',1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'string_test_value','string_test_value','string_test_value','string_test_value','string_test_value');`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        187,
        `Repeater['RepeaterKey'].Begin('string_test_value',1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,'string_test_value','string_test_value','string_test_value','string_test_value','string_test_value');`
      )
      expect(statement.element).toBe('repeater')
      expect(statement.function).toBe('begin')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 9, 1, 22, `'RepeaterKey'`)
      expect(key.value).toBe('RepeaterKey')

      expect(statement.arguments.length).toBe(15)
      const trackkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        30,
        1,
        49,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const x = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 50, 1, 53, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 54, 1, 57, `1.0`)
      expect(y.value).toBe('1.0')

      const z = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(z, ast.NodeType.Number, 1, 58, 1, 61, `1.0`)
      expect(z.value).toBe('1.0')

      const rx = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(rx, ast.NodeType.Number, 1, 62, 1, 65, `1.0`)
      expect(rx.value).toBe('1.0')

      const ry = statement.arguments[5] as ast.ValueNode
      assertMapAstNode(ry, ast.NodeType.Number, 1, 66, 1, 69, `1.0`)
      expect(ry.value).toBe('1.0')

      const rz = statement.arguments[6] as ast.ValueNode
      assertMapAstNode(rz, ast.NodeType.Number, 1, 70, 1, 73, `1.0`)
      expect(rz.value).toBe('1.0')

      const tilt = statement.arguments[7] as ast.ValueNode
      assertMapAstNode(tilt, ast.NodeType.Number, 1, 74, 1, 77, `1.0`)
      expect(tilt.value).toBe('1.0')

      const span = statement.arguments[8] as ast.ValueNode
      assertMapAstNode(span, ast.NodeType.Number, 1, 78, 1, 81, `1.0`)
      expect(span.value).toBe('1.0')

      const interval = statement.arguments[9] as ast.ValueNode
      assertMapAstNode(interval, ast.NodeType.Number, 1, 82, 1, 85, `1.0`)
      expect(interval.value).toBe('1.0')

      const structureKey1 = statement.arguments[10] as ast.ValueNode
      assertMapAstNode(
        structureKey1,
        ast.NodeType.String,
        1,
        86,
        1,
        105,
        `'string_test_value'`
      )
      expect(structureKey1.value).toBe('string_test_value')

      const structureKey2 = statement.arguments[11] as ast.ValueNode
      assertMapAstNode(
        structureKey2,
        ast.NodeType.String,
        1,
        106,
        1,
        125,
        `'string_test_value'`
      )
      expect(structureKey2.value).toBe('string_test_value')

      const structureKey3 = statement.arguments[12] as ast.ValueNode
      assertMapAstNode(
        structureKey3,
        ast.NodeType.String,
        1,
        126,
        1,
        145,
        `'string_test_value'`
      )
      expect(structureKey3.value).toBe('string_test_value')

      const structureKey4 = statement.arguments[13] as ast.ValueNode
      assertMapAstNode(
        structureKey4,
        ast.NodeType.String,
        1,
        146,
        1,
        165,
        `'string_test_value'`
      )
      expect(structureKey4.value).toBe('string_test_value')

      const structureKey5 = statement.arguments[14] as ast.ValueNode
      assertMapAstNode(
        structureKey5,
        ast.NodeType.String,
        1,
        166,
        1,
        185,
        `'string_test_value'`
      )
      expect(structureKey5.value).toBe('string_test_value')
    })

    it('parse Repeater[RepeaterKey].Begin0(TrackKey,Tilt,Span,Interval,StructureKey)', () => {
      const statement = execParseSingleStatement(
        `Repeater['RepeaterKey'].Begin0('string_test_value',1.0,1.0,1.0,'string_test_value','string_test_value','string_test_value','string_test_value','string_test_value');`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        164,
        `Repeater['RepeaterKey'].Begin0('string_test_value',1.0,1.0,1.0,'string_test_value','string_test_value','string_test_value','string_test_value','string_test_value');`
      )
      expect(statement.element).toBe('repeater')
      expect(statement.function).toBe('begin0')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 9, 1, 22, `'RepeaterKey'`)
      expect(key.value).toBe('RepeaterKey')

      expect(statement.arguments.length).toBe(9)
      const trackkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        31,
        1,
        50,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const tilt = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(tilt, ast.NodeType.Number, 1, 51, 1, 54, `1.0`)
      expect(tilt.value).toBe('1.0')

      const span = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(span, ast.NodeType.Number, 1, 55, 1, 58, `1.0`)
      expect(span.value).toBe('1.0')

      const interval = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(interval, ast.NodeType.Number, 1, 59, 1, 62, `1.0`)
      expect(interval.value).toBe('1.0')

      const structureKey1 = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(
        structureKey1,
        ast.NodeType.String,
        1,
        63,
        1,
        82,
        `'string_test_value'`
      )
      expect(structureKey1.value).toBe('string_test_value')

      const structureKey2 = statement.arguments[5] as ast.ValueNode
      assertMapAstNode(
        structureKey2,
        ast.NodeType.String,
        1,
        83,
        1,
        102,
        `'string_test_value'`
      )
      expect(structureKey2.value).toBe('string_test_value')

      const structureKey3 = statement.arguments[6] as ast.ValueNode
      assertMapAstNode(
        structureKey3,
        ast.NodeType.String,
        1,
        103,
        1,
        122,
        `'string_test_value'`
      )
      expect(structureKey3.value).toBe('string_test_value')

      const structureKey4 = statement.arguments[7] as ast.ValueNode
      assertMapAstNode(
        structureKey4,
        ast.NodeType.String,
        1,
        123,
        1,
        142,
        `'string_test_value'`
      )
      expect(structureKey4.value).toBe('string_test_value')

      const structureKey5 = statement.arguments[8] as ast.ValueNode
      assertMapAstNode(
        structureKey5,
        ast.NodeType.String,
        1,
        143,
        1,
        162,
        `'string_test_value'`
      )
      expect(structureKey5.value).toBe('string_test_value')
    })

    it('parse Repeater[RepeaterKey].End()', () => {
      const statement = execParseSingleStatement(
        `Repeater['RepeaterKey'].End();`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        30,
        `Repeater['RepeaterKey'].End();`
      )
      expect(statement.element).toBe('repeater')
      expect(statement.function).toBe('end')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 9, 1, 22, `'RepeaterKey'`)
      expect(key.value).toBe('RepeaterKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        28,
        1,
        28,
        ''
      )
    })

    it('parse Background.Change(StructureKey)', () => {
      const statement = execParseSingleStatement(
        `Background.Change('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        39,
        `Background.Change('string_test_value');`
      )
      expect(statement.element).toBe('background')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(1)
      const structurekey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        structurekey,
        ast.NodeType.String,
        1,
        18,
        1,
        37,
        `'string_test_value'`
      )
      expect(structurekey.value).toBe('string_test_value')
    })

    it('parse Station.Load(FilePath)', () => {
      const statement = execParseSingleStatement(
        `Station.Load('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        34,
        `Station.Load('string_test_value');`
      )
      expect(statement.element).toBe('station')
      expect(statement.function).toBe('load')

      expect(statement.arguments.length).toBe(1)
      const filepath = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        13,
        1,
        32,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')
    })

    it('parse Station[StationKey].Put(Door,Margin1,Margin2)', () => {
      const statement = execParseSingleStatement(
        `Station['StationKey'].Put(1.0,1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        39,
        `Station['StationKey'].Put(1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('station')
      expect(statement.function).toBe('put')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 8, 1, 20, `'StationKey'`)
      expect(key.value).toBe('StationKey')

      expect(statement.arguments.length).toBe(3)
      const door = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(door, ast.NodeType.Number, 1, 26, 1, 29, `1.0`)
      expect(door.value).toBe('1.0')

      const margin1 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(margin1, ast.NodeType.Number, 1, 30, 1, 33, `1.0`)
      expect(margin1.value).toBe('1.0')

      const margin2 = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(margin2, ast.NodeType.Number, 1, 34, 1, 37, `1.0`)
      expect(margin2.value).toBe('1.0')
    })

    it('parse Section.Begin(Signal)', () => {
      const statement = execParseSingleStatement(
        `Section.Begin(1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        35,
        `Section.Begin(1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('section')
      expect(statement.function).toBe('begin')

      expect(statement.arguments.length).toBe(5)

      const signal1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(signal1, ast.NodeType.Number, 1, 14, 1, 17, '1.0')
      expect(signal1.value).toBe('1.0')

      const signal2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(signal2, ast.NodeType.Number, 1, 18, 1, 21, '1.0')
      expect(signal2.value).toBe('1.0')

      const signal3 = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(signal3, ast.NodeType.Number, 1, 22, 1, 25, '1.0')
      expect(signal3.value).toBe('1.0')

      const signal4 = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(signal4, ast.NodeType.Number, 1, 26, 1, 29, '1.0')
      expect(signal4.value).toBe('1.0')

      const signal5 = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(signal5, ast.NodeType.Number, 1, 30, 1, 33, '1.0')
      expect(signal5.value).toBe('1.0')
    })

    it('parse Section.Beginnew(Signal)', () => {
      const statement = execParseSingleStatement(
        `Section.Beginnew(1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        38,
        `Section.Beginnew(1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('section')
      expect(statement.function).toBe('beginnew')

      expect(statement.arguments.length).toBe(5)

      const signal1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(signal1, ast.NodeType.Number, 1, 17, 1, 20, '1.0')
      expect(signal1.value).toBe('1.0')

      const signal2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(signal2, ast.NodeType.Number, 1, 21, 1, 24, '1.0')
      expect(signal2.value).toBe('1.0')

      const signal3 = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(signal3, ast.NodeType.Number, 1, 25, 1, 28, '1.0')
      expect(signal3.value).toBe('1.0')

      const signal4 = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(signal4, ast.NodeType.Number, 1, 29, 1, 32, '1.0')
      expect(signal4.value).toBe('1.0')

      const signal5 = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(signal5, ast.NodeType.Number, 1, 33, 1, 36, '1.0')
      expect(signal5.value).toBe('1.0')
    })

    it('parse Section.Setspeedlimit(V)', () => {
      const statement = execParseSingleStatement(
        `Section.Setspeedlimit(1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        43,
        `Section.Setspeedlimit(1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('section')
      expect(statement.function).toBe('setspeedlimit')

      expect(statement.arguments.length).toBe(5)

      const v1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(v1, ast.NodeType.Number, 1, 22, 1, 25, '1.0')
      expect(v1.value).toBe('1.0')

      const v2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(v2, ast.NodeType.Number, 1, 26, 1, 29, '1.0')
      expect(v2.value).toBe('1.0')

      const v3 = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(v3, ast.NodeType.Number, 1, 30, 1, 33, '1.0')
      expect(v3.value).toBe('1.0')

      const v4 = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(v4, ast.NodeType.Number, 1, 34, 1, 37, '1.0')
      expect(v4.value).toBe('1.0')

      const v5 = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(v5, ast.NodeType.Number, 1, 38, 1, 41, '1.0')
      expect(v5.value).toBe('1.0')
    })

    it('parse Signal.Speedlimit(V)', () => {
      const statement = execParseSingleStatement(
        `Signal.Speedlimit(1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        39,
        `Signal.Speedlimit(1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('signal')
      expect(statement.function).toBe('speedlimit')

      expect(statement.arguments.length).toBe(5)

      const v1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(v1, ast.NodeType.Number, 1, 18, 1, 21, '1.0')
      expect(v1.value).toBe('1.0')

      const v2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(v2, ast.NodeType.Number, 1, 22, 1, 25, '1.0')
      expect(v2.value).toBe('1.0')

      const v3 = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(v3, ast.NodeType.Number, 1, 26, 1, 29, '1.0')
      expect(v3.value).toBe('1.0')

      const v4 = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(v4, ast.NodeType.Number, 1, 30, 1, 33, '1.0')
      expect(v4.value).toBe('1.0')

      const v5 = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(v5, ast.NodeType.Number, 1, 34, 1, 37, '1.0')
      expect(v5.value).toBe('1.0')
    })

    it('parse Speedlimit.Setsignal(V)', () => {
      const statement = execParseSingleStatement(
        `Speedlimit.Setsignal(1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        42,
        `Speedlimit.Setsignal(1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('speedlimit')
      expect(statement.function).toBe('setsignal')

      expect(statement.arguments.length).toBe(5)

      const v1 = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(v1, ast.NodeType.Number, 1, 21, 1, 24, '1.0')
      expect(v1.value).toBe('1.0')

      const v2 = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(v2, ast.NodeType.Number, 1, 25, 1, 28, '1.0')
      expect(v2.value).toBe('1.0')

      const v3 = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(v3, ast.NodeType.Number, 1, 29, 1, 32, '1.0')
      expect(v3.value).toBe('1.0')

      const v4 = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(v4, ast.NodeType.Number, 1, 33, 1, 36, '1.0')
      expect(v4.value).toBe('1.0')

      const v5 = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(v5, ast.NodeType.Number, 1, 37, 1, 40, '1.0')
      expect(v5.value).toBe('1.0')
    })

    it('parse Signal.Load(FilePath)', () => {
      const statement = execParseSingleStatement(
        `Signal.Load('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        33,
        `Signal.Load('string_test_value');`
      )
      expect(statement.element).toBe('signal')
      expect(statement.function).toBe('load')

      expect(statement.arguments.length).toBe(1)
      const filepath = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        12,
        1,
        31,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')
    })

    it('parse Signal[SignalAspectKey].Put(Section,TrackKey,X,Y)', () => {
      const statement = execParseSingleStatement(
        `Signal['SignalAspectKey'].Put(1.0,'string_test_value',1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        63,
        `Signal['SignalAspectKey'].Put(1.0,'string_test_value',1.0,1.0);`
      )
      expect(statement.element).toBe('signal')
      expect(statement.function).toBe('put')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(
        key,
        ast.NodeType.String,
        1,
        7,
        1,
        24,
        `'SignalAspectKey'`
      )
      expect(key.value).toBe('SignalAspectKey')

      expect(statement.arguments.length).toBe(4)
      const section = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(section, ast.NodeType.Number, 1, 30, 1, 33, `1.0`)
      expect(section.value).toBe('1.0')

      const trackkey = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        34,
        1,
        53,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const x = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 54, 1, 57, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 58, 1, 61, `1.0`)
      expect(y.value).toBe('1.0')
    })

    it('parse Signal[SignalAspectKey].Put(Section,TrackKey,X,Y,Z,RX,RY,RZ,Tilt,Span)', () => {
      const statement = execParseSingleStatement(
        `Signal['SignalAspectKey'].Put(1.0,'string_test_value',1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        87,
        `Signal['SignalAspectKey'].Put(1.0,'string_test_value',1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('signal')
      expect(statement.function).toBe('put')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(
        key,
        ast.NodeType.String,
        1,
        7,
        1,
        24,
        `'SignalAspectKey'`
      )
      expect(key.value).toBe('SignalAspectKey')

      expect(statement.arguments.length).toBe(10)
      const section = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(section, ast.NodeType.Number, 1, 30, 1, 33, `1.0`)
      expect(section.value).toBe('1.0')

      const trackkey = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        34,
        1,
        53,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const x = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 54, 1, 57, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 58, 1, 61, `1.0`)
      expect(y.value).toBe('1.0')

      const z = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(z, ast.NodeType.Number, 1, 62, 1, 65, `1.0`)
      expect(z.value).toBe('1.0')

      const rx = statement.arguments[5] as ast.ValueNode
      assertMapAstNode(rx, ast.NodeType.Number, 1, 66, 1, 69, `1.0`)
      expect(rx.value).toBe('1.0')

      const ry = statement.arguments[6] as ast.ValueNode
      assertMapAstNode(ry, ast.NodeType.Number, 1, 70, 1, 73, `1.0`)
      expect(ry.value).toBe('1.0')

      const rz = statement.arguments[7] as ast.ValueNode
      assertMapAstNode(rz, ast.NodeType.Number, 1, 74, 1, 77, `1.0`)
      expect(rz.value).toBe('1.0')

      const tilt = statement.arguments[8] as ast.ValueNode
      assertMapAstNode(tilt, ast.NodeType.Number, 1, 78, 1, 81, `1.0`)
      expect(tilt.value).toBe('1.0')

      const span = statement.arguments[9] as ast.ValueNode
      assertMapAstNode(span, ast.NodeType.Number, 1, 82, 1, 85, `1.0`)
      expect(span.value).toBe('1.0')
    })

    it('parse Beacon.Put(Type,Section,Senddata)', () => {
      const statement = execParseSingleStatement(
        `Beacon.Put(1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        24,
        `Beacon.Put(1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('beacon')
      expect(statement.function).toBe('put')

      expect(statement.arguments.length).toBe(3)
      const type = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(type, ast.NodeType.Number, 1, 11, 1, 14, `1.0`)
      expect(type.value).toBe('1.0')

      const section = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(section, ast.NodeType.Number, 1, 15, 1, 18, `1.0`)
      expect(section.value).toBe('1.0')

      const senddata = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(senddata, ast.NodeType.Number, 1, 19, 1, 22, `1.0`)
      expect(senddata.value).toBe('1.0')
    })

    it('parse Speedlimit.Begin(V)', () => {
      const statement = execParseSingleStatement(
        `Speedlimit.Begin(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        22,
        `Speedlimit.Begin(1.0);`
      )
      expect(statement.element).toBe('speedlimit')
      expect(statement.function).toBe('begin')

      expect(statement.arguments.length).toBe(1)
      const v = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(v, ast.NodeType.Number, 1, 17, 1, 20, `1.0`)
      expect(v.value).toBe('1.0')
    })

    it('parse Speedlimit.End()', () => {
      const statement = execParseSingleStatement(
        `Speedlimit.End();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        17,
        `Speedlimit.End();`
      )
      expect(statement.element).toBe('speedlimit')
      expect(statement.function).toBe('end')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        15,
        1,
        15,
        ''
      )
    })

    it('parse Pretrain.Pass(Time)', () => {
      const statement = execParseSingleStatement(
        `Pretrain.Pass('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        35,
        `Pretrain.Pass('string_test_value');`
      )
      expect(statement.element).toBe('pretrain')
      expect(statement.function).toBe('pass')

      expect(statement.arguments.length).toBe(1)
      const time = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        time,
        ast.NodeType.String,
        1,
        14,
        1,
        33,
        `'string_test_value'`
      )
      expect(time.value).toBe('string_test_value')
    })

    it('parse Pretrain.Pass(Second)', () => {
      const statement = execParseSingleStatement(
        `Pretrain.Pass(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        19,
        `Pretrain.Pass(1.0);`
      )
      expect(statement.element).toBe('pretrain')
      expect(statement.function).toBe('pass')

      expect(statement.arguments.length).toBe(1)
      const second = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(second, ast.NodeType.Number, 1, 14, 1, 17, `1.0`)
      expect(second.value).toBe('1.0')
    })

    it('parse Light.Ambient(Red,Green,Blue)', () => {
      const statement = execParseSingleStatement(
        `Light.Ambient(1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        27,
        `Light.Ambient(1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('light')
      expect(statement.function).toBe('ambient')

      expect(statement.arguments.length).toBe(3)
      const red = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(red, ast.NodeType.Number, 1, 14, 1, 17, `1.0`)
      expect(red.value).toBe('1.0')

      const green = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(green, ast.NodeType.Number, 1, 18, 1, 21, `1.0`)
      expect(green.value).toBe('1.0')

      const blue = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(blue, ast.NodeType.Number, 1, 22, 1, 25, `1.0`)
      expect(blue.value).toBe('1.0')
    })

    it('parse Light.Diffuse(Red,Green,Blue)', () => {
      const statement = execParseSingleStatement(
        `Light.Diffuse(1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        27,
        `Light.Diffuse(1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('light')
      expect(statement.function).toBe('diffuse')

      expect(statement.arguments.length).toBe(3)
      const red = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(red, ast.NodeType.Number, 1, 14, 1, 17, `1.0`)
      expect(red.value).toBe('1.0')

      const green = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(green, ast.NodeType.Number, 1, 18, 1, 21, `1.0`)
      expect(green.value).toBe('1.0')

      const blue = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(blue, ast.NodeType.Number, 1, 22, 1, 25, `1.0`)
      expect(blue.value).toBe('1.0')
    })

    it('parse Light.Direction(Pitch,Yaw)', () => {
      const statement = execParseSingleStatement(
        `Light.Direction(1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        25,
        `Light.Direction(1.0,1.0);`
      )
      expect(statement.element).toBe('light')
      expect(statement.function).toBe('direction')

      expect(statement.arguments.length).toBe(2)
      const pitch = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(pitch, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(pitch.value).toBe('1.0')

      const yaw = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(yaw, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(yaw.value).toBe('1.0')
    })

    it('parse Fog.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Fog.Interpolate();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        18,
        `Fog.Interpolate();`
      )
      expect(statement.element).toBe('fog')
      expect(statement.function).toBe('interpolate')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        16,
        1,
        16,
        ''
      )
    })

    it('parse Fog.Interpolate(Density)', () => {
      const statement = execParseSingleStatement(
        `Fog.Interpolate(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        21,
        `Fog.Interpolate(1.0);`
      )
      expect(statement.element).toBe('fog')
      expect(statement.function).toBe('interpolate')

      expect(statement.arguments.length).toBe(1)
      const density = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(density, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(density.value).toBe('1.0')
    })

    it('parse Fog.Interpolate(Density,Red,Green,Blue)', () => {
      const statement = execParseSingleStatement(
        `Fog.Interpolate(1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        33,
        `Fog.Interpolate(1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('fog')
      expect(statement.function).toBe('interpolate')

      expect(statement.arguments.length).toBe(4)
      const density = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(density, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(density.value).toBe('1.0')

      const red = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(red, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(red.value).toBe('1.0')

      const green = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(green, ast.NodeType.Number, 1, 24, 1, 27, `1.0`)
      expect(green.value).toBe('1.0')

      const blue = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(blue, ast.NodeType.Number, 1, 28, 1, 31, `1.0`)
      expect(blue.value).toBe('1.0')
    })

    it('parse Fog.Set(Density,Red,Green,Blue)', () => {
      const statement = execParseSingleStatement(
        `Fog.Set(1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        25,
        `Fog.Set(1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('fog')
      expect(statement.function).toBe('set')

      expect(statement.arguments.length).toBe(4)
      const density = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(density, ast.NodeType.Number, 1, 8, 1, 11, `1.0`)
      expect(density.value).toBe('1.0')

      const red = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(red, ast.NodeType.Number, 1, 12, 1, 15, `1.0`)
      expect(red.value).toBe('1.0')

      const green = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(green, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(green.value).toBe('1.0')

      const blue = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(blue, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(blue.value).toBe('1.0')
    })

    it('parse Drawdistance.Change(Value)', () => {
      const statement = execParseSingleStatement(
        `Drawdistance.Change(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        25,
        `Drawdistance.Change(1.0);`
      )
      expect(statement.element).toBe('drawdistance')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(1)
      const value = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(value.value).toBe('1.0')
    })

    it('parse Cabilluminance.Interpolate()', () => {
      const statement = execParseSingleStatement(
        `Cabilluminance.Interpolate();`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        29,
        `Cabilluminance.Interpolate();`
      )
      expect(statement.element).toBe('cabilluminance')
      expect(statement.function).toBe('interpolate')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        27,
        1,
        27,
        ''
      )
    })

    it('parse Cabilluminance.Interpolate(Value)', () => {
      const statement = execParseSingleStatement(
        `Cabilluminance.Interpolate(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        32,
        `Cabilluminance.Interpolate(1.0);`
      )
      expect(statement.element).toBe('cabilluminance')
      expect(statement.function).toBe('interpolate')

      expect(statement.arguments.length).toBe(1)
      const value = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 27, 1, 30, `1.0`)
      expect(value.value).toBe('1.0')
    })

    it('parse Cabilluminance.Set(Value)', () => {
      const statement = execParseSingleStatement(
        `Cabilluminance.Set(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        24,
        `Cabilluminance.Set(1.0);`
      )
      expect(statement.element).toBe('cabilluminance')
      expect(statement.function).toBe('set')

      expect(statement.arguments.length).toBe(1)
      const value = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 19, 1, 22, `1.0`)
      expect(value.value).toBe('1.0')
    })

    it('parse Irregularity.Change(X,Y,R,LX,LY,LR)', () => {
      const statement = execParseSingleStatement(
        `Irregularity.Change(1.0,1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        45,
        `Irregularity.Change(1.0,1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('irregularity')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(6)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 24, 1, 27, `1.0`)
      expect(y.value).toBe('1.0')

      const r = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(r, ast.NodeType.Number, 1, 28, 1, 31, `1.0`)
      expect(r.value).toBe('1.0')

      const lx = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(lx, ast.NodeType.Number, 1, 32, 1, 35, `1.0`)
      expect(lx.value).toBe('1.0')

      const ly = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(ly, ast.NodeType.Number, 1, 36, 1, 39, `1.0`)
      expect(ly.value).toBe('1.0')

      const lr = statement.arguments[5] as ast.ValueNode
      assertMapAstNode(lr, ast.NodeType.Number, 1, 40, 1, 43, `1.0`)
      expect(lr.value).toBe('1.0')
    })

    it('parse Adhesion.Change(A)', () => {
      const statement = execParseSingleStatement(
        `Adhesion.Change(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        21,
        `Adhesion.Change(1.0);`
      )
      expect(statement.element).toBe('adhesion')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(1)
      const a = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(a, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(a.value).toBe('1.0')
    })

    it('parse Adhesion.Change(A,B,C)', () => {
      const statement = execParseSingleStatement(
        `Adhesion.Change(1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        29,
        `Adhesion.Change(1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('adhesion')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(3)
      const a = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(a, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(a.value).toBe('1.0')

      const b = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(b, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(b.value).toBe('1.0')

      const c = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(c, ast.NodeType.Number, 1, 24, 1, 27, `1.0`)
      expect(c.value).toBe('1.0')
    })

    it('parse Sound.Load(FilePath)', () => {
      const statement = execParseSingleStatement(
        `Sound.Load('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        32,
        `Sound.Load('string_test_value');`
      )
      expect(statement.element).toBe('sound')
      expect(statement.function).toBe('load')

      expect(statement.arguments.length).toBe(1)
      const filepath = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        11,
        1,
        30,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')
    })

    it('parse Sound[SoundKey].Play()', () => {
      const statement = execParseSingleStatement(
        `Sound['SoundKey'].Play();`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        25,
        `Sound['SoundKey'].Play();`
      )
      expect(statement.element).toBe('sound')
      expect(statement.function).toBe('play')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'SoundKey'`)
      expect(key.value).toBe('SoundKey')

      // empty argument
      expect(statement.arguments.length).toBe(1)
      assertMapAstNode(
        statement.arguments[0],
        ast.NodeType.Empty,
        1,
        23,
        1,
        23,
        ''
      )
    })

    it('parse Sound3d.Load(FilePath)', () => {
      const statement = execParseSingleStatement(
        `Sound3d.Load('string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        34,
        `Sound3d.Load('string_test_value');`
      )
      expect(statement.element).toBe('sound3d')
      expect(statement.function).toBe('load')

      expect(statement.arguments.length).toBe(1)
      const filepath = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        13,
        1,
        32,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')
    })

    it('parse Sound3d[SoundKey].Put(X,Y)', () => {
      const statement = execParseSingleStatement(
        `Sound3d['SoundKey'].Put(1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        33,
        `Sound3d['SoundKey'].Put(1.0,1.0);`
      )
      expect(statement.element).toBe('sound3d')
      expect(statement.function).toBe('put')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 8, 1, 18, `'SoundKey'`)
      expect(key.value).toBe('SoundKey')

      expect(statement.arguments.length).toBe(2)
      const x = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 24, 1, 27, `1.0`)
      expect(x.value).toBe('1.0')

      const y = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 28, 1, 31, `1.0`)
      expect(y.value).toBe('1.0')
    })

    it('parse Rollingnoise.Change(Index)', () => {
      const statement = execParseSingleStatement(
        `Rollingnoise.Change(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        25,
        `Rollingnoise.Change(1.0);`
      )
      expect(statement.element).toBe('rollingnoise')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(1)
      const index = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(index, ast.NodeType.Number, 1, 20, 1, 23, `1.0`)
      expect(index.value).toBe('1.0')
    })

    it('parse Flangenoise.Change(Index)', () => {
      const statement = execParseSingleStatement(
        `Flangenoise.Change(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        24,
        `Flangenoise.Change(1.0);`
      )
      expect(statement.element).toBe('flangenoise')
      expect(statement.function).toBe('change')

      expect(statement.arguments.length).toBe(1)
      const index = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(index, ast.NodeType.Number, 1, 19, 1, 22, `1.0`)
      expect(index.value).toBe('1.0')
    })

    it('parse Jointnoise.Play(Index)', () => {
      const statement = execParseSingleStatement(
        `Jointnoise.Play(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        21,
        `Jointnoise.Play(1.0);`
      )
      expect(statement.element).toBe('jointnoise')
      expect(statement.function).toBe('play')

      expect(statement.arguments.length).toBe(1)
      const index = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(index, ast.NodeType.Number, 1, 16, 1, 19, `1.0`)
      expect(index.value).toBe('1.0')
    })

    it('parse Train.Add(TrainKey,FilePath)', () => {
      const statement = execParseSingleStatement(
        `Train.Add('string_test_value','string_test_value');`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        51,
        `Train.Add('string_test_value','string_test_value');`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('add')

      expect(statement.arguments.length).toBe(2)
      const trainkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trainkey,
        ast.NodeType.String,
        1,
        10,
        1,
        29,
        `'string_test_value'`
      )
      expect(trainkey.value).toBe('string_test_value')

      const filepath = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        30,
        1,
        49,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')
    })

    it('parse Train.Add(TrainKey,FilePath,TrackKey,Direction)', () => {
      const statement = execParseSingleStatement(
        `Train.Add('string_test_value','string_test_value','string_test_value',1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        75,
        `Train.Add('string_test_value','string_test_value','string_test_value',1.0);`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('add')

      expect(statement.arguments.length).toBe(4)
      const trainkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trainkey,
        ast.NodeType.String,
        1,
        10,
        1,
        29,
        `'string_test_value'`
      )
      expect(trainkey.value).toBe('string_test_value')

      const filepath = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        30,
        1,
        49,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')

      const trackkey = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        50,
        1,
        69,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const direction = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(direction, ast.NodeType.Number, 1, 70, 1, 73, `1.0`)
      expect(direction.value).toBe('1.0')
    })

    it('parse Train[TrainKey].Load(FilePath,TrackKey,Direction)', () => {
      const statement = execParseSingleStatement(
        `Train['TrainKey'].Load('string_test_value','string_test_value',1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        68,
        `Train['TrainKey'].Load('string_test_value','string_test_value',1.0);`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('load')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrainKey'`)
      expect(key.value).toBe('TrainKey')

      expect(statement.arguments.length).toBe(3)
      const filepath = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        filepath,
        ast.NodeType.String,
        1,
        23,
        1,
        42,
        `'string_test_value'`
      )
      expect(filepath.value).toBe('string_test_value')

      const trackkey = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        43,
        1,
        62,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const direction = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(direction, ast.NodeType.Number, 1, 63, 1, 66, `1.0`)
      expect(direction.value).toBe('1.0')
    })

    it('parse Train[TrainKey].Enable(Time)', () => {
      const statement = execParseSingleStatement(
        `Train['TrainKey'].Enable('string_test_value');`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        46,
        `Train['TrainKey'].Enable('string_test_value');`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('enable')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrainKey'`)
      expect(key.value).toBe('TrainKey')

      expect(statement.arguments.length).toBe(1)
      const time = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        time,
        ast.NodeType.String,
        1,
        25,
        1,
        44,
        `'string_test_value'`
      )
      expect(time.value).toBe('string_test_value')
    })

    it('parse Train[TrainKey].Enable(Second)', () => {
      const statement = execParseSingleStatement(
        `Train['TrainKey'].Enable(1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        30,
        `Train['TrainKey'].Enable(1.0);`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('enable')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrainKey'`)
      expect(key.value).toBe('TrainKey')

      expect(statement.arguments.length).toBe(1)
      const second = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(second, ast.NodeType.Number, 1, 25, 1, 28, `1.0`)
      expect(second.value).toBe('1.0')
    })

    it('parse Train[TrainKey].Stop(Decelerate,StopTime,Accelerate,Speed)', () => {
      const statement = execParseSingleStatement(
        `Train['TrainKey'].Stop(1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        40,
        `Train['TrainKey'].Stop(1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('stop')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrainKey'`)
      expect(key.value).toBe('TrainKey')

      expect(statement.arguments.length).toBe(4)
      const decelerate = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(decelerate, ast.NodeType.Number, 1, 23, 1, 26, `1.0`)
      expect(decelerate.value).toBe('1.0')

      const stoptime = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(stoptime, ast.NodeType.Number, 1, 27, 1, 30, `1.0`)
      expect(stoptime.value).toBe('1.0')

      const accelerate = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(accelerate, ast.NodeType.Number, 1, 31, 1, 34, `1.0`)
      expect(accelerate.value).toBe('1.0')

      const speed = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(speed, ast.NodeType.Number, 1, 35, 1, 38, `1.0`)
      expect(speed.value).toBe('1.0')
    })

    it('parse Train[TrainKey].Settrack(TrackKey,Direction)', () => {
      const statement = execParseSingleStatement(
        `Train['TrainKey'].Settrack('string_test_value',1.0);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        52,
        `Train['TrainKey'].Settrack('string_test_value',1.0);`
      )
      expect(statement.element).toBe('train')
      expect(statement.function).toBe('settrack')

      const key = statement.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 16, `'TrainKey'`)
      expect(key.value).toBe('TrainKey')

      expect(statement.arguments.length).toBe(2)
      const trackkey = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(
        trackkey,
        ast.NodeType.String,
        1,
        27,
        1,
        46,
        `'string_test_value'`
      )
      expect(trackkey.value).toBe('string_test_value')

      const direction = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(direction, ast.NodeType.Number, 1, 47, 1, 50, `1.0`)
      expect(direction.value).toBe('1.0')
    })

    it('parse Legacy.Fog(Fogstart,Fogend,red,green,blue)', () => {
      const statement = execParseSingleStatement(
        `Legacy.Fog(1.0,1.0,1.0,1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        32,
        `Legacy.Fog(1.0,1.0,1.0,1.0,1.0);`
      )
      expect(statement.element).toBe('legacy')
      expect(statement.function).toBe('fog')

      expect(statement.arguments.length).toBe(5)
      const fogstart = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(fogstart, ast.NodeType.Number, 1, 11, 1, 14, `1.0`)
      expect(fogstart.value).toBe('1.0')

      const fogend = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(fogend, ast.NodeType.Number, 1, 15, 1, 18, `1.0`)
      expect(fogend.value).toBe('1.0')

      const red = statement.arguments[2] as ast.ValueNode
      assertMapAstNode(red, ast.NodeType.Number, 1, 19, 1, 22, `1.0`)
      expect(red.value).toBe('1.0')

      const green = statement.arguments[3] as ast.ValueNode
      assertMapAstNode(green, ast.NodeType.Number, 1, 23, 1, 26, `1.0`)
      expect(green.value).toBe('1.0')

      const blue = statement.arguments[4] as ast.ValueNode
      assertMapAstNode(blue, ast.NodeType.Number, 1, 27, 1, 30, `1.0`)
      expect(blue.value).toBe('1.0')
    })

    it('parse Legacy.Curve(radius,cant)', () => {
      const statement = execParseSingleStatement(
        `Legacy.Curve(1.0,1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        22,
        `Legacy.Curve(1.0,1.0);`
      )
      expect(statement.element).toBe('legacy')
      expect(statement.function).toBe('curve')

      expect(statement.arguments.length).toBe(2)
      const radius = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(radius, ast.NodeType.Number, 1, 13, 1, 16, `1.0`)
      expect(radius.value).toBe('1.0')

      const cant = statement.arguments[1] as ast.ValueNode
      assertMapAstNode(cant, ast.NodeType.Number, 1, 17, 1, 20, `1.0`)
      expect(cant.value).toBe('1.0')
    })

    it('parse Legacy.Pitch(rate)', () => {
      const statement = execParseSingleStatement(
        `Legacy.Pitch(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        18,
        `Legacy.Pitch(1.0);`
      )
      expect(statement.element).toBe('legacy')
      expect(statement.function).toBe('pitch')

      expect(statement.arguments.length).toBe(1)
      const rate = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(rate, ast.NodeType.Number, 1, 13, 1, 16, `1.0`)
      expect(rate.value).toBe('1.0')
    })

    it('parse Legacy.Turn(slope)', () => {
      const statement = execParseSingleStatement(
        `Legacy.Turn(1.0);`
      ) as ast.MapFunctionNode
      assertMapAstNode(
        statement,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        17,
        `Legacy.Turn(1.0);`
      )
      expect(statement.element).toBe('legacy')
      expect(statement.function).toBe('turn')

      expect(statement.arguments.length).toBe(1)
      const slope = statement.arguments[0] as ast.ValueNode
      assertMapAstNode(slope, ast.NodeType.Number, 1, 12, 1, 15, `1.0`)
      expect(slope.value).toBe('1.0')
    })
  })
})
