import { MapAstNode } from './map-ast-node'
import { Position } from '#/position'

/**
 * Map AST node showing atan2() function
 */
export class Atan2Node extends MapAstNode {
  get x(): string {
    return this._x
  }

  get y(): string {
    return this._y
  }
  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _x: string,
    private readonly _y: string
  ) {
    super(start, end, text)
  }
}
