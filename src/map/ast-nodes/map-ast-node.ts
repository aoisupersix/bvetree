import { Token } from '#/token'

/**
 * Map parser base ast node.
 * All ast nodes inherit this class.
 */
export abstract class MapAstNode {
  get start(): Token {
    return this._start
  }

  get end(): Token | undefined {
    return this._end
  }

  get text(): string {
    return this._text
  }

  constructor(
    private _start: Token,
    private _end: Token | undefined,
    private _text: string
  ) {}
}
