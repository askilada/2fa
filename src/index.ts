import * as base32 from 'hi-base32'

const crypto = require('crypto')



const validCode = "140184"

const base32Alphabet = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
    e: 4,
    f: 5,
    g: 6,
    h: 7,
    i: 8,
    j: 9,
    k: 10,
    l: 11,
    m: 12,
    n: 13,
    o: 14,
    p: 15,
    q: 16,
    r: 17,
    s: 18,
    t: 19,
    u: 20,
    v: 21,
    w: 22,
    x: 23,
    y: 24,
    z: 25,
    '2': 26,
    '3': 27,
    '4': 28,
    '5': 29,
    '6': 30,
    '7': 31,

}
function decodeToBuffer(alphabet, string: string) {
    const chars = string.split("")
    const newChars = chars.map(char => {
        return alphabet[char]
    })
    console.log("New chars", newChars)
    return Buffer.from(newChars)
}


const key = "witq5hmiicwkx5ye7cskgwvx".toUpperCase() // Random Base32 Key
const keyBuffer = Buffer.from(base32.decode.asBytes(key))
debugger
console.log("Key:", keyBuffer)


const counter = Buffer.from("0000000000000000", 'hex')
console.log("Counter", counter)

const hmac = crypto.createHmac('sha1', keyBuffer)
console.log("HMAC CREATED")

hmac.update(counter)

const HS = hmac.digest()

console.log(HS)
console.log(HS.length)

console.log("")
const offsetByte = HS.slice(19, 20)

const offsetBit = offsetByte[0] & 0xf
console.log("Offset byte", offsetByte)
console.log("Offset bit", offsetBit)

const binCode = (HS[offsetBit] & 0x7f) << 24 |
    (HS[offsetBit + 1] & 0xff) << 16 |
    (HS[offsetBit + 2] & 0xff) << 8 |
    (HS[offsetBit + 3] & 0xff)

const BC = Buffer.alloc(4)
BC[0] = HS[offsetBit] & 0x7f
BC[1] = HS[offsetBit + 1] & 0xff
BC[2] = HS[offsetBit + 2] & 0xff
BC[3] = HS[offsetBit + 3] & 0xff




console.log("Bin code", binCode)
console.log("Bin code length", Buffer.from(binCode.toString(16), 'hex'))
console.log("Bin code bin", binCode.toString(2))
console.log("Bin code bin length", binCode.toString(2).length)

const BChex = BC.toString('hex')
const code = parseInt(BChex, 16) % Math.pow(10, 6)
console.log("Code", code)
console.log("Valid code", validCode)