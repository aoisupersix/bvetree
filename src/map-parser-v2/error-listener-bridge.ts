import {
  ANTLRErrorListener,
  CharStream,
  ParserRuleContext,
  RecognitionException,
  Recognizer,
  Token,
} from 'antlr4ts'
import { ErrorListener, Position } from '..'
import { getEndPosition, getOriginalTextOfContext } from './util'

/**
 * Bridge to convert ANTLRErrorListener to bvetree error listeners.
 */
export class ErrorListenerBridge implements ANTLRErrorListener<Token> {
  /**
   * Create a new instance.
   * @param listeners Error listeners to handle errors
   * @param charStream ANTLR character stream
   */
  constructor(
    private listeners: ErrorListener[],
    private charStream: CharStream
  ) {}

  syntaxError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognizer: Recognizer<Token, any>,
    offendingSymbol: Token | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined
  ) {
    const start: Position = { line: line, charIndexInLine: charPositionInLine }
    let end: Position | undefined
    let text: string | undefined

    const ctx = e?.context as ParserRuleContext | undefined
    if (ctx !== undefined) {
      end = getEndPosition(ctx, this.charStream)
      text = getOriginalTextOfContext(ctx, this.charStream)
    }
    this.listeners.forEach((listener) => {
      listener.reportError(start, msg, end, text, e)
    })
  }
}
