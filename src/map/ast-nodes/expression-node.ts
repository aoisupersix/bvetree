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
import { MapAstNode } from './map-ast-node'
import { NodeType } from './node-type'

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

const expressionNodeTypes: NodeType[] = [
  NodeType.Abs,
  NodeType.Addition,
  NodeType.Atan2,
  NodeType.Ceil,
  NodeType.Cos,
  NodeType.Distance,
  NodeType.Division,
  NodeType.Exp,
  NodeType.Floor,
  NodeType.Log,
  NodeType.Modulo,
  NodeType.Multiplication,
  NodeType.Number,
  NodeType.Pow,
  NodeType.Rand,
  NodeType.Sin,
  NodeType.Sqrt,
  NodeType.String,
  NodeType.Subtraction,
  NodeType.Unary,
  NodeType.Var,
]

/**
 * Type guard of ExpressionNode
 * @param node Ast node or null | undefined
 */
export const isExpressionNode = (
  node: MapAstNode | null | undefined
): node is ExpressionNode =>
  node !== null && node !== undefined && expressionNodeTypes.includes(node.type)
