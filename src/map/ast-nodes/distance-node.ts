import { MapAstNode } from './map-ast-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing distance variable
 */
export class DistanceNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.Distance
  }
}
