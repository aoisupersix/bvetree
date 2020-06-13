import { ExpressionNode, MapAstNode } from '.'
import { Position } from '#/position'

/**
 * Map AST node showing a distance statement
 */
export class DistanceStatementNode extends MapAstNode {
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
