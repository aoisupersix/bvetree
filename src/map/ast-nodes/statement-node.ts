import { DistanceStatementNode } from './distance-statement-node'
import { MapFunctionNode } from './map-function-node'
import { MapFunctionWithKeyNode } from './map-function-with-key-node'
import { MapFunctionWithKeyAndSubelementNode } from './map-function-with-key-and-subelement-node'
import { VarAssignStatementNode } from './var-assign-statement-node'
import { NodeType } from './node-type'
import { MapAstNode } from './map-ast-node'

export type StatementNode =
  | DistanceStatementNode
  | VarAssignStatementNode
  | MapFunctionNode
  | MapFunctionWithKeyNode
  | MapFunctionWithKeyAndSubelementNode

const statementNodeTypes: NodeType[] = [
  NodeType.DistanceStatement,
  NodeType.VarAssignStatement,
  NodeType.MapFunction,
  NodeType.MapFunctionWithKey,
  NodeType.MapFunctionWithKeyAndSubelement,
]

/**
 * Type guard of StatementNode
 * @param node Ast node or null | undefined
 */
export const isStatementNode = (
  node: MapAstNode | null | undefined
): node is StatementNode =>
  node !== null && node !== undefined && statementNodeTypes.includes(node.type)
