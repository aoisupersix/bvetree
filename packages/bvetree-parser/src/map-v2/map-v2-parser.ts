import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser } from './gen/MapParser'
import { Visitor } from './visitor'
import { MapAstNode } from '@bvetree/ast/src/map-v2'

/**
 * Parses the syntax string showing BveTrainSim 5/6 map file to AST.
 * @param input syntax string showing BveTrainSim 5/6 map file
 * @returns AST node of parse result
 */
export const parse = (input: string): MapAstNode | null => {
  const charStream = CharStreams.fromString(input)
  const lexer = new MapLexer(charStream)
  const tokenStream = new CommonTokenStream(lexer)
  const parser = new MapParser(tokenStream)
  const cst = parser.root()
  const ast = new Visitor(charStream).visit(cst)

  return ast
}
