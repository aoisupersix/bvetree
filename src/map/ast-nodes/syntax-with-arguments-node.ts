import { ExpressionNode } from './expression-node'
import { MapAstNode } from './map-ast-node'

/**
 * Expression AST node allowing null.
 * Used as argument type.
 */
type NullableExpressionNode = ExpressionNode | null

/**
 * Map AST node indicates a syntax that has an argument.
 */
export abstract class SyntaxWithArgumentsNode extends MapAstNode {
  private _arguments: NullableExpressionNode[] = []

  /**
   * Arguments specified in the syntax.
   * The arguments are stored in an array, starting with the first argument.
   * ex. Curve.Begin(0, 1) => arguments[0] = 0(NumberNode), arguments[1] = 1(NumberNode)
   * If the argument value is null or omitted, null is stored.
   * If no argument exists, null is stored in arguments[0].
   */
  get arguments(): NullableExpressionNode[] {
    return this._arguments
  }

  /**
   * Add argument at the end.
   * @param argument Argument to be added
   */
  addArgument(argument: NullableExpressionNode): void {
    this._arguments.push(argument)
  }
}
