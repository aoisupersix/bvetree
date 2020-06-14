import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map AST node showing a numerical term
 */
export class NumberNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.Number
  }

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
