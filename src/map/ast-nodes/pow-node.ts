import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { ExpressionNode } from './expression-node'

/**
 * Map AST node showing pow() function
 */
export class PowNode extends MapAstNode {
  get x(): ExpressionNode {
    return this._x
  }

  get y(): ExpressionNode {
    return this._y
  }
  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _x: ExpressionNode,
    private readonly _y: ExpressionNode
  ) {
    super(start, end, text)
  }
}
