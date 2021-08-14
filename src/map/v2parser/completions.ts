import { computeTokenIndex } from '#/compute-token-position'
import { Position } from '#/position'
import { CodeCompletionCore } from 'antlr4-c3'
import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser } from './gen/MapParser'

export const getSuggestions = (input: string, position: Position): string[] => {
  const inputStream = CharStreams.fromString(input)
  const lexer = new MapLexer(inputStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new MapParser(tokenStream)
  const cst = parser.root()

  const index = computeTokenIndex(cst, position)
  if (index === undefined) {
    return []
  }

  const core = new CodeCompletionCore(parser)
  const candidates = core.collectCandidates(index)
  const completions: string[] = []
  candidates.tokens.forEach((_, key) => {
    const tokenName = parser.vocabulary.getSymbolicName(key)
    if (tokenName !== undefined) {
      completions.push(tokenName)
    }
  })

  return completions
}
