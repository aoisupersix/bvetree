import { MapAstNode } from '.'

/**
 * Map AST node showing variable
 */
export interface VarNode extends MapAstNode {
  /**
   * Variable name.
   */
  varName: string
}
