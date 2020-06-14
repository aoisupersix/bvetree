import { InfixExpressionNode } from './infix-expression-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing modulo
 */
export class ModuloNode extends InfixExpressionNode {
  get type(): NodeType {
    return NodeType.Modulo
  }
}
