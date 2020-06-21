import { ExpressionNode } from './expression-node'
import { NodeType } from './node-type'
import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'

/**
 * Map AST node showing rand() function
 */
export class RandNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.Rand
  }

  get value(): ExpressionNode | undefined {
    return this._value
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _value: ExpressionNode | undefined
  ) {
    super(start, end, text)
  }
}
