import { execParseSingleStatement, assertMapAstNode } from './util'
import * as ast from '@bvetree/ast/src/map-v2'

describe('MapV2Parser', () => {
  describe('#parse_map_function', () => {
    it('parse Curve.SetGauge(value)', () => {
      const curveSetgauge = execParseSingleStatement(
        'Curve.SetGauge(1.067);'
      ) as ast.MapFunctionNode
      assertMapAstNode(
        curveSetgauge,
        ast.NodeType.MapFunction,
        1,
        0,
        1,
        22,
        'Curve.SetGauge(1.067);'
      )
      expect(curveSetgauge.element).toBe('curve')
      expect(curveSetgauge.function).toBe('setgauge')
      expect(curveSetgauge.arguments.length).toBe(1)

      const value = curveSetgauge.arguments[0] as ast.ValueNode
      assertMapAstNode(value, ast.NodeType.Number, 1, 15, 1, 20, '1.067')
      expect(value.value).toBe('1.067')
    })
  })
})
