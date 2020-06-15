import { ExpressionNode } from './expression-node'
import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map AST node showing a distance statement
 */
export class DistanceStatementNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.DistanceStatement
  }

  get value(): ExpressionNode {
    return this._value
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private _value: ExpressionNode
  ) {
    super(start, end, text)
  }
}

/**
 * Type guard of DistanceStatementNode
 * @param node Ast node or null | undefined
 */
export const isDistanceStatementNode = (
  node: MapAstNode | null | undefined
): node is DistanceStatementNode =>
  node !== null &&
  node !== undefined &&
  node.type === NodeType.DistanceStatement
