import { FunctionNode } from './function-node'

/**
 * Map Ast node indicating the map syntax with the map element, function name, and argument.
 */
export interface MapFunctionNode extends FunctionNode {
  /**
   * Map element name.
   * This property returns the element name exactly as input. That is, case insensitive.
   */
  element: string

  /**
   * Map function name.
   * This property returns the element name exactly as input. That is, case insensitive.
   */
  function: string
}
