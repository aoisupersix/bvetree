import { Position } from 'packages/bvetree-ast/src/position'

/**
 * Error listener to handle parser errors.
 */
export interface ErrorListener {
  /**
   * Called when an error occurs during parsing.
   */
  reportError: (position: Position, message: string, ex?: Error) => void
}
