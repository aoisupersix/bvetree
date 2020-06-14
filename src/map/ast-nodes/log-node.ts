import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing log() function
 */
export class LogNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Log
  }
}
