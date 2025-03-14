/**
 * @typedef {import('retext-anti-woke').Options} Options
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {retext} from 'retext'
import retextAntiWoke from 'retext-anti-woke'
import {compareMessage} from 'vfile-sort'

test('retext-anti-woke', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('retext-anti-woke')).sort(), [
      'default'
    ])
  })

  await t.test('should support prototypal words', async function () {
    assert.deepEqual(await process('toString and constructor.'), [])
  })

  // Test for rule 1: person with a disability
  await t.test('should flag "Person with a disability"', async function () {
    const text = 'Person with a disability walks'
    const term = 'Person with a disability'
    const alternatives = [
      'Cripple',
      'Handicapped',
      'Invalid',
      'Gimpy',
      'Broken'
    ]
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 2: person with developmental disabilities
  await t.test(
    'should flag "Person with developmental disabilities"',
    async function () {
      const text = 'Person with developmental disabilities learns'
      const term = 'Person with developmental disabilities'
      const alternatives = ['Retard', 'Slow', 'Simple', 'Backward', 'Dull']
      const message = createMessage(term, alternatives)
      assert.deepEqual(await process(text), [message])
    }
  )

  // Test for rule 3: person with mental illness
  await t.test('should flag "Person with mental illness"', async function () {
    const text = 'Person with mental illness struggles'
    const term = 'Person with mental illness'
    const alternatives = [
      'Psycho',
      'Crazy',
      'Lunatic',
      'Madman',
      'Nutcase',
      'Whacko'
    ]
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 4: person with an intellectual disability
  await t.test(
    'should flag "Person with an intellectual disability"',
    async function () {
      const text = 'Person with an intellectual disability thinks'
      const term = 'Person with an intellectual disability'
      const alternatives = ['Moron', 'Idiot', 'Imbecile', 'Dimwit', 'Thick']
      const message = createMessage(term, alternatives)
      assert.deepEqual(await process(text), [message])
    }
  )

  // Test for rule 5: person with a limp
  await t.test('should flag "Person with a limp"', async function () {
    const text = 'Person with a limp hobbles'
    const term = 'Person with a limp'
    const alternatives = ['Lame', 'Gimp', 'Hobbly', 'Crook-leg']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 6: person with a speech impairment
  await t.test(
    'should flag "Person with a speech impairment"',
    async function () {
      const text = 'Person with a speech impairment speaks'
      const term = 'Person with a speech impairment'
      const alternatives = ['Dumb', 'Mute', 'Stutterer', 'Mumbler']
      const message = createMessage(term, alternatives)
      assert.deepEqual(await process(text), [message])
    }
  )

  // Test for rule 7: person with a learning disability
  await t.test(
    'should flag "Person with a learning disability"',
    async function () {
      const text = 'Person with a learning disability studies'
      const term = 'Person with a learning disability'
      const alternatives = ['Slow learner', 'Dull', 'Backward']
      const message = createMessage(term, alternatives)
      assert.deepEqual(await process(text), [message])
    }
  )

  // Test for rule 8: neurodiverse
  await t.test('should flag "Neurodiverse"', async function () {
    const text = 'Neurodiverse individual thinks differently'
    const term = 'Neurodiverse'
    const alternatives = ['Weird', 'Odd', 'Eccentric']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 9: hearing impaired
  await t.test('should flag "Hearing impaired"', async function () {
    const text = 'Hearing impaired person listens'
    const term = 'Hearing impaired'
    const alternatives = ['Deaf', 'Hard of hearing']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 10: visually impaired
  await t.test('should flag "Visually impaired"', async function () {
    const text = 'Visually impaired person reads'
    const term = 'Visually impaired'
    const alternatives = ['Blind', 'Sightless']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 11: mobility challenged
  await t.test('should flag "Mobility challenged"', async function () {
    const text = 'Mobility challenged individual moves'
    const term = 'Mobility challenged'
    const alternatives = ['Stiff', 'Clunky', 'Immobile']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 12: cognitively impaired
  await t.test('should flag "Cognitively impaired"', async function () {
    const text = 'Cognitively impaired person thinks'
    const term = 'Cognitively impaired'
    const alternatives = ['Dimwit', 'Thick', 'Slow-witted']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Test for rule 13: emotionally disturbed
  await t.test('should flag "Emotionally disturbed"', async function () {
    const text = 'Emotionally disturbed child cries'
    const term = 'Emotionally disturbed'
    const alternatives = ['Unhinged', 'Wreck', 'Basket case']
    const message = createMessage(term, alternatives)
    assert.deepEqual(await process(text), [message])
  })

  // Negative tests: should not flag un-PC terms
  await t.test('should not flag "cripple"', async function () {
    assert.deepEqual(await process('Cripple walks'), [])
  })

  await t.test('should not flag "retard"', async function () {
    assert.deepEqual(await process('Retard learns'), [])
  })

  await t.test('should not flag "psycho"', async function () {
    assert.deepEqual(await process('Psycho rants'), [])
  })

  await t.test('should not flag "moron"', async function () {
    assert.deepEqual(await process('Moron thinks'), [])
  })

  await t.test('should not flag "lame"', async function () {
    assert.deepEqual(await process('Lame hobbles'), [])
  })

  await t.test('should not flag "dumb"', async function () {
    assert.deepEqual(await process('Dumb speaks'), [])
  })

  await t.test('should not flag "slow learner"', async function () {
    assert.deepEqual(await process('Slow learner studies'), [])
  })

  await t.test('should not flag "weird"', async function () {
    assert.deepEqual(await process('Weird thinks differently'), [])
  })

  await t.test('should not flag "deaf"', async function () {
    assert.deepEqual(await process('Deaf listens'), [])
  })

  await t.test('should not flag "blind"', async function () {
    assert.deepEqual(await process('Blind reads'), [])
  })

  await t.test('should not flag "stiff"', async function () {
    assert.deepEqual(await process('Stiff moves'), [])
  })

  await t.test('should not flag "dimwit"', async function () {
    assert.deepEqual(await process('Dimwit thinks'), [])
  })

  await t.test('should not flag "unhinged"', async function () {
    assert.deepEqual(await process('Unhinged cries'), [])
  })
})

/**
 * Generates a message for flagging a term (assumed at 1:1) with alternatives.
 *
 * @param {string} term - The term to flag.
 * @param {string[]} alternatives - Suggested alternatives.
 * @returns {string} The formatted message.
 */
function createMessage(term, alternatives) {
  const end = term.length + 1
  const formattedAlts = alternatives.map((alt) => `\`${alt}\``)
  return `1:1-1:${end}: Unexpected potentially woke use of \`${term}\`, in some cases ${formattedAlts.join(', ')} may be better`
}

/**
 * Helper to get messages from `retextEquality`.
 *
 * @param {string} value
 *   Document to process.
 * @param {Options | undefined} [options]
 *   Configuration (optional).
 * @returns {Promise<ReadonlyArray<string>>}
 *   Sorted and serialized messages.
 */
async function process(value, options) {
  const file = await retext().use(retextAntiWoke, options).process(value)
  return [...file.messages].sort(compareMessage).map(String)
}
