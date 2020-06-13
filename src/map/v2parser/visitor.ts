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
    const node = new RootNode(
      Token.fromIToken(ctx.start),
      Token.fromITokenOrUndefined(ctx.stop),
      ctx.text
    )

    return node
  }
}
