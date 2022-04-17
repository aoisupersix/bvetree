import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map parser base ast node.
 * All ast nodes inherit this interface.
 */
export interface MapAstNode {
  /**
   * Ast node type.
   */
  type: NodeType

  /**
   * Start position of node.
   * The position containing the first character of the node.
   */
  start: Position

  /**
   * End position of node.
   * The last position of the node + 1 is returned.
   */
  end: Position

  /**
   * The original string of the node.
   * Whitespaces are included.
   */
  text: string
}
