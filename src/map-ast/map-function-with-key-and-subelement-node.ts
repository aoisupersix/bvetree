import { MapFunctionWithKeyNode } from '.'

/**
 * Map Ast node indicating the map syntax with the map element, subelement, key, function name, and argument.
 */
export interface MapFunctionWithKeyAndSubelementNode
  extends MapFunctionWithKeyNode {
  /**
   * Map subelement name.
   * This property returns the element name exactly as input. That is, case insensitive.
   */
  subElement: string
}
