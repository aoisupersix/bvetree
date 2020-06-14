import { ExpressionNode } from './expression-node'
import { MapFunctionNode } from './map-function-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map Ast node indicating the map syntax with the map element, key, function name, and argument
 */
export class MapFunctionWithKeyNode extends MapFunctionNode {
  get type(): NodeType {
    return NodeType.MapFunctionWithKey
  }

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
