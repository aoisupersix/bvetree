import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map AST node showing variable declaration
 */
export class VarAssignStatementNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.VarAssignStatement
  }

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
