import {
  MapAstNode,
  NodeType,
  RootNode,
  StatementNode,
} from '@bvetree/ast/src/map-v2'
import { parse } from '@bvetree/parser/src/map-v2/map-v2-parser'
import {
  isDistanceStatementNode,
  isRootNode,
} from '@bvetree/parser/src/map-v2/util'

/**
 * Execute MapV2Parser.parse() and return the return value as RootNode or null.
 * @param input string to parse.
 */
export const execParse = (input: string): RootNode | null => {
  const ast = parse(input)
  if (isRootNode(ast)) {
    return ast
  }

  return null
}

/**
 * Execute MapV2Parser.parse() as single statement and return the return value as StatementNode or null.
 * Returns null if input contains multiple statements.
 * @param input string to parse.
 */
export const execParseSingleStatement = (
  input: string
): StatementNode | null => {
  const root = execParse(input)
  if (root !== null && root.statements.length === 1) {
    return root.statements[0]
  }

  return null
}

/**
 * Execute MapV2Parser.parse() as single distance statement and return the return value as DistanceStatementNode.value or null.
 * Returns null if input contains multiple statements.
 * @param input string to parse.
 */
export const execParseExpression = (input: string): MapAstNode | null => {
  const statement = execParseSingleStatement(input)
  if (isDistanceStatementNode(statement)) {
    return statement.value
  }

  return null
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
  node: MapAstNode | null,
  type: NodeType,
  startLine: number,
  startCharIndexInLine: number,
  endLine: number,
  endCharIndexInLine: number,
  text: string
): void => {
  if (node === null) {
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
