import { parseMapV2, mapAst as ast } from '@'
import { assertMapAstNode } from './util'

describe('#parseMapV2', () => {
  it('parse empty string', () => {
    const result = parseMapV2('')
    expect(result.success).toBeTruthy()
    const node = result.ast as ast.RootNode
    assertMapAstNode(node, ast.NodeType.Root, 1, 0, 1, 0, '')
    expect(node.statements.length).toBe(0)
  })

  it('the end position of a node also considers whitespace', () => {
    const result = parseMapV2('Curve. SetGauge();')
    expect(result.success).toBeTruthy()
    const node = result.ast as ast.RootNode
    assertMapAstNode(node, ast.NodeType.Root, 1, 0, 1, 18, 'Curve. SetGauge();')
  })

  it('parse number distance statement', () => {
    const result = parseMapV2('100;')
    expect(result.success).toBeTruthy()
    const node = result.ast as ast.RootNode
    assertMapAstNode(node, ast.NodeType.Root, 1, 0, 1, 4, '100;')

    expect(node.statements.length).toBe(1)
    const distance = node.statements[0] as ast.DistanceStatementNode
    assertMapAstNode(
      distance,
      ast.NodeType.DistanceStatement,
      1,
      0,
      1,
      4,
      '100;'
    )

    const number = distance.value as ast.ValueNode
    assertMapAstNode(number, ast.NodeType.Number, 1, 0, 1, 3, '100')
    expect(number.value).toBe('100')
  })
})
