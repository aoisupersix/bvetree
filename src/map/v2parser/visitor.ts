import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { MapAstNode } from '#/map/ast-nodes/map-ast-node'
import * as parser from './gen/MapParser'
import { MapParserVisitor } from './gen/MapParserVisitor'
import { RootNode } from '#/map/ast-nodes/root-node'
import { Token } from '#/token'

type NullableAstNode = MapAstNode | null

export class Visitor extends AbstractParseTreeVisitor<NullableAstNode>
  implements MapParserVisitor<NullableAstNode> {
  protected defaultResult(): NullableAstNode {
    return null
  }

  visitRoot(ctx: parser.RootContext): NullableAstNode {
    const encodingCtx = ctx.encoding()
    let encoding: Token | undefined = undefined
    if (encodingCtx !== undefined) {
      const value = encodingCtx._v
      encoding = new Token(
        value.start.line,
        value.start.charPositionInLine,
        value.start.startIndex,
        value.stop?.stopIndex ?? value.start.stopIndex,
        encodingCtx.text
      )
    }
    const node = new RootNode(
      Token.fromIToken(ctx.start),
      Token.fromITokenOrUndefined(ctx.stop),
      ctx.text,
      Token.fromIToken(ctx._version),
      encoding
    )

    return node
  }
}
