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
    assert.deepEqual(await process('Person with a disability walks'), [
      '1:1-1:25: Unexpected potentially woke use of `Person with a disability`, in some cases `Cripple`, `Handicapped`, `Invalid`, `Gimpy`, `Broken` may be better',
      '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better'
    ])
  })

  // Test for rule 2: person with developmental disabilities
  await t.test(
    'should flag "Person with developmental disabilities"',
    async function () {
      assert.deepEqual(
        await process('Person with developmental disabilities learns'),
        [
          '1:1-1:39: Unexpected potentially woke use of `Person with developmental disabilities`, in some cases `Retard`, `Slow`, `Simple`, `Backward`, `Dull` may be better',
          '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better'
        ]
      )
    }
  )

  // Test for rule 3: person with mental illness
  await t.test('should flag "Person with mental illness"', async function () {
    assert.deepEqual(await process('Person with mental illness'), [
      '1:1-1:27: Unexpected potentially woke use of `Person with mental illness`, in some cases `Psycho`, `Crazy`, `Lunatic`, `Madman`, `Nutcase`, `Whacko` may be better',
      '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better'
    ])
  })

  // Test for rule 4: person with an intellectual disability
  await t.test(
    'should flag "Person with an intellectual disability"',
    async function () {
      assert.deepEqual(
        await process('Person with an intellectual disability thinks'),
        [
          '1:1-1:39: Unexpected potentially woke use of `Person with an intellectual disability`, in some cases `Moron`, `Idiot`, `Imbecile`, `Dimwit`, `Thick` may be better',
          '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better'
        ]
      )
    }
  )

  // Test for rule 5: person with a limp
  await t.test('should flag "Person with a limp"', async function () {
    assert.deepEqual(await process('Person with a limp hobbles'), [
      '1:1-1:19: Unexpected potentially woke use of `Person with a limp`, in some cases `Lame`, `Gimp`, `Hobbly`, `Crook-leg` may be better',
      '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better'
    ])
  })

  // Test for rule 6: person with a speech impairment
  await t.test(
    'should flag "Person with a speech impairment"',
    async function () {
      assert.deepEqual(
        await process('Person with a speech impairment speaks'),
        [
          '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better',
          '1:1-1:32: Unexpected potentially woke use of `Person with a speech impairment`, in some cases `Dumb`, `Mute`, `Stutterer`, `Mumbler` may be better'
        ]
      )
    }
  )

  // Test for rule 7: person with a learning disability
  await t.test(
    'should flag "Person with a learning disability"',
    async function () {
      assert.deepEqual(
        await process('Person with a learning disability studies'),
        [
          '1:1-1:34: Unexpected potentially woke use of `Person with a learning disability`, in some cases `Slow learner`, `Dull`, `Backward` may be better',
          '1:1-1:7: Unexpected potentially woke use of `Person`, in some cases `Woman`, `Gal`, `Lady`, `Babe`, `Bimbo`, `Chick`, `Guy`, `Lad`, `Fellow`, `Dude`, `Bro`, `Gentleman` may be better'
        ]
      )
    }
  )

  // Test for rule 8: neurodiverse
  await t.test('should flag "Neurodiverse"', async function () {
    assert.deepEqual(
      await process('Neurodiverse individual thinks differently'),
      [
        '1:1-1:13: Unexpected potentially woke use of `Neurodiverse`, in some cases `Weird`, `Odd`, `Eccentric` may be better',
        '1:14-1:24: Unexpected potentially woke use of `individual`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
      ]
    )
  })

  // Test for rule 9: hearing impaired
  await t.test('should flag "Hearing impaired"', async function () {
    assert.deepEqual(await process('Hearing impaired person listens'), [
      '1:1-1:17: Unexpected potentially woke use of `Hearing impaired`, in some cases `Deaf`, `Hard of hearing` may be better',
      '1:18-1:24: Unexpected potentially woke use of `person`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
    ])
  })

  // Test for rule 10: visually impaired
  await t.test('should flag "Visually impaired"', async function () {
    assert.deepEqual(await process('Visually impaired person reads'), [
      '1:1-1:18: Unexpected potentially woke use of `Visually impaired`, in some cases `Blind`, `Sightless` may be better',
      '1:19-1:25: Unexpected potentially woke use of `person`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
    ])
  })

  // Test for rule 11: mobility challenged
  await t.test('should flag "Mobility challenged"', async function () {
    assert.deepEqual(await process('Mobility challenged individual moves'), [
      '1:1-1:20: Unexpected potentially woke use of `Mobility challenged`, in some cases `Stiff`, `Clunky`, `Immobile` may be better',
      '1:21-1:31: Unexpected potentially woke use of `individual`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
    ])
  })

  // Test for rule 12: cognitively impaired
  await t.test('should flag "Cognitively impaired"', async function () {
    assert.deepEqual(await process('Cognitively impaired person thinks'), [
      '1:1-1:21: Unexpected potentially woke use of `Cognitively impaired`, in some cases `Dimwit`, `Thick`, `Slow-witted` may be better',
      '1:22-1:28: Unexpected potentially woke use of `person`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
    ])
  })

  // Test for rule 13: emotionally disturbed
  await t.test('should flag "Emotionally disturbed"', async function () {
    assert.deepEqual(await process('Emotionally disturbed child cries'), [
      '1:1-1:22: Unexpected potentially woke use of `Emotionally disturbed`, in some cases `Unhinged`, `Wreck`, `Basket case` may be better',
      '1:23-1:28: Unexpected potentially woke use of `child`, in some cases `daughter`, `son` may be better'
    ])
  })

  await t.test('should flag "Safe spaces"', async function () {
    assert.deepEqual(await process('Safe spaces help students'), [
      '1:1-1:12: Unexpected potentially woke use of `Safe spaces`, try not to use it'
    ])
  })

  await t.test('should flag "Trigger warnings"', async function () {
    assert.deepEqual(await process('Trigger warnings protect readers'), [
      '1:1-1:17: Unexpected potentially woke use of `Trigger warnings`, try not to use it'
    ])
  })

  await t.test('should flag "Inclusive language"', async function () {
    assert.deepEqual(await process('Inclusive language fosters unity'), [
      '1:1-1:19: Unexpected potentially woke use of `Inclusive language`, try not to use it'
    ])
  })

  await t.test('should flag "Diversity training"', async function () {
    assert.deepEqual(await process('Diversity training improves teams'), [
      '1:1-1:19: Unexpected potentially woke use of `Diversity training`, try not to use it'
    ])
  })

  await t.test('should flag "Microaggressions"', async function () {
    assert.deepEqual(await process('Microaggressions hurt feelings'), [
      '1:1-1:17: Unexpected potentially woke use of `Microaggressions`, try not to use it'
    ])
  })

  // Tests for gender.yml rules
  await t.test('should flag "theirself" as woke', async function () {
    assert.deepEqual(await process('Theirself bike is fast'), [
      '1:1-1:10: Unexpected potentially woke use of `Theirself`, in some cases `Herself`, `Himself` may be better'
    ])
  })

  await t.test('should flag "two-income family" as woke', async function () {
    assert.deepEqual(await process("They're a two-income family"), [
      '1:11-1:28: Unexpected potentially woke use of `two-income family`, in some cases `working mother`, `working wife` may be better'
    ])
  })

  await t.test('should flag "person" as woke', async function () {
    assert.deepEqual(await process('That person rides well'), [
      '1:6-1:12: Unexpected potentially woke use of `person`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
    ])
  })

  await t.test('should flag "chair" as woke', async function () {
    assert.deepEqual(await process('The chair called a meeting'), [
      '1:5-1:10: Unexpected potentially woke use of `chair`, in some cases `chairwoman`, `chairman` may be better'
    ])
  })

  await t.test('should not flag "his" with binary false', async function () {
    assert.deepEqual(await process('His bike is fast', {binary: false}), [])
  })

  await t.test('should not flag "her" with binary false', async function () {
    assert.deepEqual(await process('Her bike is fast', {binary: false}), [])
  })

  await t.test('should allow "his or her" with binary true', async function () {
    assert.deepEqual(
      await process('His or her bike is fast', {binary: true}),
      []
    )
  })

  await t.test(
    'should flag "theirself" even with binary true',
    async function () {
      assert.deepEqual(
        await process('Theirself bike is fast', {binary: true}),
        [
          '1:1-1:10: Unexpected potentially woke use of `Theirself`, in some cases `Herself`, `Himself` may be better'
        ]
      )
    }
  )

  // Tests for lgbtq.yml rules
  await t.test('should flag "transgender" as woke', async function () {
    assert.deepEqual(await process('Transgender rights'), [
      '1:1-1:12: Unexpected potentially woke use of `Transgender`, in some cases `Tranny` may be better'
    ])
  })

  await t.test('should flag "gay" as woke', async function () {
    assert.deepEqual(await process('Gay rights matter'), [
      '1:1-1:4: Unexpected potentially woke use of `Gay`, in some cases `Fag`, `Faggot`, `Dyke`, `Homo`, `Sodomite` may be better'
    ])
  })

  await t.test('should flag "homosexual" as woke', async function () {
    assert.deepEqual(await process('Homosexual marriage'), [
      '1:1-1:11: Unexpected potentially woke use of `Homosexual`, in some cases `Homo` may be better'
    ])
  })

  await t.test('should flag "transgender person" as woke', async function () {
    assert.deepEqual(await process('Transgender person speaks'), [
      '1:1-1:12: Unexpected potentially woke use of `Transgender`, in some cases `Tranny` may be better',
      '1:1-1:19: Unexpected potentially woke use of `Transgender person`, in some cases `Shemale`, `She male`, `Heshe`, `Shehe` may be better',
      '1:13-1:19: Unexpected potentially woke use of `person`, in some cases `woman`, `gal`, `lady`, `babe`, `bimbo`, `chick`, `guy`, `lad`, `fellow`, `dude`, `bro`, `gentleman` may be better'
    ])
  })

  await t.test('should not flag "tranny"', async function () {
    assert.deepEqual(await process('Tranny rights'), [])
  })

  await t.test('should not flag "fag"', async function () {
    assert.deepEqual(await process('Fag protests'), [])
  })

  await t.test('should not flag "homo"', async function () {
    assert.deepEqual(await process('Homo marriage'), [])
  })

  await t.test('should not flag "shemale"', async function () {
    assert.deepEqual(await process('Shemale speaks'), [])
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

  await t.test('should not flag "chairwoman"', async function () {
    assert.deepEqual(await process('Chairwoman leads'), [])
  })

  await t.test('should not flag "chairman"', async function () {
    assert.deepEqual(await process('Chairman decides'), [])
  })
})

/**
 * Helper to get messages from `retextAntiWoke`.
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
