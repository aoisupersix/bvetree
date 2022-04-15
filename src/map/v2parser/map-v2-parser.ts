import { CharStreams, CommonTokenStream } from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser } from './gen/MapParser'
import { Visitor } from './visitor'
import { MapAstNode } from '#/map/ast-nodes/map-ast-node'

export class MapV2Parser {
  parse(input: string): MapAstNode | null {
    const charStream = CharStreams.fromString(input)
    const lexer = new MapLexer(charStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MapParser(tokenStream)
    const cst = parser.root()
    const ast = new Visitor().visit(cst)

    return ast
  }
}
