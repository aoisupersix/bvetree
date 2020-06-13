import { ExpressionNode, MapAstNode } from '.'

/**
 * Map AST node indicates a syntax that has an argument
 */
export abstract class SyntaxWithArgumentsNode extends MapAstNode {
  private _arguments: ExpressionNode[] = []

  get arguments(): ExpressionNode[] {
    return this._arguments
  }

  addArgument(argument: ExpressionNode): void {
    this._arguments.push(argument)
  }
}
