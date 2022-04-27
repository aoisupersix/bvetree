import { CharStream } from 'antlr4ts'
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor'
import * as parser from './gen/MapParser'
import { MapParserVisitor } from './gen/MapParserVisitor'
import { MapLexer } from './gen/MapLexer'
import * as ast from '@bvetree/ast/src/map-v2'
import * as util from './util'
import { AstConversionError } from '../error'

type NullableAstNode = ast.MapAstNode | undefined

export class Visitor
  extends AbstractParseTreeVisitor<NullableAstNode>
  implements MapParserVisitor<NullableAstNode>
{
  constructor(private charStream: CharStream) {
    super()
  }

  protected defaultResult(): NullableAstNode {
    return undefined
  }

  visitRoot(ctx: parser.RootContext): NullableAstNode {
    const statements: ast.StatementNode[] = []
    for (const statementCtx of ctx.statement()) {
      const statement = this.visit(statementCtx)
      if (util.isStatementNode(statement)) {
        statements.push(statement)
      }
    }

    return util.createMapAstNode<ast.RootNode>(
      ast.NodeType.Root,
      ctx,
      this.charStream,
      { statements: statements }
    )
  }

  visitDistanceStatement(
    ctx: parser.DistanceStatementContext
  ): NullableAstNode {
    const value = this.visit(ctx.expr())
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the distance statement is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.DistanceStatementNode>(
      ast.NodeType.DistanceStatement,
      ctx,
      this.charStream,
      { value: value }
    )
  }

  visitVarAssignStatement(
    ctx: parser.VarAssignStatementContext
  ): NullableAstNode {
    const value = this.visit(ctx.expr())
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the var assign is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.VarAssignStatementNode>(
      ast.NodeType.VarAssignStatement,
      ctx,
      this.charStream,
      { varName: ctx._v.text, value: value }
    )
  }

  visitSimpleStatement(ctx: parser.SimpleStatementContext): NullableAstNode {
    const args: NullableAstNode[] = []
    for (const argExpr of ctx.args().nullableExpr()) {
      args.push(this.visit(argExpr))
    }

    return util.createMapAstNode<ast.MapFunctionNode>(
      ast.NodeType.MapFunction,
      ctx,
      this.charStream,
      {
        element: ctx.element().text.toLowerCase(),
        function: ctx.function().text.toLowerCase(),
        arguments: args,
      }
    )
  }

  visitKeyStatement(ctx: parser.KeyStatementContext): NullableAstNode {
    const key = this.visit(ctx.expr())
    if (key === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression of map statement key is empty or invalid.'
      )
    }

    const args: NullableAstNode[] = []
    for (const argExpr of ctx.args().nullableExpr()) {
      args.push(this.visit(argExpr))
    }

    return util.createMapAstNode<ast.MapFunctionWithKeyNode>(
      ast.NodeType.MapFunctionWithKey,
      ctx,
      this.charStream,
      {
        element: ctx.element().text.toLowerCase(),
        function: ctx.function().text.toLowerCase(),
        key: key,
        arguments: args,
      }
    )
  }

  visitKeyWithSubelementStatement(
    ctx: parser.KeyWithSubelementStatementContext
  ): NullableAstNode {
    const key = this.visit(ctx.expr())
    if (key === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression of map statement key is empty or invalid.'
      )
    }

    const args: NullableAstNode[] = []
    for (const argExpr of ctx.args().nullableExpr()) {
      args.push(this.visit(argExpr))
    }

    return util.createMapAstNode<ast.MapFunctionWithKeyAndSubelementNode>(
      ast.NodeType.MapFunctionWithKeyAndSubelement,
      ctx,
      this.charStream,
      {
        element: ctx.element().text.toLowerCase(),
        function: ctx.function().text.toLowerCase(),
        subElement: ctx.subelement().text.toLowerCase(),
        key: key,
        arguments: args,
      }
    )
  }

  visitNullableExpr(ctx: parser.NullableExprContext): NullableAstNode {
    if (ctx._nullSyntax !== undefined) {
      // null
      return util.createMapAstNode<ast.MapAstNode>(
        ast.NodeType.Null,
        ctx,
        this.charStream,
        {}
      )
    }
    const exprCtx = ctx.expr()
    if (exprCtx === undefined) {
      // empty
      return util.createMapAstNode<ast.MapAstNode>(
        ast.NodeType.Empty,
        ctx,
        this.charStream,
        {}
      )
    }

    return this.visit(exprCtx)
  }

  // #region Expression

  visitParensExpr(ctx: parser.ParensExprContext): NullableAstNode {
    const inner = this.visit(ctx.expr())
    if (inner === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the parens operation is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.ExpressionValueNode>(
      ast.NodeType.Parens,
      ctx,
      this.charStream,
      { innerValue: inner }
    )
  }

  visitUnaryExpr(ctx: parser.UnaryExprContext): NullableAstNode {
    const inner = this.visit(ctx.expr())
    if (inner === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the unary operation is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.ExpressionValueNode>(
      ast.NodeType.Unary,
      ctx,
      this.charStream,
      { innerValue: inner }
    )
  }

  visitInfixExpr(ctx: parser.InfixExprContext): NullableAstNode {
    const left = this.visit(ctx._left)
    const right = this.visit(ctx._right)
    if (left === undefined || right === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'Left or right expression in the infix expression is empty or invalid.'
      )
    }

    let type: ast.NodeType | undefined

    switch (ctx._op.type) {
      case MapLexer.PLUS:
        type = ast.NodeType.Addition
        break
      case MapLexer.MINUS:
        type = ast.NodeType.Subtraction
        break
      case MapLexer.MULT:
        type = ast.NodeType.Multiplication
        break
      case MapLexer.DIV:
        type = ast.NodeType.Division
        break
      case MapLexer.MOD:
        type = ast.NodeType.Modulo
        break
    }

    if (type === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        `invalid operand: ${ctx._op.text}`
      )
    }

    return util.createMapAstNode<ast.InfixExpressionNode>(
      type,
      ctx,
      this.charStream,
      { left: left, right: right }
    )
  }

  visitAbsExpr(ctx: parser.AbsExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Abs,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitAtan2Expr(ctx: parser.Atan2ExprContext): NullableAstNode {
    const y = this.visit(ctx._y)
    const x = this.visit(ctx._x)
    if (y === undefined || x === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Atan2,
      ctx,
      this.charStream,
      { arguments: [y, x] } // The argument order of the atan2 function is y,x in that order.
    )
  }

  visitCeilExpr(ctx: parser.CeilExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Ceil,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitCosExpr(ctx: parser.CosExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Cos,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitExpExpr(ctx: parser.ExpExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Exp,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitFloorExpr(ctx: parser.FloorExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Floor,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitLogExpr(ctx: parser.LogExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Log,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitPowExpr(ctx: parser.PowExprContext): NullableAstNode {
    const x = this.visit(ctx._x)
    const y = this.visit(ctx._y)
    if (x === undefined || y === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Pow,
      ctx,
      this.charStream,
      { arguments: [x, y] }
    )
  }

  visitRandExpr(ctx: parser.RandExprContext): NullableAstNode {
    let value: NullableAstNode
    if (ctx._value) {
      value = this.visit(ctx._value)
      if (value === undefined) {
        throw new AstConversionError(
          ctx,
          this.charStream,
          'The expression in the function is empty or invalid.'
        )
      }
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Rand,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitSinExpr(ctx: parser.SinExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Sin,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitSqrtExpr(ctx: parser.SqrtExprContext): NullableAstNode {
    const value = this.visit(ctx._value)
    if (value === undefined) {
      throw new AstConversionError(
        ctx,
        this.charStream,
        'The expression in the function is empty or invalid.'
      )
    }

    return util.createMapAstNode<ast.FunctionNode>(
      ast.NodeType.Sqrt,
      ctx,
      this.charStream,
      { arguments: [value] }
    )
  }

  visitDistanceExpr(ctx: parser.DistanceExprContext): NullableAstNode {
    return util.createMapAstNode<ast.MapAstNode>(
      ast.NodeType.Distance,
      ctx,
      this.charStream,
      {}
    )
  }

  visitNumberExpr(ctx: parser.NumberExprContext): NullableAstNode {
    return util.createMapAstNode<ast.ValueNode>(
      ast.NodeType.Number,
      ctx,
      this.charStream,
      { value: ctx.NUM().text }
    )
  }

  visitStringExpr(ctx: parser.StringExprContext): NullableAstNode {
    return util.createMapAstNode<ast.ValueNode>(
      ast.NodeType.String,
      ctx,
      this.charStream,
      { value: ctx.string().value ?? '' }
    )
  }

  visitVarExpr(ctx: parser.VarExprContext): NullableAstNode {
    return util.createMapAstNode<ast.VarNode>(
      ast.NodeType.Var,
      ctx,
      this.charStream,
      { varName: ctx._v.varName ?? '' }
    )
  }

  // #endregion Expression
}
