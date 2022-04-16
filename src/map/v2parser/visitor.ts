import { ParserRuleContext } from 'antlr4ts'
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import * as parser from './gen/MapParser'
import { MapParserVisitor } from './gen/MapParserVisitor'
import { MapLexer } from './gen/MapLexer'
import * as ast from '#/map/ast-nodes'
import { Position } from '#/position'

type NullableAstNode = ast.MapAstNode | null

export class Visitor
  extends AbstractParseTreeVisitor<NullableAstNode>
  implements MapParserVisitor<NullableAstNode>
{
  protected defaultResult(): NullableAstNode {
    return null
  }

  /**
   * Get start position of context
   * @param ctx Antlr rule context
   */
  private getStartPosition(ctx: ParserRuleContext): Position {
    return {
      line: ctx.start.line,
      charPositionInLine: ctx.start.charPositionInLine,
    }
  }

  /**
   * Get end position of context
   * If context end token is undefined, returns start position
   * @param ctx Antlr rule context
   */
  private getEndPosition(ctx: ParserRuleContext): Position {
    return {
      line: ctx.stop?.line ?? ctx.start.line,
      charPositionInLine: ctx.stop?.stopIndex ?? ctx.start.stopIndex,
    }
  }

  visitRoot(ctx: parser.RootContext): NullableAstNode {
    const node = new ast.RootNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text
    )

    for (const statementCtx of ctx.statement()) {
      const statement = this.visit(statementCtx)
      if (ast.isStatementNode(statement)) {
        node.addStatement(statement)
      }
    }

    return node
  }

  visitDistanceStatement(
    ctx: parser.DistanceStatementContext
  ): NullableAstNode {
    const value = this.visit(ctx.expr())
    if (!ast.isExpressionNode(value)) {
      throw new Error(
        'The expression in the distance statement is empty or invalid.'
      )
    }

    return new ast.DistanceStatementNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitVarAssignStatement(
    ctx: parser.VarAssignStatementContext
  ): NullableAstNode {
    const value = this.visit(ctx.expr())
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the var assign is empty or invalid.')
    }

    return new ast.VarAssignStatementNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx._v.text,
      value
    )
  }

  visitNormalStatement(ctx: parser.NormalStatementContext): NullableAstNode {
    const node = new ast.MapFunctionNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx.element().text.toLowerCase(),
      ctx.function().text.toLowerCase()
    )

    for (const argExpr of ctx.args().nullableExpr()) {
      node.addArgument(this.visit(argExpr))
    }

    return node
  }

  visitNullableExpr(ctx: parser.NullableExprContext): NullableAstNode {
    if (ctx._nullSyntax !== undefined) {
      return null
    }
    const exprCtx = ctx.expr()
    if (exprCtx === undefined) {
      return null
    }

    return this.visit(exprCtx)
  }

  // #region Expression

  visitParensExpr(ctx: parser.ParensExprContext): NullableAstNode {
    const inner = this.visit(ctx.expr())
    if (!ast.isExpressionNode(inner)) {
      throw new Error(
        'The expression in the parens operation is empty or invalid.'
      )
    }

    return new ast.ParensNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      inner
    )
  }

  visitUnaryExpr(ctx: parser.UnaryExprContext): NullableAstNode {
    const inner = this.visit(ctx.expr())
    if (!ast.isExpressionNode(inner)) {
      throw new Error(
        'The expression in the unary operation is empty or invalid.'
      )
    }

    return new ast.UnaryNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      inner
    )
  }

  visitInfixExpr(ctx: parser.InfixExprContext): NullableAstNode {
    let node:
      | ast.AdditionNode
      | ast.SubtractionNode
      | ast.MultiplicationNode
      | ast.DivisionNode
      | ast.ModuloNode
      | null = null
    const start = this.getStartPosition(ctx)
    const end = this.getEndPosition(ctx)
    const text = ctx.text
    const left = this.visit(ctx._left)
    const right = this.visit(ctx._right)
    if (!ast.isExpressionNode(left) || !ast.isExpressionNode(right)) {
      throw new Error(
        'Left or right expression in the infix expression is empty or invalid.'
      )
    }

    switch (ctx._op.type) {
      case MapLexer.PLUS:
        node = new ast.AdditionNode(start, end, text, left, right)
        break
      case MapLexer.MINUS:
        node = new ast.SubtractionNode(start, end, text, left, right)
        break
      case MapLexer.MULT:
        node = new ast.MultiplicationNode(start, end, text, left, right)
        break
      case MapLexer.DIV:
        node = new ast.DivisionNode(start, end, text, left, right)
        break
      case MapLexer.MOD:
        node = new ast.ModuloNode(start, end, text, left, right)
        break
    }

    return node
  }

  visitAbsExpr(ctx: parser.AbsExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.AbsNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitAtan2Expr(ctx: parser.Atan2ExprContext): NullableAstNode {
    const y = this.visit(ctx._y)
    const x = this.visit(ctx._x)
    if (!ast.isExpressionNode(y) || !ast.isExpressionNode(x)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.Atan2Node(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      x,
      y
    )
  }

  visitCeilExpr(ctx: parser.CeilExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.CeilNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitCosExpr(ctx: parser.CosExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.CosNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitExpExpr(ctx: parser.ExpExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.ExpNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitFloorExpr(ctx: parser.FloorExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.FloorNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitLogExpr(ctx: parser.LogExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.LogNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitPowExpr(ctx: parser.PowExprContext): NullableAstNode {
    const x = this.visit(ctx._x)
    const y = this.visit(ctx._y)
    if (!ast.isExpressionNode(x) || !ast.isExpressionNode(y)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.PowNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      x,
      y
    )
  }

  visitRandExpr(ctx: parser.RandExprContext): NullableAstNode {
    let value: ast.ExpressionNode | undefined = undefined
    if (ctx._value) {
      value = this.visit(ctx._value) as ast.ExpressionNode
      if (!ast.isExpressionNode(value)) {
        throw new Error('The expression in the function is invalid.')
      }
    }

    return new ast.RandNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value ?? undefined
    )
  }

  visitSinExpr(ctx: parser.SinExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.SinNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitSqrtExpr(ctx: parser.SqrtExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (!ast.isExpressionNode(value)) {
      throw new Error('The expression in the function is empty or invalid.')
    }

    return new ast.SqrtNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      value
    )
  }

  visitDistanceExpr(ctx: parser.DistanceExprContext): NullableAstNode {
    return new ast.DistanceNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text
    )
  }

  visitNumberExpr(ctx: parser.NumberExprContext): NullableAstNode {
    return new ast.NumberNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx.NUM().text
    )
  }

  visitStringExpr(ctx: parser.StringExprContext): NullableAstNode {
    return new ast.StringNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx.string().value ?? ''
    )
  }

  visitVarExpr(ctx: parser.VarExprContext): NullableAstNode {
    return new ast.VarNode(
      this.getStartPosition(ctx),
      this.getEndPosition(ctx),
      ctx.text,
      ctx._v.varName ?? ''
    )
  }

  // #endregion Expression
}
