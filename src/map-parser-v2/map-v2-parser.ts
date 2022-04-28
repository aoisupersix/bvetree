import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser } from './gen/MapParser'
import { Visitor } from './visitor'
import { mapAst } from '..'
import { MapGrammarErrorStrategy } from './error-strategy'
import { ErrorListener } from '../error-listener'
import { ErrorListenerBridge } from './error-listener-bridge'
import { AstConversionError } from './ast-conversion-error'

/**
 * Options specified for the parser.
 */
interface ParseOptions {
  /**
   * Custom listeners to handle parser errors.
   */
  errorListeners: ErrorListener[]
}

/**
 * Default parse options.
 */
const defaultParserOptions: ParseOptions = {
  errorListeners: [],
}

/**
 * Parses the syntax string showing BveTrainSim 5/6 map file to AST.
 * @param input syntax string showing BveTrainSim 5/6 map file
 * @returns Parsing results and, if parsing is successful, AST node.
 */
export const parseMapV2 = (
  input: string,
  options = {} as Partial<ParseOptions>
): { success: boolean; ast?: mapAst.MapAstNode } => {
  const { errorListeners } = { ...defaultParserOptions, ...options }

  const charStream = CharStreams.fromString(input)
  const lexer = new MapLexer(charStream)
  const tokenStream = new CommonTokenStream(lexer)

  const parser = new MapParser(tokenStream)
  parser.errorHandler = new MapGrammarErrorStrategy()

  if (parser.numberOfSyntaxErrors > 0) {
    return { success: false }
  }

  if (errorListeners.length > 0) {
    parser.removeErrorListeners()
    parser.addErrorListener(new ErrorListenerBridge(errorListeners, charStream))
  }

  const cst = parser.root()
  try {
    const ast = new Visitor(charStream).visit(cst)
    return { success: true, ast: ast }
  } catch (e) {
    if (e instanceof AstConversionError) {
      for (const listener of errorListeners) {
        listener.reportError(e.start, e.message, e.end, e.text, e)
      }
    }
    throw e
  }
}
