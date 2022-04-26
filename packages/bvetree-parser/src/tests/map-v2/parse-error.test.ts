import { ErrorListener } from '../../error-listener'
import { parse } from '../../map-v2/map-v2-parser'
import { createDummyErrorListener, ParseError } from '../dummy-error-listener'

describe('MapV2Parser', () => {
  let errors: ParseError[]
  let dummyErrorListener: ErrorListener

  beforeEach(() => {
    errors = []
    dummyErrorListener = createDummyErrorListener(errors)
  })

  describe('#parse with errors', () => {
    it('input mismatch error', () => {
      parse('Curve.Invalid();', {
        errorListeners: [dummyErrorListener],
      })

      expect(errors.length).toBe(1)
      expect(errors[0].position.line).toBe(1)
      expect(errors[0].position.charIndexInLine).toBe(6)
      expect(errors[0].message).toBe(
        `Input string 'Invalid' did not match expected map syntax '{CURVE, SPEEDLIMIT, FOG, CANT, SET_GAUGE, GAUGE, SET_CENTER, SET, BEGIN_TRANSITION, BEGIN, BEGIN0, BEGIN_CIRCULAR, BEGIN_CONST, END, INTERPOLATE, CHANGE, POSITION, LOAD, PUT, PUT0, PUTBETWEEN, SET_SPEEDLIMIT, PASS, AMBIENT, DIFFUSE, DIRECTION, PLAY, ADD, ENABLE, STOP, SETTRACK, PITCH, TURN}'.`
      )
    })

    it('no viable alternative error', () => {
      parse('Curve;', {
        errorListeners: [dummyErrorListener],
      })

      expect(errors.length).toBe(1)
      expect(errors[0].position.line).toBe(1)
      expect(errors[0].position.charIndexInLine).toBe(5)
      expect(errors[0].message).toBe(
        `Input string ';' could not be identified as map syntax.`
      )
    })

    it('unwanted token error', () => {
      parse('InvalidSyntax', {
        errorListeners: [dummyErrorListener],
      })

      expect(errors.length).toBe(1)
      expect(errors[0].position.line).toBe(1)
      expect(errors[0].position.charIndexInLine).toBe(0)
      expect(errors[0].message).toBe(
        `Input string 'InvalidSyntax' did not match expected map syntax.`
      )
    })
  })
})
