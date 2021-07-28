'use strict'

const multicodec = require('multicodec')
const { CID } = require('multiformats')
const LegacyCID = require('cids')

/**
 * @template T
 * @typedef {import('interface-ipld-format').Format<T>} IPLDFormat<T>
 */

/**
 * @template Code
 * @template T
 * @typedef {import('multiformats/codecs/interface').BlockCodec<Code, T>} BlockCodec<Code, T>
 */

/**
 * Converts an IPLD Format into a BlockCodec from the multiformats module
 *
 * @template Code
 * @template T
 *
 * @param {IPLDFormat<T>} format
 * @returns {BlockCodec<Code, T>}
 */
function convert (format) {
  return {
    name: multicodec.getNameFromCode(format.codec),
    // @ts-ignore format.codec is a CodecCodec, we need a number
    code: format.codec,
    encode: (obj) => format.util.serialize(cidsToLegacyCids(obj)),
    decode: (buf) => legacyCidsToCids(format.util.deserialize(buf))
  }
}

/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function cidsToLegacyCids (obj) {
  return replaceCids(obj, obj => obj instanceof CID, (obj) => new LegacyCID(obj.bytes))
}

/**
 * @template T
 * @param {T} obj
 * @returns {T}
 */
function legacyCidsToCids (obj) {
  return replaceCids(obj, obj => obj instanceof LegacyCID, (obj) => CID.decode(obj.bytes))
}

/**
 * @param {any} obj
 * @param {(obj: any) => boolean} test
 * @param {(obj: CID | LegacyCID) => LegacyCID | CID} convertCid
 */
function replaceCids (obj, test, convertCid) {
  if (test(obj)) {
    return convertCid(obj)
  }

  // skip these types
  if (obj instanceof String ||
      typeof obj === 'string' ||
      typeof obj === 'function' ||
      typeof obj === 'number' ||
      isFinite(obj) ||
      Number.isNaN(obj) ||
      obj === Infinity ||
      obj === -Infinity ||
      obj === true ||
      obj == null ||
      obj instanceof ArrayBuffer ||
      ArrayBuffer.isView(obj)) {
    return obj
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = replaceCids(obj[i], test, convertCid)
    }
  } else {
    for (const key in obj) {
      try {
        obj[key] = replaceCids(obj[key], test, convertCid)
      } catch {}
    }
  }

  return obj
}

module.exports = {
  convert
}
