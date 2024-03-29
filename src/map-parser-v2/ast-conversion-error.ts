import { CharStream, ParserRuleContext } from 'antlr4ts'
import { BaseError } from '../base-error'
import { Position } from '../position'
import {
  getEndPosition,
  getOriginalTextOfContext,
  getStartPosition,
} from './util'

/**
 * CST to AST conversion error class.
 */
export class AstConversionError extends BaseError {
  /**
   * Start position of error node.
   * The position containing the first character of the node.
   */
  public readonly start: Position

  /**
   * End position of error node.
   * The last position of the node + 1 is returned.
   */
  public readonly end: Position

  /**
   * The original string of error node.
   * Whitespaces are included.
   */
  public readonly text: string

  constructor(
    ctx: ParserRuleContext,
    input: CharStream,
    /**
     * Error message.
     */
    e: string
  ) {
    super(e)
    this.start = getStartPosition(ctx)
    this.end = getEndPosition(ctx, input)
    this.text = getOriginalTextOfContext(ctx, input)
  }
}
