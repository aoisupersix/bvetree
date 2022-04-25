import {
  DefaultErrorStrategy,
  Parser,
  InputMismatchException,
  NoViableAltException,
} from 'antlr4ts'

/**
 * Error strategy of Map grammar parser.
 */
export class MapGrammarErrorStrategy extends DefaultErrorStrategy {
  // TODO: support i18n
  reportFailedPredicate(recognizer: Parser, e: InputMismatchException): void {
    const tokenDisplay = this.getTokenErrorDisplay(
      e.getOffendingToken(recognizer)
    )
    const msg = `Failed to verification of ${tokenDisplay}.`

    this.notifyErrorListeners(recognizer, msg, e)
  }

  reportInputMismatch(recognizer: Parser, e: InputMismatchException): void {
    const token = this.getTokenErrorDisplay(e.getOffendingToken(recognizer))
    const expectedString =
      e.expectedTokens?.toStringVocabulary(recognizer.vocabulary) ?? ''
    const msg = `Input string ${token} did not match expected map syntax '${expectedString}'.`

    this.notifyErrorListeners(recognizer, msg, e)
  }

  reportMissingToken(recognizer: Parser): void {
    if (this.inErrorRecoveryMode(recognizer)) {
      return
    }
    this.beginErrorCondition(recognizer)
    const token = recognizer.currentToken
    const expectedString = this.getExpectedTokens(recognizer)
    const msg = `Input string '${token.text}' does not have map syntax '${expectedString}'.`

    recognizer.notifyErrorListeners(msg, token, undefined)
  }

  reportNoViableAlternative(recognizer: Parser, e: NoViableAltException): void {
    const token = this.getTokenErrorDisplay(e.getOffendingToken(recognizer))
    const msg = `Input string ${token} could not be identified as map syntax.`

    this.notifyErrorListeners(recognizer, msg, e)
  }

  reportUnwantedToken(recognizer: Parser): void {
    if (this.inErrorRecoveryMode(recognizer)) {
      return
    }
    this.beginErrorCondition(recognizer)
    const token = this.getTokenErrorDisplay(recognizer.currentToken)
    const msg = `Input string ${token} did not match expected map syntax.`

    recognizer.notifyErrorListeners(msg, recognizer.currentToken, undefined)
  }
}
