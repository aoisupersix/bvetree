import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { ExpressionNode } from './expression-node'

/**
 * Map AST node showing unary operation
 */
export class UnaryNode extends MapAstNode {
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
