import { MapAstNode } from '.'

/**
 * Map AST node showing variable declaration.
 */
export interface VarAssignStatementNode extends MapAstNode {
  /**
   * Variable name.
   */
  varName: string

  /**
   * Variable value.
   */
  value: MapAstNode
}
