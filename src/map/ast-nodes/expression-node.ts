import { AbsNode } from './abs-node'
import { AdditionNode } from './addition-node'
import { Atan2Node } from './atan2-node'
import { CeilNode } from './ceil-node'
import { CosNode } from './cos-node'
import { DistanceNode } from './distance-node'
import { DivisionNode } from './division-node'
import { ExpNode } from './exp-node'
import { FloorNode } from './floor-node'
import { LogNode } from './log-node'
import { ModuloNode } from './modulo-node'
import { MultiplicationNode } from './multiplication-node'
import { NumberNode } from './number-node'
import { PowNode } from './pow-node'
import { RandNode } from './rand-node'
import { SinNode } from './sin-node'
import { SqrtNode } from './sqrt-node'
import { StringNode } from './string-node'
import { SubtractionNode } from './subtraction-node'
import { UnaryNode } from './unary-node'
import { VarNode } from './var-node'

/**
 * Map AST node showing a formula
 */
export type ExpressionNode =
  | AbsNode
  | AdditionNode
  | Atan2Node
  | CeilNode
  | CosNode
  | DistanceNode
  | DivisionNode
  | ExpNode
  | FloorNode
  | LogNode
  | ModuloNode
  | MultiplicationNode
  | NumberNode
  | PowNode
  | RandNode
  | SinNode
  | SqrtNode
  | StringNode
  | SubtractionNode
  | UnaryNode
  | VarNode
