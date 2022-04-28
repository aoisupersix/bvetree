import { MapAstNode } from '.'

/**
 * Map AST node showing a numerical or string value.
 */
export interface ValueNode extends MapAstNode {
  /**
   * String indicating value.
   */
  value: string
}
