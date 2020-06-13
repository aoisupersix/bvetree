/**
 * Indicates an arbitrary position in the parsed string
 */
export class Position {
  /**
   * Line number(1 origin)
   */
  get line(): number {
    return this._line
  }

  /**
   * Character position in line(0 origin)
   */
  get charPositionInLine(): number {
    return this._charPositionInLine
  }

  constructor(
    private readonly _line: number,
    private readonly _charPositionInLine: number
  ) {}
}
