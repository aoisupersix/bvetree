import { Position } from 'packages/bvetree-ast/src/position'
import { ErrorListener } from '../error-listener'

/**
 * Parse error.
 */
export interface ParseError {
  start: Position
  message: string
  end?: Position
  e?: Error
}

/**
 * Create a error listener that stores errors in array of specified parameter.
 */
export const createDummyErrorListener = (errors: ParseError[]) => {
  const errorListener: ErrorListener = {
    reportError: (start, message, end, e) => {
      errors.push({
        start: start,
        message: message,
        end: end,
        e: e,
      })
    },
  }

  return errorListener
}
