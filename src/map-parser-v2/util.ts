import { CharStream, ParserRuleContext, Token } from 'antlr4ts'
import { Interval } from 'antlr4ts/misc/Interval'
import { Position } from '..'
import { mapAst as ast } from '..'

// #region TypeGuards
/**
 * Type guard of DistanceStatementNode.
 * @param node Ast node or null | undefined.
 */
export const isDistanceStatementNode = (
  node: ast.MapAstNode | null | undefined
): node is ast.DistanceStatementNode =>
  node !== null &&
  node !== undefined &&
  node.type === ast.NodeType.DistanceStatement

/**
 * Type guard of RootNode.
 * @param node Ast node or null | undefined.
 */
export const isRootNode = (
  node: ast.MapAstNode | null | undefined
): node is ast.RootNode =>
  node !== null && node !== undefined && node.type === ast.NodeType.Root

const statementNodeTypes: ast.NodeType[] = [
  ast.NodeType.DistanceStatement,
  ast.NodeType.VarAssignStatement,
  ast.NodeType.MapFunction,
  ast.NodeType.MapFunctionWithKey,
  ast.NodeType.MapFunctionWithKeyAndSubelement,
]

/**
 * Type guard of StatementNode.
 * @param node Ast node or null | undefined.
 */
export const isStatementNode = (
  node: ast.MapAstNode | null | undefined
): node is ast.StatementNode =>
  node !== null && node !== undefined && statementNodeTypes.includes(node.type)
// #endregion TypeGuards

/**
 * Get original text (string containing whitespace) of context.
 * @param ctx Antlr rule context.
 * @param input Antlr character stream.
 * @returns Original text (string containing whitespace) of context.
 */
export const getOriginalTextOfContext = (
  ctx: ParserRuleContext,
  input: CharStream
): string => {
  const interval = new Interval(
    ctx.start.startIndex,
    ctx.stop?.stopIndex ?? ctx.start.startIndex
  )

  return input.getText(interval)
}

/**
 * Get original text (string containing whitespace) of token.
 * @param token Antlr token.
 * @param input Antlr character stream.
 * @returns Original text (string containing whitespace) of token.
 */
export const getOriginalTextOfToken = (
  token: Token,
  input: CharStream
): string => {
  const interval = new Interval(token.startIndex, token.stopIndex)

  return input.getText(interval)
}

/**
 * Get start position of context.
 * @param ctx Antlr rule context.
 * @returns Start position of context.
 */
export const getStartPosition = (ctx: ParserRuleContext): Position => {
  return {
    line: ctx.start.line,
    charIndexInLine: ctx.start.charPositionInLine,
  }
}

/**
 * Get end position of context.
 * If context end token is undefined, returns start position.
 * @param ctx Antlr rule context.
 * @returns End position of context.
 */
export const getEndPosition = (
  ctx: ParserRuleContext,
  input: CharStream
): Position => {
  const lastToken = ctx.stop ?? ctx.start
  return {
    line: ctx.stop?.line ?? ctx.start.line,
    charIndexInLine:
      lastToken.charPositionInLine +
      getOriginalTextOfToken(lastToken, input).length,
  }
}

/**
 * Create ast node.
 * @param type Ast node type.
 * @param ctx Antlr rule context.
 * @param input Antlr character stream.
 * @param nodeValue Node-specific value.
 * @returns Created ast node.
 */
export const createMapAstNode = <T extends ast.MapAstNode>(
  type: ast.NodeType,
  ctx: ParserRuleContext,
  input: CharStream,
  nodeValue: Omit<T, keyof ast.MapAstNode>
): T => {
  return {
    type: type,
    start: getStartPosition(ctx),
    end: getEndPosition(ctx, input),
    text: getOriginalTextOfContext(ctx, input),
    ...nodeValue,
  } as T
}
