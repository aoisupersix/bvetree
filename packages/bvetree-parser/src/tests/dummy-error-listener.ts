import { ANTLRErrorListener, RecognitionException, Token } from 'antlr4ts'

/**
 * Parse error.
 */
export interface ParseError {
  line: number
  charPositionInLine: number
  msg: string
  e?: RecognitionException
}

/**
 * Create a error listener that stores errors in array of specified parameter.
 */
export const createDummyErrorListener = (errors: ParseError[]) => {
  const errorListener: ANTLRErrorListener<Token> = {
    syntaxError: (recognizer, token, line, charPositionInLine, msg, e) => {
      errors.push({
        line: line,
        charPositionInLine: charPositionInLine,
        msg: msg,
        e: e,
      })
    },
  }

  return errorListener
}
