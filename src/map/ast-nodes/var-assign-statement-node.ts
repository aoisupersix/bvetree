import { MapAstNode } from '.'
import { Position } from '#/position'

/**
 * Map AST node showing variable declaration
 */
export class VarAssignStatementNode extends MapAstNode {
  get varName(): string {
    return this._varName
  }

  get value(): MapAstNode {
    return this._value
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _varName: string,
    private readonly _value: MapAstNode
  ) {
    super(start, end, text)
  }
}
