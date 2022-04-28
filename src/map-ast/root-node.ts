import { MapAstNode, StatementNode } from '.'

/**
 * Node indicating the map file.
 */
export interface RootNode extends MapAstNode {
  /**
   * All statements in the map file.
   */
  statements: StatementNode[]
}
