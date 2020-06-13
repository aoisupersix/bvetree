import { Position } from '#/position'
import { MapAstNode } from './map-ast-node'

export class RootNode extends MapAstNode {
  constructor(start: Position, end: Position, text: string) {
    super(start, end, text)
  }
}
