import { execParseSingleStatement, assertMapAstNode } from './util'
import { MapFunctionWithKeyNode, NumberNode, StringNode } from '#/map/ast-nodes'

describe('MapV2Parser', () => {
  describe('#parse_map_function_with_key', () => {
    it('parse Track[trackKey].Position(x, y)', () => {
      const trackPosition = execParseSingleStatement(
        `Track['key'].Position(0, 1);`
      ) as MapFunctionWithKeyNode
      expect(trackPosition).toBeTruthy()
      assertMapAstNode(
        trackPosition,
        1,
        0,
        1,
        28,
        `Track['key'].Position(0, 1);`
      )
      expect(trackPosition.elementName).toBe('track')
      expect(trackPosition.functionName).toBe('position')
      expect(trackPosition.arguments.length).toBe(2)

      const key = trackPosition.key as StringNode
      expect(key).toBeTruthy()
      assertMapAstNode(key, 1, 6, 1, 11, `'key'`)
      expect(key.value).toBe('key')

      const x = trackPosition.arguments[0] as NumberNode
      expect(x).toBeTruthy()
      assertMapAstNode(x, 1, 22, 1, 23, '0')
      expect(x.value).toBe('0')
    })
  })
})
