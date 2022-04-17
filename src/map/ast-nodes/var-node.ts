import { MapAstNode } from './map-ast-node'

/**
 * Map AST node showing variable
 */
export interface VarNode extends MapAstNode {
  /**
   * Variable name.
   */
  varName: string
}
