import { MapAstNode, MapFunctionNode } from '.'

/**
 * Map Ast node indicating the map syntax with the map element, key, function name, and argument.
 */
export interface MapFunctionWithKeyNode extends MapFunctionNode {
  /**
   * Syntax key.
   */
  key: MapAstNode
}
