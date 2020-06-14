import { InfixExpressionNode } from './infix-expression-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing multiplication
 */
export class MultiplicationNode extends InfixExpressionNode {
  get type(): NodeType {
    return NodeType.Multiplication
  }
}
