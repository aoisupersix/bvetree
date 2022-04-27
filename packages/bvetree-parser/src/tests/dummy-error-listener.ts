import { Position } from '@bvetree/ast'
import { ErrorListener } from '..'

/**
 * Parse error.
 */
export interface ParseError {
  start: Position
  message: string
  end?: Position
  text?: string
  e?: Error
}

/**
 * Create a error listener that stores errors in array of specified parameter.
 */
export const createDummyErrorListener = (errors: ParseError[]) => {
  const errorListener: ErrorListener = {
    reportError: (start, message, end, text, e) => {
      errors.push({
        start: start,
        message: message,
        end: end,
        text: text,
        e: e,
      })
    },
  }

  return errorListener
}
