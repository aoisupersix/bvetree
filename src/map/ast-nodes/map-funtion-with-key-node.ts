import { MapFunctionNode } from './map-function-node'
import { Position } from '#/position'
import { ExpressionNode } from './expression-node'

/**
 * Map Ast node indicating the map syntax with the map element, key, function name, and argument
 */
export class MapFunctionWithKeyNode extends MapFunctionNode {
  get key(): ExpressionNode {
    return this._key
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    elementName: string,
    functionName: string,
    private readonly _key: ExpressionNode
  ) {
    super(start, end, text, elementName, functionName)
  }
}