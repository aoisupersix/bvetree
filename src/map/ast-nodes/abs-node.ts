import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing abs() function
 */
export class AbsNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Abs
  }
}
