import { ANTLRErrorListener, Token } from 'antlr4ts'
import { parse } from '../../map-v2/map-v2-parser'
import { createDummyErrorListener, ParseError } from '../dummy-error-listener'

describe('MapV2Parser', () => {
  let errors: ParseError[]
  let dummyErrorListener: ANTLRErrorListener<Token>

  beforeEach(() => {
    errors = []
    dummyErrorListener = createDummyErrorListener(errors)
  })

  describe('#parse with errors', () => {
    it('invalid syntax', () => {
      parse('InvalidSyntax', {
        errorListeners: [dummyErrorListener],
      })

      expect(errors.length).toBe(1)
      // TODO: assert error message
    })
  })
})
