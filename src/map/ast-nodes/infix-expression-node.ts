import { ExpressionNode } from './expression-node'
import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'

/**
 * Map AST node showing infix expression
 */
export abstract class InfixExpressionNode extends MapAstNode {
  get left(): MapAstNode {
    return this._left
  }

  get right(): MapAstNode {
    return this._right
  }
  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _left: ExpressionNode,
    private readonly _right: ExpressionNode
  ) {
    super(start, end, text)
  }
}
