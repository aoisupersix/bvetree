import { execParseSingleStatement, assertMapAstNode } from './util'
import { MapFunctionNode, NumberNode } from '#/map/ast-nodes'

describe('MapV2Parser', () => {
  describe('#parse_map_function', () => {
    it('parse Curve.SetGauge(value)', () => {
      const curveSetgauge = execParseSingleStatement(
        'Curve.SetGauge(1.067);'
      ) as MapFunctionNode
      expect(curveSetgauge).toBeTruthy()
      assertMapAstNode(curveSetgauge, 1, 0, 1, 22, 'Curve.SetGauge(1.067);')
      expect(curveSetgauge.elementName).toBe('curve')
      expect(curveSetgauge.functionName).toBe('setgauge')
      expect(curveSetgauge.arguments.length).toBe(1)

      const value = curveSetgauge.arguments[0] as NumberNode
      expect(value).toBeTruthy()
      assertMapAstNode(value, 1, 15, 1, 20, '1.067')
      expect(value.value).toBe('1.067')
    })
  })
})
