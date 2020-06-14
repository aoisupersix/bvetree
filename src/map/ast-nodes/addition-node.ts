import { InfixExpressionNode } from './infix-expression-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing addition
 */
export class AdditionNode extends InfixExpressionNode {
  get type(): NodeType {
    return NodeType.Addition
  }
}
