import { MapAstNode } from './map-ast-node'
import { StatementNode } from './statement-node'

/**
 * Node indicating the map file.
 */
export interface RootNode extends MapAstNode {
  /**
   * All statements in the map file.
   */
  statements: StatementNode[]
}
