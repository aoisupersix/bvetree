import { getSuggestions } from '#/map/v2parser/completions'

describe('completions', () => {
  describe('#getSuggestions', () => {
    it('example test', () => {
      const suggestions = getSuggestions('curve.', {
        line: 1,
        charPositionInLine: 7,
      })
    })
  })
})
