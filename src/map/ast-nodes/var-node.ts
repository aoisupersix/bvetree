import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map AST node showing variable
 */
export class VarNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.Var
  }

  get varName(): string {
    return this._varName
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _varName: string
  ) {
    super(start, end, text)
  }
}
