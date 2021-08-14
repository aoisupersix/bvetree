import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { Position } from './position'

export const computeTokenIndex = (
  parseTree: ParseTree,
  position: Position
): number | undefined => {
  if (parseTree instanceof TerminalNode) {
    return computeTokenPositionOfTerminal(parseTree, position)
  } else {
    return computeTokenPositionOfChildNode(parseTree, position)
  }
}

const computeTokenPositionOfTerminal = (
  parseTree: TerminalNode,
  position: Position
) => {
  const start = parseTree.symbol.charPositionInLine
  const stop = parseTree.symbol.charPositionInLine + parseTree.text.length

  if (
    parseTree.symbol.line === position.line &&
    start <= position.charPositionInLine &&
    stop >= position.charPositionInLine
  ) {
    return parseTree.symbol.tokenIndex
  }

  return undefined
}

const computeTokenPositionOfChildNode = (
  parseTree: ParseTree,
  position: Position
): number | undefined => {
  for (let i = 0; i < parseTree.childCount; i++) {
    const index = computeTokenIndex(parseTree.getChild(i), position)
    if (index !== undefined) {
      return index
    }
  }

  return undefined
}
