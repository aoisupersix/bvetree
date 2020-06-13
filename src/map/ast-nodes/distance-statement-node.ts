import { MapAstNode } from './map-ast-node'
import { ExpressionNode } from './expression-node'
import { Position } from '#/position'

/**
 * Map AST node showing a distance statement
 */
export class DistanceStatementNode extends MapAstNode {
  constructor(
    start: Position,
    end: Position,
    text: string,
    private _value: ExpressionNode
  ) {
    super(start, end, text)
  }
}
