import { ParseTree } from 'antlr4ts/tree'

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

/**
 * Token position without CST
 */
export interface TokenPosition {
  /**
   * Token index
   */
  index: number

  /**
   * Parse tree (CST)
   */
  context: ParseTree

  /**
   * Token text
   */
  text: string
}
