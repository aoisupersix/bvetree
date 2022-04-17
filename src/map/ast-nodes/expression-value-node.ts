import { MapAstNode } from './map-ast-node'

/**
 * Map AST node showing a inner expression node.
 */
export interface ExpressionValueNode extends MapAstNode {
  /**
   * Inner expression.
   */
  innerValue: MapAstNode
}
