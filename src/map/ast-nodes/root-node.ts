import { Token } from '#token'
import { MapAstNode } from './map-ast-node'

export class RootNode extends MapAstNode {
  get version(): Token {
    return this._version
  }

  get encoding(): Token | undefined {
    return this._encoding
  }

  constructor(
    start: Token,
    end: Token | undefined,
    text: string,
    private _version: Token,
    private _encoding: Token | undefined
  ) {
    super(start, end, text)
  }
}
