import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing sin() function
 */
export class SinNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Sin
  }
}
