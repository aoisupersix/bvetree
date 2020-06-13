import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import { MapAstNode } from '#/map/ast-nodes/map-ast-node'
import * as parser from './gen/MapParser'
import { MapParserVisitor } from './gen/MapParserVisitor'
import { RootNode } from '#/map/ast-nodes/root-node'
import { Position } from '#/position'
import { ParserRuleContext } from 'antlr4ts'
import { StatementNode } from '../ast-nodes/statement-node'
import { VarAssignStatementNode } from '../ast-nodes/var-assign-statement-node'
import { VarNode } from '../ast-nodes/var-node'
import { ExpressionNode } from '../ast-nodes/expression-node'
import { DistanceStatementNode } from '../ast-nodes/distance-statement-node'
import { NumberNode } from '../ast-nodes/number-node'

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

    for (const statementCtx of ctx.statement()) {
      const statement = this.visit(statementCtx) as StatementNode
      if (statement !== null) {
        node.addStatement(statement)
      }
    }

    return node
  }

  visitDistanceStatement(
    ctx: parser.DistanceStatementContext
  ): NullableAstNode {
    const value = this.visit(ctx.expr()) as ExpressionNode
    if (value === null) {
      // TODO: exception handling
      return null
    }

    return new DistanceStatementNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitVarAssignStatement(
    ctx: parser.VarAssignStatementContext
  ): NullableAstNode {
    const value = this.visit(ctx.expr()) as ExpressionNode
    if (value === null) {
      // TODO: exception handling
      return null
    }

    return new VarAssignStatementNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx._v.text,
      value
    )
  }

  visitVarExpr(ctx: parser.VarExprContext): NullableAstNode {
    return new VarNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx._v.text
    )
  }

  visitNumberExpr(ctx: parser.NumberExprContext): NullableAstNode {
    return new NumberNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx.NUM().text
    )
  }
}
