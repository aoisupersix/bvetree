import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser } from './gen/MapParser'
import { Visitor } from './visitor'
import { MapAstNode } from '@bvetree/ast/src/map-v2'

export class MapV2Parser {
  parse(input: string): MapAstNode | null {
    const charStream = CharStreams.fromString(input)
    const lexer = new MapLexer(charStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MapParser(tokenStream)
    const cst = parser.root()
    const ast = new Visitor(charStream).visit(cst)

    return ast
  }
}
