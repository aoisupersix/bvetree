import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { MapAstNode } from '#/map/ast-nodes/map-ast-node'
import * as parser from './gen/MapParser'
import { MapParserVisitor } from './gen/MapParserVisitor'
import { RootNode } from '#/map/ast-nodes/root-node'
import { Position } from '#/position'
import { ParserRuleContext } from 'antlr4ts'

type NullableAstNode = MapAstNode | null

export class Visitor extends AbstractParseTreeVisitor<NullableAstNode>
  implements MapParserVisitor<NullableAstNode> {
  protected defaultResult(): NullableAstNode {
    return null
  }

  /**
   * Get start position of context
   * @param ctx Antlr rule context
   */
  private getStartPosition(ctx: ParserRuleContext): Position {
    return new Position(ctx.start.line, ctx.start.charPositionInLine)
  }

  /**
   * Get end position of context
   * If context end token is undefined, returns start position
   * @param ctx Antlr rule context
   */
  private getEndPosition(ctx: ParserRuleContext): Position {
    return new Position(
      ctx.stop?.line ?? ctx.start.line,
      ctx.stop?.charPositionInLine ?? ctx.start.line
    )
  }

  visitRoot(ctx: parser.RootContext): NullableAstNode {
    const node = new RootNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text
    )

    return node
  }
}
