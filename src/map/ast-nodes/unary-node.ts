import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { ExpressionNode } from './expression-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing unary operation
 */
export class UnaryNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.Unary
  }

  get innerValue(): ExpressionNode {
    return this._innerValue
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _innerValue: ExpressionNode
  ) {
    super(start, end, text)
  }
}
