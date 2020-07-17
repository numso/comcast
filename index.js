// shim browser env
var listeners = {}
global.addEventListener = (type, func) => {
  console.log('Adding event listener for:', type)
  listeners[type] = func
  if (type === 'DOMContentLoaded') {
    const e = createEvent('CustomEvent')
    e.initCustomEvent('DOMContentLoaded')
    dispatchEvent(e)
  }
}
global.removeEventListener = (type, _func) => {
  console.log('Removing event listener for:', type)
  delete listeners[type]
}
global.createEvent = event => {
  if (event !== 'CustomEvent') throw new Error(`Unknown Event Type: ${event}`)
  let e = {
    initCustomEvent (type, canBubble, cancelable, detail) {
      e.type = type
      e.detail = detail
    }
  }
  return e
}
global.dispatchEvent = event => {
  console.log('Firing event for:', event.type)
  if (event.type in listeners) listeners[event.type](event)
  else console.log('FAILED')
}
global.document = {
  addEventListener: global.addEventListener,
  removeEventListener: global.removeEventListener,
  createEvent: global.createEvent
}
// const debug = () => null
const debug = console.log
// end shim browser env

;(function a (b) {
  var c = {}
  var d = {}
  var n = Object.call.bind(Object.bind, Object.call)
  var o = n(Object.apply)
  var t = n([].push)
  const H = require('./H')
  const J = require('./J')
  const K = require('./K')
  const L = require('./L')
  var I = Object.create(null)
  function parseProgram (source) {
    var alphabet =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
    var len = source.length
    var result = new Uint8Array(Math.floor((len * 3) / 4))
    for (var pointer = 0, i = 0; pointer < len; pointer += 4, i += 3) {
      var R = alphabet.indexOf(source.charAt(pointer))
      var S = alphabet.indexOf(source.charAt(pointer + 1))
      var T = alphabet.indexOf(source.charAt(pointer + 2))
      var U = alphabet.indexOf(source.charAt(pointer + 3))
      result[i] = (R << 2) | (S >> 4)
      if (pointer + 2 < len) result[i + 1] = ((S & 15) << 4) | (T >> 2)
      if (pointer + 3 < len) result[i + 2] = ((T & 3) << 6) | U
    }
    return result
  }

  class Somefing {
    data = []

    clear (index) {
      this.data[index] = { v: undefined }
    }

    get (index) {
      return this.data[index].v
    }

    set (index, value) {
      this.data[index].v = value
    }

    clone () {
      var child = new Somefing()
      child.data = this.data.slice(0)
      return child
    }
  }

  class RunnerThing {
    stack = []
    stack2 = []
    stack3 = []
    T = undefined
    K = 0

    constructor (bj, bk, somefing, bm) {
      this.G = bk
      this.M = bj
      this.somefing = somefing
      this.c = bm == null ? b : Object(bm)
      this.i = bm
    }

    P () {
      var bn = J[this.G][program[this.M++]]
      this.G = bn[0]
      return bn[1]
    }

    getInstruction () {
      return program[this.M++]
    }

    getInstruction2 () {
      return (program[this.M++] << 8) | program[this.M++]
    }

    getInstruction3 () {
      return (
        (program[this.M++] << 16) |
        ((program[this.M++] << 8) | program[this.M++])
      )
    }
  }
  function tryToRun (func, runnerThing) {
    try {
      func(runnerThing)
    } catch (error) {
      errorHandler(error, runnerThing)
    }
  }
  function errorHandler (error, runnerThing) {
    var bw = runnerThing.stack3.pop()
    for (var index = 0; index < bw.h; ++index) {
      runnerThing.stack2.pop()
    }
    runnerThing.stack2.push({ v: true, O: error })
    runnerThing.M = bw.W
    runnerThing.G = bw.G
  }
  var commands = [
    function (runnerThing) {
      debug(`OP 0: Checking if ${dE} is in ${dD}`)
      var dD = runnerThing.stack.pop()
      var dE = runnerThing.stack.pop()
      runnerThing.stack.push(dE in dD)
    },
    function (runnerThing) {
      debug(`OP 1`)
      var dG = H[runnerThing.getInstruction2()]
      var dH = RegExp(dG)
      runnerThing.stack.push(dH)
    },
    function (runnerThing) {
      debug(`OP 2`)
      var dJ = runnerThing.stack.pop()
      var dK = runnerThing.stack.pop()
      runnerThing.stack.push(dK >= dJ)
    },
    function (runnerThing) {
      debug(`OP 3`)
      var dM = runnerThing.stack.pop()
      runnerThing.stack.push(Number(dM))
    },
    function (runnerThing) {
      debug(`OP 4`)
      var dO = runnerThing.stack.pop()
      runnerThing.stack.push(String(dO))
    },
    function (runnerThing) {
      debug(`OP 5`)
      var dQ = runnerThing.getInstruction2()
      var dR = runnerThing.getInstruction()
      if (!runnerThing.stack.pop()) {
        runnerThing.M = dQ
        runnerThing.G = dR
      }
    },
    function (runnerThing) {
      debug(`OP 6`)
      var dT = runnerThing.getInstruction()
      var dU = runnerThing.stack.splice(runnerThing.stack.length - dT, dT)
      var dV = runnerThing.stack.pop()
      var dW = runnerThing.stack.pop()
      runnerThing.stack.push(o(dV, dW, dU))
    },
    function (runnerThing) {
      debug(`OP 7`)
      var dY = runnerThing.stack.pop()
      var dZ = runnerThing.stack.pop()
      var ea = runnerThing.stack.pop()
      var eb = runnerThing.stack.pop()
      var ec = runnerThing.stack.pop()
      var ed = runnerThing.stack.pop()
      var ee = runnerThing.stack.pop()
      var ef = runnerThing.stack.pop()
      var eg = runnerThing.stack.pop()
      var eh = runnerThing.stack.pop()
      var ei = runnerThing.stack.pop()
      var ej = runnerThing.stack.pop()
      var ek = runnerThing.stack.pop()
      var el = runnerThing.stack.pop()
      runnerThing.stack.push(
        new el(ek, ej, ei, eh, eg, ef, ee, ed, ec, eb, ea, dZ, dY)
      )
    },
    function (runnerThing) {
      debug(`OP 8`)
      var en = runnerThing.stack.pop()
      var eo = []
      for (var ep in en) {
        t(eo, ep)
      }
      runnerThing.stack.push(eo)
    },
    function (runnerThing) {
      debug(`OP 9`)
      --runnerThing.stack3[runnerThing.stack3.length - 1].h
    },
    function (runnerThing) {
      debug(`OP 10`)
      var es = runnerThing.getInstruction()
      var et = runnerThing.getInstruction()
      if (runnerThing.stack.pop()) {
        runnerThing.M = es
        runnerThing.G = et
      }
    },
    function (runnerThing) {
      debug(`OP 11`)
      var ev = runnerThing.stack.pop()
      var ew = runnerThing.stack.pop()
      runnerThing.stack.push(new ew(ev))
    },
    function (runnerThing) {
      debug(`OP 12`)
      var ey = runnerThing.stack.pop()
      var ez = runnerThing.stack.pop()
      runnerThing.stack.push(ez - ey)
    },
    function (runnerThing) {
      debug(`OP 13`)
      var eB = runnerThing.stack.pop()
      var eC = runnerThing.stack.pop()
      var eD = runnerThing.stack.pop()
      runnerThing.stack.push(new eD(eC, eB))
    },
    function (runnerThing) {
      debug(`OP 14`)
      var eF = runnerThing.stack.pop()
      var eG = runnerThing.stack.pop()
      runnerThing.stack.push(eG | eF)
    },
    function (runnerThing) {
      debug(`OP 15`)
      var eI = runnerThing.stack.pop()
      var eJ = runnerThing.stack.pop()
      runnerThing.stack.push(delete eJ[eI])
    },
    function (runnerThing) {
      debug(`OP 16`)
      var eL = runnerThing.stack.pop()
      var eM = runnerThing.stack.pop()
      runnerThing.stack.push(eM > eL)
    },
    function (runnerThing) {
      debug(`OP 17`)
      var eO = runnerThing.getInstruction2()
      var eP = runnerThing.getInstruction()
      runnerThing.K = {
        M: runnerThing.M,
        G: runnerThing.G
      }
      runnerThing.M = eO
      runnerThing.G = eP
    },
    function (runnerThing) {
      debug(`OP 18`)
      var eR = runnerThing.getInstruction2()
      var eS = runnerThing.getInstruction()
      runnerThing.stack3.push({ W: eR, G: eS, h: 0 })
    },
    function (runnerThing) {
      debug(`OP 19`)
      var eU = runnerThing.stack.pop()
      var eV = runnerThing.stack.pop()
      runnerThing.stack.push(eV >>> eU)
    },
    function (runnerThing) {
      debug(`OP 20: FAIL`)
      runnerThing.stack.push(function () {
        null[0]()
      })
    },
    function (runnerThing) {
      debug(`OP 21`)
      var eY = runnerThing.stack.pop()
      var eZ = runnerThing.stack.pop()
      runnerThing.stack.push(eZ * eY)
    },
    function (runnerThing) {
      debug(`OP 22`)
      var fb = runnerThing.stack.pop()
      var fc = runnerThing.stack.pop()
      var fd = runnerThing.stack.pop()
      runnerThing.stack.push(fd(fc, fb))
    },
    function (runnerThing) {
      debug(`OP 23`)
      var ff = runnerThing.getInstruction2()
      var fg = next_instruction(ff, runnerThing.somefing)
      runnerThing.stack.push(fg)
    },
    function (runnerThing) {
      debug(`OP 24`)
      var fj = runnerThing.stack.pop()
      runnerThing.stack.push(!fj)
    },
    function (runnerThing) {
      debug(`OP 25`)
      var fl = runnerThing.getInstruction2()
      var fm = runnerThing.getInstruction()
      runnerThing.M = fl
      runnerThing.G = fm
    },
    function (runnerThing) {
      debug(`OP 26`)
      var fo = runnerThing.stack.pop()
      var fp = runnerThing.stack.pop()
      runnerThing.stack.push(fp[fo])
    },
    function (runnerThing) {
      debug(`OP 27`)
      var fr = runnerThing.getInstruction()
      var fs = runnerThing.getInstruction()
      if (!runnerThing.stack.pop()) {
        runnerThing.M = fr
        runnerThing.G = fs
      }
    },
    function (runnerThing) {
      debug(`OP 28`)
      runnerThing.M = runnerThing.K.M
      runnerThing.G = runnerThing.K.G
    },
    function (runnerThing) {
      debug(`OP 29`)
      var fv = runnerThing.stack.pop()
      var fw = runnerThing.stack.pop()
      var fx = runnerThing.stack.pop()
      var fy = runnerThing.stack.pop()
      runnerThing.stack.push(fy(fx, fw, fv))
    },
    function (runnerThing) {
      debug(`OP 30`)
      var fA = runnerThing.getInstruction()
      var fB = runnerThing.stack2.pop()
      runnerThing.somefing.set(fA, fB.O)
    },
    function (runnerThing) {
      debug(`OP 31`)
      var fD = H[runnerThing.getInstruction2()]
      runnerThing.stack.push(typeof b[fD])
    },
    function (runnerThing) {
      debug(`OP 32`)
      var fF = runnerThing.getInstruction2()
      var fG = runnerThing.getInstruction()
      if (runnerThing.stack.pop()) {
        runnerThing.M = fF
        runnerThing.G = fG
      }
    },
    function (runnerThing) {
      debug(`OP 33`)
      var fI = runnerThing.stack.pop()
      var fJ = runnerThing.stack.pop()
      runnerThing.stack.push(fJ(fI))
    },
    function (runnerThing) {
      debug(`OP 34`)
      var fL = runnerThing.stack.pop()
      runnerThing.stack.push(fL())
    },
    function (runnerThing) {
      debug(`OP 35`)
      var fN = runnerThing.stack.pop()
      var fO = runnerThing.stack.pop()
      runnerThing.stack.push(fO < fN)
    },
    function (runnerThing) {
      debug(`OP 36`)
      var fQ = H[runnerThing.getInstruction2()]
      if (!(fQ in b)) throw new ReferenceError(fQ + ' is not defined.')
      runnerThing.stack.push(b[fQ])
    },
    function (runnerThing) {
      debug(`OP 37`)
      var fS = runnerThing.stack.pop()
      var fT = runnerThing.stack.pop()
      runnerThing.stack.push(fT % fS)
    },
    function (runnerThing) {
      debug(`OP 38`)
      var fV = runnerThing.stack.pop()
      runnerThing.stack.push(-fV)
    },
    function (runnerThing) {
      debug(`OP 39`)
      runnerThing.stack.push(null)
    },
    function (runnerThing) {
      debug(`OP 40`)
      var fY = runnerThing.getInstruction2()
      runnerThing.stack.push(fY)
    },
    function (runnerThing) {
      debug(`OP 41`)
      var ga = runnerThing.stack.pop()
      var gb = runnerThing.stack.pop()
      runnerThing.stack.push(gb / ga)
    },
    function (runnerThing) {
      debug(`OP 42`)
      throw runnerThing.stack.pop()
    },
    function (runnerThing) {
      debug(`OP 43`)
      runnerThing.stack.push([])
    },
    function (runnerThing) {
      debug(`OP 44`)
      var gf = runnerThing.stack2.pop()
      if (gf.v) throw gf.O
      runnerThing.M = gf.O
      runnerThing.G = gf.G
    },
    function (runnerThing) {
      debug(`OP 45`)
      var gh = L[runnerThing.getInstruction()]
      runnerThing.stack.push(gh)
    },
    function (runnerThing) {
      debug(`OP 46`)
      runnerThing.stack3.pop()
    },
    function (runnerThing) {
      debug(`OP 47`)
      var gk = runnerThing.stack.pop()
      var gl = runnerThing.stack.pop()
      Object.defineProperty(gl, gk, {
        writable: true,
        configurable: true,
        enumerable: true,
        value: runnerThing.stack.pop()
      })
    },
    function (runnerThing) {
      debug(`OP 48`)
      var gn = runnerThing.stack.pop()
      if (gn === null || gn === undefined) {
        throw new TypeError('Cannot access property of ' + gn)
      }
    },
    function (runnerThing) {
      debug(`OP 49`)
      var gp = runnerThing.stack.pop()
      var gq = runnerThing.stack.pop()
      runnerThing.stack.push(gq == gp)
    },
    function (runnerThing) {
      debug(`OP 50`)
      var gs = H[runnerThing.getInstruction2()]
      runnerThing.stack.push(gs)
    },
    function (runnerThing) {
      debug(`OP 51`)
      var gu = runnerThing.getInstruction3()
      runnerThing.stack.push(gu)
    },
    function (runnerThing) {
      debug(`OP 52`)
      var gw = runnerThing.stack.pop()
      var gx = runnerThing.stack.pop()
      runnerThing.stack.push(gx[gw]())
    },
    function (runnerThing) {
      debug(`OP 53`)
      var gz = runnerThing.stack.pop()
      var gA = runnerThing.stack.pop()
      runnerThing.stack.push(gA instanceof gz)
    },
    function (runnerThing) {
      debug(`OP 54`)
      var gC = runnerThing.stack.pop()
      runnerThing.stack.push(new gC())
    },
    function (runnerThing) {
      debug(`OP 55: Clear Stack`)
      runnerThing.stack = []
    },
    function (runnerThing) {
      debug(`OP 56`)
      var gF = runnerThing.getInstruction2()
      runnerThing.somefing.set(gF, runnerThing.stack.pop())
    },
    function (runnerThing) {
      debug(`OP 57: Regex Evaluation ${gH} ${gi}`)
      var gH = runnerThing.stack.pop()
      var gI = runnerThing.stack.pop()
      var gJ = RegExp(gH, gI)
      runnerThing.stack.push(gJ)
    },
    function (runnerThing) {
      debug(`OP 58`)
      var gL = runnerThing.getInstruction()
      var gM = runnerThing.somefing.get(gL)
      runnerThing.stack.push(gM)
    },
    function (runnerThing) {
      debug(`OP 59`)
      var gO = runnerThing.stack3.pop()
      var gP = {
        v: false,
        O: runnerThing.M,
        G: runnerThing.G
      }
      runnerThing.stack2.push(gP)
      runnerThing.M = gO.W
      runnerThing.G = gO.G
    },
    function (runnerThing) {
      debug(`OP 60: REPLICATE TEH WORLD`)
      runnerThing.stack.push(a)
    },
    function (runnerThing) {
      debug(`OP 61: is ${gT} === ${gS}`)
      var gS = runnerThing.stack.pop()
      var gT = runnerThing.stack.pop()
      runnerThing.stack.push(gT === gS)
    },
    function (runnerThing) {
      debug(`OP 62: is ${gW} <= ${gV}`)
      var gV = runnerThing.stack.pop()
      var gW = runnerThing.stack.pop()
      runnerThing.stack.push(gW <= gV)
    },
    function (runnerThing) {
      debug(`OP 63`)
      var gY = runnerThing.stack.pop()
      var gZ = runnerThing.stack.pop()
      var ha = runnerThing.stack.pop()
      gZ[gY] = ha
    },
    function (runnerThing) {
      debug(`OP 64`)
      var hc = runnerThing.stack.pop()
      var hd = runnerThing.stack.pop()
      runnerThing.stack.push(hd >> hc)
    },
    function (runnerThing) {
      debug(`OP 65`)
      var hf = runnerThing.stack.pop()
      var hg = runnerThing.stack.pop()
      var hh = runnerThing.stack.pop()
      var hi = runnerThing.stack.pop()
      runnerThing.stack.push(new hi(hh, hg, hf))
    },
    function (runnerThing) {
      debug(`OP 66`)
      var hk = runnerThing.getInstruction()
      runnerThing.somefing.set(hk, runnerThing.stack.pop())
    },
    function (runnerThing) {
      debug(`OP 67`)
      var hm = runnerThing.getInstruction()
      runnerThing.stack.push(hm)
    },
    function (runnerThing) {
      debug(`OP 68: true`)
      runnerThing.stack.push(true)
    },
    function (runnerThing) {
      debug(`OP 69`)
      runnerThing.stack.push(runnerThing.c)
    },
    function (runnerThing) {
      debug(`OP 70`)
      var hq = runnerThing.stack.pop()
      if (hq === null || hq === undefined) {
        throw new TypeError(hq + ' is not an object')
      }
      runnerThing.stack.push(Object(hq))
    },
    function (runnerThing) {
      debug(`OP 71`)
      var hs = runnerThing.stack.pop()
      runnerThing.stack[runnerThing.stack.length - 1] += hs
    },
    function (runnerThing) {
      debug(`OP 72`)
      var hu = runnerThing.getInstruction()
      var hv = next_instruction(hu, runnerThing.somefing)
      runnerThing.stack.push(hv)
    },
    function (runnerThing) {
      debug(`OP 73`)
      var hx = runnerThing.getInstruction2()
      var hy = runnerThing.somefing.get(hx)
      runnerThing.stack.push(hy)
    },
    function (runnerThing) {
      debug(`OP 74`)
      var hA = runnerThing.stack.pop()
      var hB = runnerThing.stack.pop()
      runnerThing.stack.push(hB & hA)
    },
    function (runnerThing) {
      debug(`OP 75`)
      var hD = runnerThing.getInstruction3()
      var hE = runnerThing.getInstruction()
      runnerThing.K = { M: runnerThing.M, G: runnerThing.G }
      runnerThing.M = hD
      runnerThing.G = hE
    },
    function (runnerThing) {
      debug(`OP 76`)
      runnerThing.stack.push(undefined)
    },
    function (runnerThing) {
      debug(`OP 77`)
      runnerThing.stack.push(runnerThing.i)
    },
    function (runnerThing) {
      debug(`OP 78`)
      var hI = runnerThing.stack.pop()
      runnerThing.stack.push(typeof hI)
    },
    function (_runnerThing) {
      globalUnknown1 = undefined
    },
    function (runnerThing) {
      debug(`OP 79`)
      var hM = runnerThing.stack.pop()
      var hN = runnerThing.stack.pop()
      runnerThing.stack.push(hN !== hM)
    },
    function (runnerThing) {
      debug(`OP 80`)
      runnerThing.stack.pop()
    },
    function (runnerThing) {
      debug(`OP 81`)
      var hQ = runnerThing.stack.pop()
      var hR = runnerThing.stack.pop()
      runnerThing.stack.push(hR << hQ)
    },
    function (runnerThing) {
      debug(`OP 82`)
      var hT = runnerThing.stack.pop()
      var hU = runnerThing.stack.pop()
      var hV = runnerThing.stack.pop()
      var hW = runnerThing.stack.pop()
      var hX = runnerThing.stack.pop()
      runnerThing.stack.push(hX(hW, hV, hU, hT))
    },
    function (runnerThing) {
      debug(`OP 83`)
      var hZ = runnerThing.stack.pop()
      var ia = runnerThing.stack.pop()
      runnerThing.stack.push(ia != hZ)
    },
    function (runnerThing) {
      debug(`OP 84`)
      ++runnerThing.stack3[runnerThing.stack3.length - 1].h
    },
    function (runnerThing) {
      debug(`OP 85`)
      var id = runnerThing.getInstruction()
      var ie = runnerThing.getInstruction()
      runnerThing.M = id
      runnerThing.G = ie
    },
    function (runnerThing) {
      debug(`OP 86`)
      runnerThing.stack.push(runnerThing.stack[runnerThing.stack.length - 1])
    },
    function (runnerThing) {
      debug(`OP 87`)
      runnerThing.stack.push(false)
    },
    function (runnerThing) {
      debug(`OP 88`)
      var ij = runnerThing.getInstruction2()
      var ik = I[ij]
      if (typeof ik !== 'undefined') {
        runnerThing.stack[runnerThing.stack.length - 1] = ik
        return
      }
      var il = runnerThing.stack.pop()
      var im = H[ij]
      var io = parseProgram(im)
      var ip = parseProgram(il)
      var iq = (io[0] + ip[0]) & 255
      var ir = ''
      for (var is = 1; is < io.length; ++is) {
        ir += String.fromCharCode(ip[is] ^ io[is] ^ iq)
      }
      I[ij] = ir
      runnerThing.stack.push(ir)
    },
    function (runnerThing) {
      debug(`OP 89`)
      var iu = runnerThing.stack.pop()
      var iv = runnerThing.stack.pop()
      runnerThing.M = iu
      runnerThing.G = iv
    },
    function (_runnerThing) {
      globalUnknown1 = c
    },
    function (runnerThing) {
      debug(`OP 90`)
      globalUnknown1 = runnerThing.stack.pop()
    },
    function (runnerThing) {
      debug(`OP 91`)
      var iz = runnerThing.stack.pop()
      var iA = runnerThing.stack.pop()
      runnerThing.stack.push(iA ^ iz)
    },
    function (runnerThing) {
      debug(`OP 92: new empty object`)
      runnerThing.stack.push({})
    }
  ]
  function next_instruction (iC, somefing) {
    var iE = K[iC]
    return run_program(iE.a, iE.u, somefing, iE.J, iE.V, iE.Z, iE.p, iE.C)
  }
  var globalUnknown1 = d
  var program = parseProgram(require('./program'))
  function run_program (iG, iH, childSomefing, iJ, iK, iL, iM, iN) {
    var somefing = new Somefing()
    var iS = iM !== undefined
    for (var index = 0; index < iK.length; ++index) {
      somefing.data[iK[index]] = childSomefing.data[iK[index]]
    }
    var iR = initiate(iG, iH, somefing, iJ, iL, iS, iM)
    if (iN !== undefined) {
      somefing.clear(iN)
      somefing.set(iN, iR)
    }
    return iR
  }
  function initiate (iU, iV, somefing, iX, iY, iZ, ja) {
    var jb = iY.length
    const func = function () {
      var somefing2 = somefing.clone()
      var runnerThing = new RunnerThing(iU, iV, somefing2, this)
      var jg = Math.min(arguments.length, jb)
      if (iZ) {
        somefing2.clear(ja)
        somefing2.set(ja, arguments)
      }
      for (var je = 0; je < iX.length; ++je) {
        somefing2.clear(iX[je])
      }
      for (var je = 0; je < jg; ++je) {
        somefing2.set(iY[je], arguments[je])
      }
      for (var je = jg; je < jb; ++je) {
        somefing2.set(iY[je], undefined)
      }
      return initiateInner(runnerThing)
    }

    return func
    // if arity is higher maybe return this. but I think it's the same thing
    // return function () {
    //   return func.apply(this, arguments)
    // }
  }
  function initiateInner (runnerThing) {
    for (;;) {
      if (globalUnknown1 !== d) {
        var unknownC = globalUnknown1
        globalUnknown1 = d
        return unknownC
      }
      var unknownB = runnerThing.P()
      // keith: uncomment this line to run it
      // console.log(runnerThing.stack)
      if (runnerThing.stack3.length === 0) {
        commands[unknownB](runnerThing)
      } else {
        tryToRun(commands[unknownB], runnerThing)
      }
    }
  }
  run_program(0, 0, null, [], [], [], undefined, undefined)()
})(
  global // window in browser
)

var e = document.createEvent('CustomEvent')
e.initCustomEvent('hMdDUwjQl', false, false, [
  'A3MNlV1zAQAA-cmcY943xczi-gSwyGVlytNF-HD_5g1kqLj38Z3dLXkZLyHrAUk_V-SucnW8wH8AAEB3AAAAAA==',
  'yAP6YlMw3q91z_ZuhRO2rNfLImU8=VgXpsnDGaKSJ0Qivkt4xF5TWEoe7HbdCBjc-',
  [],
  [
    61799144,
    1199779779,
    1720289667,
    517324357,
    1322525338,
    1151391792,
    209120140,
    1570025454
  ],
  'O09NzP4eSHgv2+9mZsXyZ9JD',
  'O09NzP4eSHgv2+9mZsXyZ9JD',
  [
    [/(?:)/, /^((?=.*nope\.nope$))/i, /^((?=.*\/login$))/i],
    [[['POSTTT'], [0, 1, 0, 2, 0]]]
  ],
  arguments
])
dispatchEvent(e)
