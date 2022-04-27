import {
  ANTLRErrorListener,
  RecognitionException,
  Recognizer,
  Token,
} from 'antlr4ts'
import { ErrorListener } from './error-listener'

/**
 * Bridge to convert ANTLRErrorListener to bvetree error listeners.
 */
export class ErrorListenerBridge implements ANTLRErrorListener<Token> {
  /**
   * Create a new instance.
   * @param listeners Error listeners to handle errors
   */
  constructor(private listeners: ErrorListener[]) {}

  syntaxError(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognizer: Recognizer<Token, any>,
    offendingSymbol: Token | undefined,
    line: number,
    charPositionInLine: number,
    msg: string,
    e: RecognitionException | undefined
  ) {
    this.listeners.forEach((listener) => {
      listener.reportError(
        { line: line, charIndexInLine: charPositionInLine },
        msg,
        undefined,
        e
      )
    })
  }
}
