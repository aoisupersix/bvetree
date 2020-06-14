import { SingleArgumentMathFunctionNode } from './single-argument-math-function-node'
import { NodeType } from './node-type'

/**
 * Map AST node showing floor() function
 */
export class FloorNode extends SingleArgumentMathFunctionNode {
  get type(): NodeType {
    return NodeType.Floor
  }
}
