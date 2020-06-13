import { StatementNode } from './statement-node'
import { Position } from '#/position'
import { MapAstNode } from './map-ast-node'

export class RootNode extends MapAstNode {
  private _statements: StatementNode[]

  get statements(): StatementNode[] {
    return this._statements
  }

  constructor(start: Position, end: Position, text: string) {
    super(start, end, text)
  }

  addStatement(statement: StatementNode): void {
    this._statements.push(statement)
  }
}
