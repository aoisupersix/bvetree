import { ANTLRInputStream, CommonTokenStream } from 'antlr4ts'
import { MapLexer } from './gen/MapLexer'
import { MapParser, RootContext } from './gen/MapParser'

export class MapV2Parser {
  parse(input: string): RootContext {
    const inputStream = new ANTLRInputStream(input)
    const lexer = new MapLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new MapParser(tokenStream)
    const cst = parser.root()

    return cst
  }
}
