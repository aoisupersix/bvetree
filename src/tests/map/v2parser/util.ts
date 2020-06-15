import { RootNode, isRootNode } from '#/map/ast-nodes/root-node'
import { MapV2Parser } from '#/map/v2parser/map-v2-parser'
import { MapAstNode, StatementNode } from '#/map/ast-nodes'

/**
 * Execute MapV2Parser.parse() and return the return value as RootNode or null
 * @param input string to parse
 */
export const execParse = (input: string): RootNode | null => {
  const ast = new MapV2Parser().parse(input)
  if (isRootNode(ast)) {
    return ast
  }

  return null
}

/**
 * Execute MapV2Parser.parse() as single statement and return the return value as StatementNode or null.
 * Returns null if input contains multiple statements.
 * @param input string to parse
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
 * Assertion check of MapAstNode
 * @param node assertion target node
 * @param startLine node start line
 * @param startCharPositionInLine node start position
 * @param endLine node end line
 * @param endCharPositionInLine node end position
 * @param text node text
 */
export const assertMapAstNode = (
  node: MapAstNode,
  startLine: number,
  startCharPositionInLine: number,
  endLine: number,
  endCharPositionInLine: number,
  text: string
): void => {
  expect(node.start.line).toBe(startLine)
  expect(node.start.charPositionInLine).toBe(startCharPositionInLine)
  expect(node.end.line).toBe(endLine)
  expect(node.end.charPositionInLine).toBe(endCharPositionInLine)
  expect(node.text).toBe(text)
}
