import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map parser base ast node.
 * All ast nodes inherit this class.
 */
export abstract class MapAstNode {
  abstract get type(): NodeType

  /**
   * Start position of node.
   * The position containing the first character of the node.
   */
  get start(): Position {
    return this._start
  }

  /**
   * End position of node.
   * The last position of the node + 1 is returned.
   */
  get end(): Position {
    return this._end
  }

  /**
   * The original string of the node.
   * Whitespaces are included.
   */
  get text(): string {
    return this._text
  }

  constructor(
    private readonly _start: Position,
    private readonly _end: Position,
    private readonly _text: string
  ) {}
}
