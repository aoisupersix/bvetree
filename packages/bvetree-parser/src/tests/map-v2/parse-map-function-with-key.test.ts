import { execParseSingleStatement, assertMapAstNode } from './util'
import * as ast from '@bvetree/ast/src/map-v2'

describe('MapV2Parser', () => {
  describe('#parse_map_function_with_key', () => {
    it('parse Track[trackKey].Position(x, y)', () => {
      const trackPosition = execParseSingleStatement(
        `Track['key'].Position(0, 1);`
      ) as ast.MapFunctionWithKeyNode
      assertMapAstNode(
        trackPosition,
        ast.NodeType.MapFunctionWithKey,
        1,
        0,
        1,
        28,
        `Track['key'].Position(0, 1);`
      )
      expect(trackPosition.element).toBe('track')
      expect(trackPosition.function).toBe('position')
      expect(trackPosition.arguments.length).toBe(2)

      const key = trackPosition.key as ast.ValueNode
      assertMapAstNode(key, ast.NodeType.String, 1, 6, 1, 11, `'key'`)
      expect(key.value).toBe('key')

      const x = trackPosition.arguments[0] as ast.ValueNode
      assertMapAstNode(x, ast.NodeType.Number, 1, 22, 1, 23, '0')
      expect(x.value).toBe('0')

      const y = trackPosition.arguments[1] as ast.ValueNode
      assertMapAstNode(y, ast.NodeType.Number, 1, 25, 1, 26, '1')
      expect(y.value).toBe('1')
    })
  })
})
