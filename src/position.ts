/**
 * Indicates an arbitrary position in the parsed string
 */
export interface Position {
  /**
   * Line number(1 origin)
   */
  line: number

  /**
   * Character position in line(0 origin)
   */
  charPositionInLine: number
}
