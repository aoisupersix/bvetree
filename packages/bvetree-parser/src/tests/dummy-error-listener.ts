import { Position } from 'packages/bvetree-ast/src/position'
import { ErrorListener } from '../error-listener'

/**
 * Parse error.
 */
export interface ParseError {
  position: Position
  message: string
  ex?: Error
}

/**
 * Create a error listener that stores errors in array of specified parameter.
 */
export const createDummyErrorListener = (errors: ParseError[]) => {
  const errorListener: ErrorListener = {
    reportError: (position, message, ex) => {
      errors.push({
        position: position,
        message: message,
        ex: ex,
      })
    },
  }

  return errorListener
}
