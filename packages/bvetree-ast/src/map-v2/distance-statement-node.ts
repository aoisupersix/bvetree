import { MapAstNode } from './map-ast-node'

/**
 * Map AST node showing a distance statement.
 */
export interface DistanceStatementNode extends MapAstNode {
  /**
   * Distance value.
   */
  value: MapAstNode
}
