import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map parser base ast node.
 * All ast nodes inherit this class.
 */
export abstract class MapAstNode {
  abstract get type(): NodeType

  get start(): Position {
    return this._start
  }

  get end(): Position {
    return this._end
  }

  get text(): string {
    return this._text
  }

  constructor(
    private readonly _start: Position,
    private readonly _end: Position,
    private readonly _text: string
  ) {}
}
