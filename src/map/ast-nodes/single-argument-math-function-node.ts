import { ExpressionNode, MapAstNode } from '.'
import { Position } from '#/position'

/**
 * Map AST node indicating a mathematical function that takes one argument
 */
export abstract class SingleArgumentMathFunctionNode extends MapAstNode {
  get value(): ExpressionNode {
    return this._value
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _value: ExpressionNode
  ) {
    super(start, end, text)
  }
}
