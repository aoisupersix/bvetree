import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'

/**
 * Map AST node showing a numerical term
 */
export class NumberNode extends MapAstNode {
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
