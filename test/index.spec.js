/* eslint-env mocha */
'use strict'

const { expect } = require('aegir/utils/chai')
const { convert } = require('../')
const rawFormat = require('ipld-raw')
const dagPbFormat = require('ipld-dag-pb')
const dagCborFormat = require('ipld-dag-cbor')
const { CID } = require('multiformats/cid')
const LegacyCID = require('cids')
const encoder = new TextEncoder()

/**
 * @template T
 * @typedef {import('interface-ipld-format').Format<T>} IPLDFormat<T>
 */

/**
 * @template Code
 * @template T
 * @typedef {import('multiformats/codecs/interface').BlockCodec<Code, T>} BlockCodec<Code, T>
 */

describe('ipld-format-to-blockcodec', () => {
  /** @type {BlockCodec<0x55, Uint8Array>} */
  let raw
  /** @type {BlockCodec<0x70, any>} */
  let dagPb
  /** @type {BlockCodec<0x71, any>} */
  let dagCbor

  before(async () => {
    raw = convert(rawFormat)
    dagPb = convert(dagPbFormat)
    dagCbor = convert(dagCborFormat)
  })

  it('encode/decode raw', () => {
    const buff = raw.encode(encoder.encode('test'))
    expect(buff).to.equalBytes(encoder.encode('test'))
    expect(raw.decode(buff)).to.equalBytes(encoder.encode('test'))
  })

  it('encode/decode dag-pb', () => {
    const buff = dagPb.encode({ Data: Uint8Array.from([0, 1, 2]), Links: [] })
    expect(buff).to.equalBytes(dagPbFormat.util.serialize(new dagPbFormat.DAGNode(Uint8Array.from([0, 1, 2]))))
    expect(dagPb.decode(buff)).to.deep.equal({ Data: Uint8Array.from([0, 1, 2]), Links: [] })
  })

  it('encode/decode dag-cbor', () => {
    const buff = dagCbor.encode({ hello: 'world' })
    expect(buff).to.equalBytes(dagCborFormat.util.serialize({ hello: 'world' }))
    expect(dagCbor.decode(buff)).to.deep.equal({ hello: 'world' })
  })

  it('replaces CIDs', () => {
    const buff = dagCbor.encode({ hello: CID.parse('QmUYa6T3RroiVBKf1bRmnZXduP8H88cGQtifYBRtPyxWLq') })
    expect(buff).to.equalBytes(dagCborFormat.util.serialize({ hello: new LegacyCID('QmUYa6T3RroiVBKf1bRmnZXduP8H88cGQtifYBRtPyxWLq') }))
    expect(dagCbor.decode(buff)).to.deep.equal({ hello: CID.parse('QmUYa6T3RroiVBKf1bRmnZXduP8H88cGQtifYBRtPyxWLq') })
  })
})
