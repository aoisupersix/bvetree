import * as antlr from 'antlr4ts'

export class Token {
  get line(): number {
    return this._line
  }

  get charPositionInLine(): number {
    return this._charPositionInLine
  }

  get startIndex(): number {
    return this._startIndex
  }

  get endIndex(): number {
    return this._endIndex
  }

  get length(): number {
    return this.endIndex - this.startIndex + 1
  }

  get text(): string | undefined {
    return this._text
  }

  constructor(
    private _line: number,
    private _charPositionInLine: number,
    private _startIndex: number,
    private _endIndex: number,
    private _text: string | undefined
  ) {}

  static fromIToken(token: antlr.Token): Token {
    return new Token(
      token.line,
      token.charPositionInLine,
      token.startIndex,
      token.stopIndex,
      token.text
    )
  }

  static fromITokenOrUndefined(
    token: antlr.Token | undefined
  ): Token | undefined {
    if (token === undefined) {
      return undefined
    }

    return this.fromIToken(token)
  }
}
