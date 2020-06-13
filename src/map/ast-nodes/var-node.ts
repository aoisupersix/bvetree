import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'

/**
 * Map AST node showing variable
 */
export class VarNode extends MapAstNode {
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
