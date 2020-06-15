import { MapAstNode } from './map-ast-node'
import { StatementNode } from './statement-node'
import { Position } from '#/position'
import { NodeType } from './node-type'

export class RootNode extends MapAstNode {
  get type(): NodeType {
    return NodeType.Root
  }

  private _statements: StatementNode[] = []

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

/**
 * Type guard of RootNode
 * @param node Ast node or null | undefined
 */
export const isRootNode = (
  node: MapAstNode | null | undefined
): node is RootNode =>
  node !== null && node !== undefined && node.type === NodeType.Root
