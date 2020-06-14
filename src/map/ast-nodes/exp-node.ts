import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing exp() function
 */
export class ExpNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Exp
  }
}
