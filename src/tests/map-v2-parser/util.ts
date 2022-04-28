import { mapAst as ast, parseMapV2 } from '@'
import { isDistanceStatementNode, isRootNode } from '@/map-parser-v2/util'

/**
 * Execute MapV2Parser.parseMapV2() and return the return value as RootNode.
 * If failed to parse, test is failed.
 * @param input string to parse.
 */
export const execParse = (input: string): ast.RootNode => {
  const result = parseMapV2(input)
  expect(result.success).toBeTruthy()
  const ast = result.ast
  if (isRootNode(ast)) {
    return ast
  }

  throw new Error('Parse failed.')
}

/**
 * Execute MapV2Parser.parseMapV2() as single statement and return the return value as StatementNode.
 * If failed to parse or input contains multiple statements, test is failed.
 * @param input string to parse.
 */
export const execParseSingleStatement = (input: string): ast.StatementNode => {
  const root = execParse(input)
  expect(root.statements.length).toBe(1)
  return root.statements[0]
}

/**
 * Execute MapV2Parser.parseMapV2() as single distance statement and return the return value as DistanceStatementNode.value.
 * If failed to parse or input contains multiple statements, test is failed.
 * @param input string to parse.
 */
export const execParseExpression = (input: string): ast.MapAstNode => {
  const statement = execParseSingleStatement(input)
  if (!isDistanceStatementNode(statement)) {
    throw new Error('Parse failed.')
  }

  return statement.value
}

/**
 * Assertion check of MapAstNode.
 * @param node assertion target node.
 * @param type node type.
 * @param startLine node start line.
 * @param startCharIndexInLine node start char index.
 * @param endLine node end line.
 * @param endCharIndexInLine node end char index.
 * @param text node text.
 */
export const assertMapAstNode = (
  node: ast.MapAstNode | undefined,
  type: ast.NodeType,
  startLine: number,
  startCharIndexInLine: number,
  endLine: number,
  endCharIndexInLine: number,
  text: string
): void => {
  if (node === undefined) {
    expect(node).toBeTruthy()
    return
  }
  expect(node.type).toBe(type)
  expect(node.start.line).toBe(startLine)
  expect(node.start.charIndexInLine).toBe(startCharIndexInLine)
  expect(node.end.line).toBe(endLine)
  expect(node.end.charIndexInLine).toBe(endCharIndexInLine)
  expect(node.text).toBe(text)
}
