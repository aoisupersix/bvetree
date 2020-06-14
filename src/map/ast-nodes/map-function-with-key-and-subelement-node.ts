import { ExpressionNode } from './expression-node'
import { MapFunctionWithKeyNode } from './map-function-with-key-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

/**
 * Map Ast node indicating the map syntax with the map element, subelement, key, function name, and argument
 */
export class MapFunctionWithKeyAndSubelementNode extends MapFunctionWithKeyNode {
  get type(): NodeType {
    return NodeType.MapFunctionWithKeyAndSubelement
  }

  /**
   * Map subelement name.
   * This property returns the element name exactly as input. That is, case insensitive.
   */
  get subelementName(): string {
    return this.subelementName
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    elementName: string,
    functionName: string,
    key: ExpressionNode
  ) {
    super(start, end, text, elementName, functionName, key)
  }
}
