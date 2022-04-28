import * as ast from '.'

/**
 * Map AST node showing a statement.
 */
export type StatementNode =
  | ast.DistanceStatementNode
  | ast.VarAssignStatementNode
  | ast.MapFunctionNode
  | ast.MapFunctionWithKeyNode
  | ast.MapFunctionWithKeyAndSubelementNode
