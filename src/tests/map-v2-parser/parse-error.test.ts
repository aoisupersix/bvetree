import { ErrorListener, parseMapV2 } from '@'
import { createDummyErrorListener, ParseError } from '../dummy-error-listener'

describe('#parseMapV2', () => {
  describe('error cases', () => {
    let errors: ParseError[]
    let dummyErrorListener: ErrorListener

    beforeEach(() => {
      errors = []
      dummyErrorListener = createDummyErrorListener(errors)
    })

    describe('#parse with errors', () => {
      it('input mismatch error', () => {
        parseMapV2('Curve.Invalid();', {
          errorListeners: [dummyErrorListener],
        })

        expect(errors.length).toBe(1)
        expect(errors[0].start).toStrictEqual({ line: 1, charIndexInLine: 6 })
        expect(errors[0].end).toStrictEqual({ line: 1, charIndexInLine: 13 })
        expect(errors[0].text).toBe('I')
        expect(errors[0].message).toBe(
          `Input string 'Invalid' did not match expected map syntax '{CURVE, SPEEDLIMIT, FOG, CANT, SET_GAUGE, GAUGE, SET_CENTER, SET_FUNCTION, SET, BEGIN_TRANSITION, BEGIN, BEGIN0, BEGIN_CIRCULAR, BEGIN_CONST, BEGIN_NEW, END, INTERPOLATE, CHANGE, POSITION, LOAD, PUT, PUT0, PUTBETWEEN, SET_SPEEDLIMIT, SET_SIGNAL, PASS, AMBIENT, DIFFUSE, DIRECTION, PLAY, ADD, ENABLE, STOP, SETTRACK, PITCH, TURN}'.`
        )
      })

      it('no viable alternative error', () => {
        parseMapV2('Curve;', {
          errorListeners: [dummyErrorListener],
        })

        expect(errors.length).toBe(1)
        expect(errors[0].start).toStrictEqual({ line: 1, charIndexInLine: 5 })
        expect(errors[0].end).toStrictEqual({ line: 1, charIndexInLine: 5 })
        expect(errors[0].text).toBe('C')
        expect(errors[0].message).toBe(
          `Input string ';' could not be identified as map syntax.`
        )
      })

      it('unwanted token error', () => {
        parseMapV2('InvalidSyntax', {
          errorListeners: [dummyErrorListener],
        })

        expect(errors.length).toBe(1)
        expect(errors[0].start).toStrictEqual({ line: 1, charIndexInLine: 0 })
        expect(errors[0].end).toBe(undefined)
        expect(errors[0].text).toBe(undefined)
        expect(errors[0].message).toBe(
          `Input string 'InvalidSyntax' did not match expected map syntax.`
        )
      })
    })
  })
})
