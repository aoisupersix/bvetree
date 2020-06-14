import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing sqrt() function
 */
export class SqrtNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Sqrt
  }
}
