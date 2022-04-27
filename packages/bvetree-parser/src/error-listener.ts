import { Position } from 'packages/bvetree-ast/src/position'

/**
 * Error listener to handle parser errors.
 */
export interface ErrorListener {
  /**
   * Called when an error occurs during parsing.
   * @param start Start position of error.
   * @param message Error message,
   * @param end End position of error.
   * @param e Source error class.
   */
  reportError: (
    start: Position,
    message: string,
    end?: Position,
    e?: Error
  ) => void
}
