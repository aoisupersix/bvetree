import {
  ANTLRErrorListener,
  CharStreams,
  CommonTokenStream,
  ConsoleErrorListener,
  Token,
} from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser } from './gen/MapParser'
import { Visitor } from './visitor'
import { MapAstNode } from '@bvetree/ast/src/map-v2'
import { MapGrammarErrorStrategy } from './error-strategy'

/**
 * Options specified for the parser.
 */
interface ParseOptions {
  /**
   * Custom listeners to handle parser errors.
   */
  errorListeners: ANTLRErrorListener<Token>[]
}

/**
 * Default parse options.
 */
const defaultParserOptions: ParseOptions = {
  errorListeners: [new ConsoleErrorListener()],
}

/**
 * Parses the syntax string showing BveTrainSim 5/6 map file to AST.
 * @param input syntax string showing BveTrainSim 5/6 map file
 * @returns AST node of parse result
 */
export const parse = (
  input: string,
  options = {} as Partial<ParseOptions>
): MapAstNode | null => {
  const { errorListeners } = { ...defaultParserOptions, ...options }

  const charStream = CharStreams.fromString(input)
  const lexer = new MapLexer(charStream)
  const tokenStream = new CommonTokenStream(lexer)

  const parser = new MapParser(tokenStream)
  parser.errorHandler = new MapGrammarErrorStrategy()
  parser.removeErrorListeners()
  if (errorListeners.length > 0) {
    errorListeners.forEach((errorListener) => {
      parser.addErrorListener(errorListener)
    })
  }

  const cst = parser.root()
  const ast = new Visitor(charStream).visit(cst)

  return ast
}
