/**
 * Indicates an arbitrary position in the parsed string
 */
export interface Position {
  /**
   * Line number (1 origin).
   */
  line: number

  /**
   * Character index in line (0 origin).
   */
  charIndexInLine: number
}
