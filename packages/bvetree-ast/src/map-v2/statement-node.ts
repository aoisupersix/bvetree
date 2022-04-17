import { DistanceStatementNode } from './distance-statement-node'
import { MapFunctionNode } from './map-function-node'
import { MapFunctionWithKeyNode } from './map-function-with-key-node'
import { MapFunctionWithKeyAndSubelementNode } from './map-function-with-key-and-subelement-node'
import { VarAssignStatementNode } from './var-assign-statement-node'

/**
 * Map AST node showing a statement.
 */
export type StatementNode =
  | DistanceStatementNode
  | VarAssignStatementNode
  | MapFunctionNode
  | MapFunctionWithKeyNode
  | MapFunctionWithKeyAndSubelementNode
