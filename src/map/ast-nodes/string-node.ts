import { MapAstNode } from '.'
import { Position } from '#/position'

/**
 * Map AST node showing string literal
 */
export class StringNode extends MapAstNode {
  get value(): string {
    return this._value
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _value: string
  ) {
    super(start, end, text)
  }
}
