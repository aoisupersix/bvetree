import { MapAstNode } from './map-ast-node'

/**
 * Expression AST node allowing undefined.
 * Used as argument type.
 */
type NullableMapAstNode = MapAstNode | undefined

/**
 * Map AST node indicating a function that takes arguments.
 */
export interface FunctionNode extends MapAstNode {
  /**
   * Arguments specified in this function.
   * The arguments are stored in an array, starting with the first argument.
   * ex. Curve.Begin(0, 1) => arguments[0] = 0(NumberNode), arguments[1] = 1(NumberNode)
   * If the argument value is null or omitted, null is stored.
   * If no argument exists, null is stored in arguments[0].
   */
  arguments: NullableMapAstNode[]
}
