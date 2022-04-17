import { MapAstNode } from './map-ast-node'

/**
 * Map AST node showing infix expression.
 */
export interface InfixExpressionNode extends MapAstNode {
  /**
   * Left expression.
   */
  left: MapAstNode

  /**
   * Right expression.
   */
  right: MapAstNode
}
