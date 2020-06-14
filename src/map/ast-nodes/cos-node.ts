import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing cos() function
 */
export class CosNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Cos
  }
}
