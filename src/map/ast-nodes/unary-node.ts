import { MapAstNode } from '.'
import { Position } from '#/position'

/**
 * Map AST node showing unary operation
 */
export class UnaryNode extends MapAstNode {
  get innerValue(): string {
    return this._innerValue
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _innerValue: string
  ) {
    super(start, end, text)
  }
}
