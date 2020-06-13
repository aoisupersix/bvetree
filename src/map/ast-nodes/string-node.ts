import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'

/**
 * Map AST node showing string literal
 */
export class StringNode extends MapAstNode {
  get Value(): string {
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
