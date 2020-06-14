import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing ceil() function
 */
export class CeilNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Ceil
  }
}
