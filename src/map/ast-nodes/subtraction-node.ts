import { InfixExpressionNode } from './infix-expression-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing subtraction
 */
export class SubtractionNode extends InfixExpressionNode {
  get type(): NodeType {
    return NodeType.Subtraction
  }
}
