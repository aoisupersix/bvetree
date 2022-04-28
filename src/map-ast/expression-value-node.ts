import { MapAstNode } from '.'

/**
 * Map AST node showing a inner expression node.
 */
export interface ExpressionValueNode extends MapAstNode {
  /**
   * Inner expression.
   */
  innerValue: MapAstNode
}
