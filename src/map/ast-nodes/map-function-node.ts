import { SyntaxWithArgumentsNode } from '.'
import { Position } from '#/position'

/**
 * Map Ast node indicating the map syntax with the map element, function name, and argument
 */
export class MapFunctionNode extends SyntaxWithArgumentsNode {
  /**
   * Map element name.
   * This property returns the element name exactly as input. That is, case insensitive.
   */
  get elementName(): string {
    return this._elementName
  }

  /**
   * Map function name.
   * This property returns the element name exactly as input. That is, case insensitive.
   */
  get functionName(): string {
    return this._functionName
  }

  constructor(
    start: Position,
    end: Position,
    text: string,
    private readonly _elementName: string,
    private readonly _functionName: string
  ) {
    super(start, end, text)
  }
}
