import { VarNode } from './var-node'
import { NumberNode } from './number-node'

/**
 * Map AST node showing a formula
 */
export type ExpressionNode = VarNode | NumberNode
