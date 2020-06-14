import { InfixExpressionNode } from './infix-expression-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing division
 */
export class DivisionNode extends InfixExpressionNode {
  get type(): NodeType {
    return NodeType.Division
  }
}
