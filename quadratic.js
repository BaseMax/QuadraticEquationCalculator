// https://github.com/BaseMax/QuadraticEquationCalculator
'use strict'

/**
 * Calculates the discriminant of Ax^2 + Bx + C = 0.
 */
const disc = (A, B, C) => {
    let a = A
    let b = B
    let c = C

    const isIntCoeffs = Math.abs(Math.floor(A) - A) === 0 && Math.abs(Math.floor(b) - b) === 0 && Math.abs(Math.floor(C) - C) === 0

    if(isIntCoeffs) {
        if(a * c > 0) {
            a = Math.abs(A)
            c = Math.abs(C)
        }
        let loopCondition = false
        do {
            loopCondition = false
            if(a < c) {
                const tmp = a
                a = c
                c = tmp
            }
            const n = nearestInt(b / c)
            if(n !== 0) {
                const alpha = a - n * b
                if(alpha >= -a) {
                    b = b - n * c
                    a = alpha - n * b
                    if(a > 0) {
                        loopCondition = true
                    }
                }
            }
        } while (loopCondition)
    }
    return b * b - a * c
}
  
/**
 * Calculates the nearest integer to a number.
 */
const nearestInt = (n) => {
    const l = Math.floor(n)
    const h = Math.ceil(n)
    const dl = Math.abs(n - l)
    const dh = Math.abs(n - h)

    return (dl > dh ? dh : dl)
  }
  
/**
 * Solves the linear equation Ax^2 + Bx + C = 0 for x.
 * Computes the roots of the quadratic Ax^2 + Bx + C = 0.
 */
const quadraticSolve = (A, B, C) => {
    const b = -B / 2
    const q = disc(A, b, C)

    let X1 = 0
    let Y1 = 0
    let X2 = 0
    let Y2 = 0

    if(q < 0) {
        const X = b / A
        const Y = Math.sqrt(-q) / A

        X1 = X
        Y1 = Y
        X2 = X
        Y2 = -Y
    } else {
        Y1 = 0
        Y2 = 0
        const r = b + Math.sign(b) * Math.sqrt(q)
        if(r === 0) {
            X1 = C / A
            X2 = -C / A
        } else {
            X1 = C / r
            X2 = r / A
        }
    }
    return [
        {real:X1, i:Y1},
        {real:X2, i:Y2}
    ]
}
