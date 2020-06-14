import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map AST node showing string literal
 */
export class StringNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.String
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
