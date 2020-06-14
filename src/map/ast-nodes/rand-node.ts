import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing rand() function
 */
export class RandNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Rand
  }
}
