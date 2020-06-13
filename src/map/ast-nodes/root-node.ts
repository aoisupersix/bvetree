import { Token } from '#token'
import { MapAstNode } from './map-ast-node'

export class RootNode extends MapAstNode {
  constructor(
    start: Token,
    end: Token | undefined,
    text: string,
    private _version: Token | undefined,
    private _encoding: Token | undefined
  ) {
    super(start, end, text)
  }
}
