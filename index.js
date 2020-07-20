// shim browser env
var listeners = {}
global.addEventListener = function addEventListener (type, func) {
  // console.log('Adding event listener for:', type)
  listeners[type] = func
  if (type === 'DOMContentLoaded') {
    const e = createEvent('CustomEvent')
    e.initCustomEvent('DOMContentLoaded')
    dispatchEvent(e)
  }
}
global.removeEventListener = function removeEventListener (type, _func) {
  // console.log('Removing event listener for:', type)
  delete listeners[type]
}
global.createEvent = function createEvent (event) {
  if (event !== 'CustomEvent') throw new Error(`Unknown Event Type: ${event}`)
  let e = {
    initCustomEvent (type, canBubble, cancelable, detail) {
      e.type = type
      e.detail = detail
    }
  }
  return e
}
global.dispatchEvent = function dispatchEvent (event) {
  // console.log('Firing event for:', event.type)
  if (event.type in listeners) listeners[event.type](event)
  else console.log(`----- Failed to fire event ${event.type} -----`)
}
global.document = {
  addEventListener: global.addEventListener,
  removeEventListener: global.removeEventListener,
  createEvent: global.createEvent
}
let count = 0
let debugCode = 0
const fmt = a => {
  if (typeof a === 'function') return `<${a.name || 'unnamedFunc'}>`
  return a
}
const pad = (num, count) => `${num}`.padStart(count, '0')
const debug = ({ debugCode }, op, msg) => {
  if (!process.env.DEBUG) return
  ++count
  if (process.env.COUNT && count >= parseInt(process.env.COUNT, 10)) return
  if (process.env.OP && parseInt(process.env.OP, 10) !== op) return
  const prefix = `${pad(count, 5)} VM ${pad(debugCode, 3)} OP ${pad(op, 2)}`
  console.log(msg ? `${prefix}: ${msg}` : prefix)
}
// end shim browser env

;(function a (b) {
  var HALT = {}
  var CONTINUE = {}
  var n = Object.call.bind(Object.bind, Object.call)
  var o = n(Object.apply)
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

  class Registers {
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
      var child = new Registers()
      child.data = this.data.slice(0)
      return child
    }
  }

  class VM {
    stack = []
    stack2 = []
    stack3 = []
    T = undefined
    K = 0

    debugCode = debugCode++

    constructor (bj, bk, registers, bm) {
      this.G = bk
      this.M = bj
      this.registers = registers
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
  function tryToRun (func, vm) {
    try {
      func(vm)
    } catch (error) {
      errorHandler(error, vm)
    }
  }
  function errorHandler (error, vm) {
    var bw = vm.stack3.pop()
    for (var index = 0; index < bw.h; ++index) {
      vm.stack2.pop()
    }
    vm.stack2.push({ v: true, O: error })
    vm.M = bw.W
    vm.G = bw.G
  }
  var commands = [
    function (vm) {
      var dD = vm.stack.pop()
      var dE = vm.stack.pop()
      debug(vm, 0, `${dE} in ${dD} = ${dE in dD}`)
      vm.stack.push(dE in dD)
    },
    function (vm) {
      debug(vm, 1)
      var dG = H[vm.getInstruction2()]
      var dH = RegExp(dG)
      vm.stack.push(dH)
    },
    function (vm) {
      var dJ = vm.stack.pop()
      var dK = vm.stack.pop()
      debug(vm, 2, `${dK} >= ${dJ} = ${dK >= dJ}`)
      vm.stack.push(dK >= dJ)
    },
    function (vm) {
      var dM = vm.stack.pop()
      debug(vm, 3, `Number(${dM}) = ${Number(dM)}`)
      vm.stack.push(Number(dM))
    },
    function (vm) {
      var dO = vm.stack.pop()
      debug(vm, 4, `String(${dO}) = ${String(dO)}`)
      vm.stack.push(String(dO))
    },
    function (vm) {
      debug(vm, 5)
      var dQ = vm.getInstruction2()
      var dR = vm.getInstruction()
      if (!vm.stack.pop()) {
        vm.M = dQ
        vm.G = dR
      }
    },
    function (vm) {
      debug(vm, 6)
      var dT = vm.getInstruction()
      var dU = vm.stack.splice(vm.stack.length - dT, dT)
      var dV = vm.stack.pop()
      var dW = vm.stack.pop()
      vm.stack.push(o(dV, dW, dU))
    },
    function (vm) {
      debug(vm, 7)
      var dY = vm.stack.pop()
      var dZ = vm.stack.pop()
      var ea = vm.stack.pop()
      var eb = vm.stack.pop()
      var ec = vm.stack.pop()
      var ed = vm.stack.pop()
      var ee = vm.stack.pop()
      var ef = vm.stack.pop()
      var eg = vm.stack.pop()
      var eh = vm.stack.pop()
      var ei = vm.stack.pop()
      var ej = vm.stack.pop()
      var ek = vm.stack.pop()
      var el = vm.stack.pop()
      vm.stack.push(new el(ek, ej, ei, eh, eg, ef, ee, ed, ec, eb, ea, dZ, dY))
    },
    function (vm) {
      debug(vm, 8)
      var en = vm.stack.pop()
      var eo = []
      for (var ep in en) {
        eo.push(ep)
      }
      vm.stack.push(eo)
    },
    function (vm) {
      debug(vm, 9)
      --vm.stack3[vm.stack3.length - 1].h
    },
    function (vm) {
      debug(vm, 10)
      var es = vm.getInstruction()
      var et = vm.getInstruction()
      if (vm.stack.pop()) {
        vm.M = es
        vm.G = et
      }
    },
    function (vm) {
      debug(vm, 11)
      var ev = vm.stack.pop()
      var ew = vm.stack.pop()
      vm.stack.push(new ew(ev))
    },
    function (vm) {
      var ey = vm.stack.pop()
      var ez = vm.stack.pop()
      debug(vm, 12, `${ez} - ${ey} = ${ez - ey}`)
      vm.stack.push(ez - ey)
    },
    function (vm) {
      debug(vm, 13)
      var eB = vm.stack.pop()
      var eC = vm.stack.pop()
      var eD = vm.stack.pop()
      vm.stack.push(new eD(eC, eB))
    },
    function (vm) {
      var eF = vm.stack.pop()
      var eG = vm.stack.pop()
      debug(vm, 14, `${eG} | ${eF} = ${eG | eF}`)
      vm.stack.push(eG | eF)
    },
    function (vm) {
      debug(vm, 15)
      var eI = vm.stack.pop()
      var eJ = vm.stack.pop()
      vm.stack.push(delete eJ[eI])
    },
    function (vm) {
      var eL = vm.stack.pop()
      var eM = vm.stack.pop()
      debug(vm, 16, `${eM} > ${eL} = ${eM > eL}`)
      vm.stack.push(eM > eL)
    },
    function (vm) {
      debug(vm, 17)
      var eO = vm.getInstruction2()
      var eP = vm.getInstruction()
      vm.K = {
        M: vm.M,
        G: vm.G
      }
      vm.M = eO
      vm.G = eP
    },
    function (vm) {
      debug(vm, 18)
      var eR = vm.getInstruction2()
      var eS = vm.getInstruction()
      vm.stack3.push({ W: eR, G: eS, h: 0 })
    },
    function (vm) {
      var eU = vm.stack.pop()
      var eV = vm.stack.pop()
      debug(vm, 19, `${eV} >>> ${eU} = ${eV - eU}`)
      vm.stack.push(eV >>> eU)
    },
    function (vm) {
      debug(vm, 20, `FAIL FANTASTICALLY`)
      vm.stack.push(function () {
        null[0]()
      })
    },
    function (vm) {
      var eY = vm.stack.pop()
      var eZ = vm.stack.pop()
      debug(vm, 21, `${eZ} * ${eY} = ${eZ - eY}`)
      vm.stack.push(eZ * eY)
    },
    function (vm) {
      var fb = vm.stack.pop()
      var fc = vm.stack.pop()
      var fd = vm.stack.pop()
      var res = fd(fc, fb)
      debug(vm, 22, `fn/2 ${fmt(fd)}(${fmt(fc)}, ${fmt(fb)}) = ${res}`)
      vm.stack.push(res)
    },
    function (vm) {
      var ff = vm.getInstruction2()
      var fg = run_subroutine(ff, vm.registers)
      debug(vm, 23, `run_subroutine<instr2>(${ff}) = ${fmt(fg)}`)
      vm.stack.push(fg)
    },
    function (vm) {
      var fj = vm.stack.pop()
      debug(vm, 24, `!${fmt(fj)} = ${!fj}`)
      vm.stack.push(!fj)
    },
    function (vm) {
      debug(vm, 25)
      var fl = vm.getInstruction2()
      var fm = vm.getInstruction()
      vm.M = fl
      vm.G = fm
    },
    function (vm) {
      debug(vm, 26)
      var fo = vm.stack.pop()
      var fp = vm.stack.pop()
      vm.stack.push(fp[fo])
    },
    function (vm) {
      debug(vm, 27)
      var fr = vm.getInstruction()
      var fs = vm.getInstruction()
      if (!vm.stack.pop()) {
        vm.M = fr
        vm.G = fs
      }
    },
    function (vm) {
      debug(vm, 28)
      vm.M = vm.K.M
      vm.G = vm.K.G
    },
    function (vm) {
      debug(vm, 29)
      var fv = vm.stack.pop()
      var fw = vm.stack.pop()
      var fx = vm.stack.pop()
      var fy = vm.stack.pop()
      vm.stack.push(fy(fx, fw, fv))
    },
    function (vm) {
      debug(vm, 30)
      var fA = vm.getInstruction()
      var fB = vm.stack2.pop()
      vm.registers.set(fA, fB.O)
    },
    function (vm) {
      debug(vm, 31)
      var fD = H[vm.getInstruction2()]
      vm.stack.push(typeof b[fD])
    },
    function (vm) {
      debug(vm, 32)
      var fF = vm.getInstruction2()
      var fG = vm.getInstruction()
      if (vm.stack.pop()) {
        vm.M = fF
        vm.G = fG
      }
    },
    function (vm) {
      debug(vm, 33)
      var fI = vm.stack.pop()
      var fJ = vm.stack.pop()
      vm.stack.push(fJ(fI))
    },
    function (vm) {
      debug(vm, 34)
      var fL = vm.stack.pop()
      vm.stack.push(fL())
    },
    function (vm) {
      var fN = vm.stack.pop()
      var fO = vm.stack.pop()
      debug(vm, 35, `${fO} < ${fN} = ${fO < fN}`)
      vm.stack.push(fO < fN)
    },
    function (vm) {
      var fQ = H[vm.getInstruction2()]
      debug(vm, 36, `global.${fQ}`)
      if (!(fQ in b)) throw new ReferenceError(fQ + ' is not defined.')
      vm.stack.push(b[fQ])
    },
    function (vm) {
      var fS = vm.stack.pop()
      var fT = vm.stack.pop()
      debug(vm, 37, `${fT} % ${fS} = ${fT % fS}`)
      vm.stack.push(fT % fS)
    },
    function (vm) {
      var fV = vm.stack.pop()
      debug(vm, 38, `negate ${fV} = ${-fV}`)
      vm.stack.push(-fV)
    },
    function (vm) {
      debug(vm, 39, `null`)
      vm.stack.push(null)
    },
    function (vm) {
      debug(vm, 40)
      var fY = vm.getInstruction2()
      vm.stack.push(fY)
    },
    function (vm) {
      var ga = vm.stack.pop()
      var gb = vm.stack.pop()
      debug(vm, 41, `${gb} / ${ga} = ${gb / ga}`)
      vm.stack.push(gb / ga)
    },
    function (vm) {
      debug(vm, 42)
      throw vm.stack.pop()
    },
    function (vm) {
      debug(vm, 43)
      vm.stack.push([])
    },
    function (vm) {
      debug(vm, 44)
      var gf = vm.stack2.pop()
      if (gf.v) throw gf.O
      vm.M = gf.O
      vm.G = gf.G
    },
    function (vm) {
      debug(vm, 45)
      var gh = L[vm.getInstruction()]
      vm.stack.push(gh)
    },
    function (vm) {
      debug(vm, 46)
      vm.stack3.pop()
    },
    function (vm) {
      debug(vm, 47)
      var gk = vm.stack.pop()
      var gl = vm.stack.pop()
      Object.defineProperty(gl, gk, {
        writable: true,
        configurable: true,
        enumerable: true,
        value: vm.stack.pop()
      })
    },
    function (vm) {
      debug(vm, 48)
      var gn = vm.stack.pop()
      if (gn === null || gn === undefined) {
        throw new TypeError('Cannot access property of ' + gn)
      }
    },
    function (vm) {
      debug(vm, 49)
      var gp = vm.stack.pop()
      var gq = vm.stack.pop()
      vm.stack.push(gq == gp)
    },
    function (vm) {
      var gs = H[vm.getInstruction2()]
      debug(vm, 50, `Pull from H = ${gs}`)
      vm.stack.push(gs)
    },
    function (vm) {
      debug(vm, 51)
      var gu = vm.getInstruction3()
      vm.stack.push(gu)
    },
    function (vm) {
      debug(vm, 52)
      var gw = vm.stack.pop()
      var gx = vm.stack.pop()
      vm.stack.push(gx[gw]())
    },
    function (vm) {
      var gz = vm.stack.pop()
      var gA = vm.stack.pop()
      debug(vm, 53, `${gA} instanceof ${gz} = ${gA instanceof gz}`)
      vm.stack.push(gA instanceof gz)
    },
    function (vm) {
      var gC = vm.stack.pop()
      debug(vm, 54, `instantiate ${fmt(gC)}`)
      vm.stack.push(new gC())
    },
    function (vm) {
      debug(vm, 55, `Clear Stack`)
      vm.stack = []
    },
    function (vm) {
      debug(vm, 56)
      var gF = vm.getInstruction2()
      vm.registers.set(gF, vm.stack.pop())
    },
    function (vm) {
      var gH = vm.stack.pop()
      var gI = vm.stack.pop()
      var gJ = RegExp(gH, gI)
      debug(vm, 57, `RegExp(${gH}, ${gI})`)
      vm.stack.push(gJ)
    },
    function (vm) {
      var gL = vm.getInstruction()
      var gM = vm.registers.get(gL)
      debug(vm, 58, `RegisterRead: r[${gL}] = ${fmt(gM)}`)
      vm.stack.push(gM)
    },
    function (vm) {
      debug(vm, 59)
      var gO = vm.stack3.pop()
      var gP = { v: false, O: vm.M, G: vm.G }
      vm.stack2.push(gP)
      vm.M = gO.W
      vm.G = gO.G
    },
    function (vm) {
      debug(vm, 60, `REPLICATE TEH WORLD`)
      vm.stack.push(a)
    },
    function (vm) {
      var gS = vm.stack.pop()
      var gT = vm.stack.pop()
      debug(vm, 61, `${gT} === ${gS} = ${gT === gS}`)
      vm.stack.push(gT === gS)
    },
    function (vm) {
      var gV = vm.stack.pop()
      var gW = vm.stack.pop()
      debug(vm, 62, `${gW} <= ${gV} = ${gW <= gV}`)
      vm.stack.push(gW <= gV)
    },
    function (vm) {
      debug(vm, 63)
      var gY = vm.stack.pop()
      var gZ = vm.stack.pop()
      var ha = vm.stack.pop()
      gZ[gY] = ha
    },
    function (vm) {
      debug(vm, 64)
      var hc = vm.stack.pop()
      var hd = vm.stack.pop()
      vm.stack.push(hd >> hc)
    },
    function (vm) {
      debug(vm, 65)
      var hf = vm.stack.pop()
      var hg = vm.stack.pop()
      var hh = vm.stack.pop()
      var hi = vm.stack.pop()
      vm.stack.push(new hi(hh, hg, hf))
    },
    function (vm) {
      debug(vm, 66)
      var hk = vm.getInstruction()
      vm.registers.set(hk, vm.stack.pop())
    },
    function (vm) {
      debug(vm, 67)
      var hm = vm.getInstruction()
      vm.stack.push(hm)
    },
    function (vm) {
      debug(vm, 68, `true`)
      vm.stack.push(true)
    },
    function (vm) {
      debug(vm, 69)
      vm.stack.push(vm.c)
    },
    function (vm) {
      debug(vm, 70)
      var hq = vm.stack.pop()
      if (hq === null || hq === undefined) {
        throw new TypeError(hq + ' is not an object')
      }
      vm.stack.push(Object(hq))
    },
    function (vm) {
      debug(vm, 71)
      var hs = vm.stack.pop()
      vm.stack[vm.stack.length - 1] += hs
    },
    function (vm) {
      var hu = vm.getInstruction()
      var hv = run_subroutine(hu, vm.registers)
      debug(vm, 72, `run_subroutine<instr>(${hu}) = ${fmt(hv)}`)
      vm.stack.push(hv)
    },
    function (vm) {
      debug(vm, 73)
      var hx = vm.getInstruction2()
      var hy = vm.registers.get(hx)
      vm.stack.push(hy)
    },
    function (vm) {
      var hA = vm.stack.pop()
      var hB = vm.stack.pop()
      debug(vm, 74, `${hB} & ${hA} = ${hB & hA}`)
      vm.stack.push(hB & hA)
    },
    function (vm) {
      debug(vm, 75)
      var hD = vm.getInstruction3()
      var hE = vm.getInstruction()
      vm.K = { M: vm.M, G: vm.G }
      vm.M = hD
      vm.G = hE
    },
    function (vm) {
      debug(vm, 76, 'undefined')
      vm.stack.push(undefined)
    },
    function (vm) {
      debug(vm, 77)
      vm.stack.push(vm.i)
    },
    function (vm) {
      debug(vm, 78)
      var hI = vm.stack.pop()
      vm.stack.push(typeof hI)
    },
    function (vm) {
      debug(vm, 79, 'return undefined')
      globalReturnValue = undefined
    },
    function (vm) {
      debug(vm, 80)
      var hM = vm.stack.pop()
      var hN = vm.stack.pop()
      vm.stack.push(hN !== hM)
    },
    function (vm) {
      var popped = vm.stack.pop()
      debug(vm, 81, `Pop stack (${fmt(popped)})`)
    },
    function (vm) {
      debug(vm, 82)
      var hQ = vm.stack.pop()
      var hR = vm.stack.pop()
      vm.stack.push(hR << hQ)
    },
    function (vm) {
      var hT = vm.stack.pop()
      var hU = vm.stack.pop()
      var hV = vm.stack.pop()
      var hW = vm.stack.pop()
      var hX = vm.stack.pop()
      var res = hX(hW, hV, hU, hT)
      debug(
        vm,
        83,
        `fn/4 ${fmt(hX)}(${fmt(hW)}, ${fmt(hV)}, ${fmt(hU)}, ${fmt(
          hT
        )}) = ${res}`
      )
      vm.stack.push(res)
    },
    function (vm) {
      var hZ = vm.stack.pop()
      var ia = vm.stack.pop()
      debug(vm, 84, `${ia} != ${hZ} = ${ia != hZ}`)
      vm.stack.push(ia != hZ)
    },
    function (vm) {
      debug(vm, 85)
      ++vm.stack3[vm.stack3.length - 1].h
    },
    function (vm) {
      var id = vm.getInstruction()
      var ie = vm.getInstruction()
      debug(vm, 86, `jump-instr M=${id} G=${ie}`)
      vm.M = id
      vm.G = ie
    },
    function (vm) {
      debug(vm, 87)
      vm.stack.push(vm.stack[vm.stack.length - 1])
    },
    function (vm) {
      debug(vm, 88, 'false')
      vm.stack.push(false)
    },
    function (vm) {
      var ij = vm.getInstruction2()
      var ik = I[ij]
      if (typeof ik !== 'undefined') {
        debug(vm, 89, `input (cache-hit) = ${ik}`)
        vm.stack[vm.stack.length - 1] = ik
        return
      }
      var il = vm.stack.pop()
      var im = H[ij]
      var io = parseProgram(im)
      var ip = parseProgram(il)
      var iq = (io[0] + ip[0]) & 255
      var ir = ''
      for (var is = 1; is < io.length; ++is) {
        ir += String.fromCharCode(ip[is] ^ io[is] ^ iq)
      }
      I[ij] = ir
      debug(vm, 89, `input (cache-miss) = ${ir}`)
      vm.stack.push(ir)
    },
    function (vm) {
      var iu = vm.stack.pop()
      var iv = vm.stack.pop()
      debug(vm, 90, `jump-stack M=${iu} G=${iv}`)
      vm.M = iu
      vm.G = iv
    },
    function (vm) {
      debug(vm, 91, 'return ???')
      globalReturnValue = HALT
    },
    function (vm) {
      var popped = vm.stack.pop()
      debug(vm, 92, `return ${fmt(popped)};`)
      globalReturnValue = popped
    },
    function (vm) {
      var iz = vm.stack.pop()
      var iA = vm.stack.pop()
      debug(vm, 93, `${iA} ^ ${iz} = ${iA ^ iz}`)
      vm.stack.push(iA ^ iz)
    },
    function (vm) {
      debug(vm, 94, `{}`)
      vm.stack.push({})
    }
  ]
  function run_subroutine (iC, registers) {
    var iE = K[iC]
    return run_program(iE.a, iE.u, registers, iE.J, iE.V, iE.Z, iE.p, iE.C)
  }
  var globalReturnValue = CONTINUE
  var program = parseProgram(require('./program'))
  function run_program (iG, iH, oldRegisters, iJ, iK, iL, iM, iN) {
    var registers = new Registers()
    var iS = iM !== undefined
    for (var index = 0; index < iK.length; ++index) {
      registers.data[iK[index]] = oldRegisters.data[iK[index]]
    }
    var iR = initiate(iG, iH, registers, iJ, iL, iS, iM)
    if (iN !== undefined) {
      registers.clear(iN)
      registers.set(iN, iR)
    }
    return iR
  }
  function initiate (iU, iV, registers, iX, iY, iZ, ja) {
    var jb = iY.length
    return function initiateInnerr () {
      var registers2 = registers.clone()
      var vm = new VM(iU, iV, registers2, this)
      var jg = Math.min(arguments.length, jb)
      if (iZ) {
        registers2.clear(ja)
        registers2.set(ja, arguments)
      }
      for (var je = 0; je < iX.length; ++je) {
        registers2.clear(iX[je])
      }
      for (var je = 0; je < jg; ++je) {
        registers2.set(iY[je], arguments[je])
      }
      for (var je = jg; je < jb; ++je) {
        registers2.set(iY[je], undefined)
      }
      return initiateInner(vm)
    }
  }
  function initiateInner (vm) {
    for (;;) {
      if (globalReturnValue !== CONTINUE) {
        var returnValue = globalReturnValue
        globalReturnValue = CONTINUE
        return returnValue
      }
      var unknownB = vm.P()
      if (vm.stack3.length === 0) {
        commands[unknownB](vm)
      } else {
        tryToRun(commands[unknownB], vm)
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
