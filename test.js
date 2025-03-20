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
      '1:5-1:10: Unexpected potentially woke use of `chair`, in some cases `chairwoman`, `chairman` may be better',
      '1:20-1:27: Unexpected potentially woke use of `meeting`, in some cases `pow wow`, `powwow` may be better'
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

  // Tests for misc.yml rules
  await t.test('should flag "keep an eye on things"', async function () {
    assert.deepEqual(await process('Keep an eye on things tonight'), [
      '1:1-1:22: Unexpected potentially woke use of `Keep an eye on things`, in some cases `Man the fort` may be better'
    ])
  })

  await t.test('should flag "go for it"', async function () {
    assert.deepEqual(await process('Go for it now'), [
      '1:1-1:10: Unexpected potentially woke use of `Go for it`, in some cases `Pull the trigger` may be better'
    ])
  })

  await t.test('should not flag "man the fort"', async function () {
    assert.deepEqual(await process('Man the fort tonight'), [])
  })

  await t.test('should not flag "pull the trigger"', async function () {
    assert.deepEqual(await process('Pull the trigger now'), [])
  })

  // Tests for press.yml rules
  await t.test('should flag "muslim" as woke', async function () {
    assert.deepEqual(await process('Muslim protests escalate'), [
      '1:1-1:7: Unexpected potentially woke use of `Muslim`, in some cases `Islamist`, `Jihadist` may be better'
    ])
  })

  await t.test('should flag "muslims" as woke', async function () {
    assert.deepEqual(await process('Muslims demand change'), [
      '1:1-1:8: Unexpected potentially woke use of `Muslims`, in some cases `Islamists`, `Jihadists` may be better'
    ])
  })

  await t.test('should flag "news" as woke', async function () {
    assert.deepEqual(await process('News spreads fast'), [
      '1:1-1:5: Unexpected potentially woke use of `News`, in some cases `Lies`, `Bullshit`, `Fake news` may be better'
    ])
  })

  await t.test('should flag "mainstream media" as woke', async function () {
    assert.deepEqual(await process('Mainstream media lies'), [
      '1:1-1:17: Unexpected potentially woke use of `Mainstream media`, in some cases `Propaganda`, `State media`, `Corporate propaganda` may be better'
    ])
  })

  await t.test('should flag "hate speech" as woke', async function () {
    assert.deepEqual(await process('Hate speech banned'), [
      '1:1-1:12: Unexpected potentially woke use of `Hate speech`, in some cases `Truth`, `Facts` may be better'
    ])
  })

  await t.test('should not flag "islamist"', async function () {
    assert.deepEqual(await process('Islamist uprising'), [])
  })

  await t.test('should not flag "jihadist"', async function () {
    assert.deepEqual(await process('Jihadist attacks'), [])
  })

  await t.test('should not flag "lies"', async function () {
    assert.deepEqual(await process('Lies spread fast'), [])
  })

  await t.test('should not flag "propaganda"', async function () {
    assert.deepEqual(await process('Propaganda influences'), [])
  })

  await t.test('should not flag "truth"', async function () {
    assert.deepEqual(await process('Truth prevails'), [])
  })

  // Tests for race.yml rules
  await t.test('should flag "blocklist" as woke', async function () {
    assert.deepEqual(await process('Blocklist users'), [
      '1:1-1:10: Unexpected potentially woke use of `Blocklist`, in some cases `Blacklist`, `Black list` may be better'
    ])
  })

  await t.test('should flag "blocklists" as woke', async function () {
    assert.deepEqual(await process('Blocklists manage access'), [
      '1:1-1:11: Unexpected potentially woke use of `Blocklists`, in some cases `Blacklists`, `Black lists` may be better'
    ])
  })

  await t.test('should flag "passlist" as woke', async function () {
    assert.deepEqual(await process('Passlist allows entry'), [
      '1:1-1:9: Unexpected potentially woke use of `Passlist`, in some cases `Whitelist`, `White list` may be better'
    ])
  })

  await t.test('should flag "passlists" as woke', async function () {
    assert.deepEqual(await process('Passlists control access'), [
      '1:1-1:10: Unexpected potentially woke use of `Passlists`, in some cases `Whitelists`, `White lists` may be better'
    ])
  })

  await t.test('should flag "systemic racism" as woke', async function () {
    assert.deepEqual(await process('Systemic racism persists'), [
      '1:1-1:16: Unexpected potentially woke use of `Systemic racism`, in some cases `Racism` may be better'
    ])
  })

  await t.test(
    'should flag "cultural appropriation" as woke',
    async function () {
      assert.deepEqual(await process('Cultural appropriation debate'), [
        '1:1-1:23: Unexpected potentially woke use of `Cultural appropriation`, in some cases `Cultural appreciation`, `Cultural exchange` may be better'
      ])
    }
  )

  await t.test('should not flag "blacklist"', async function () {
    assert.deepEqual(await process('Blacklist restricts access'), [])
  })

  await t.test('should not flag "blacklists"', async function () {
    assert.deepEqual(await process('Blacklists control users'), [])
  })

  await t.test('should not flag "whitelist"', async function () {
    assert.deepEqual(await process('Whitelist permits entry'), [])
  })

  await t.test('should not flag "whitelists"', async function () {
    assert.deepEqual(await process('Whitelists manage access'), [])
  })

  await t.test('should not flag "racism"', async function () {
    assert.deepEqual(await process('Racism exists'), [])
  })

  await t.test('should not flag "culture"', async function () {
    assert.deepEqual(await process('Culture shapes identity'), [])
  })

  // Tests for slogans.yml rules
  await t.test('should flag "improve" as woke', async function () {
    assert.deepEqual(await process('Improve the system'), [
      '1:1-1:8: Unexpected potentially woke use of `Improve`, in some cases `Make _____ great again` may be better'
    ])
  })

  await t.test(
    'should flag "Diversity is our strength" as woke',
    async function () {
      assert.deepEqual(await process('Diversity is our strength wins'), [
        '1:1-1:26: Unexpected potentially woke use of `Diversity is our strength`, in some cases `Merit is our strength` may be better'
      ])
    }
  )

  await t.test('should flag "Smash the patriarchy" as woke', async function () {
    assert.deepEqual(await process('Smash the patriarchy now'), [
      '1:1-1:21: Unexpected potentially woke use of `Smash the patriarchy`, in some cases `Men rule` may be better'
    ])
  })

  await t.test('should flag "Believe women" as woke', async function () {
    assert.deepEqual(await process('Believe women always'), [
      '1:1-1:14: Unexpected potentially woke use of `Believe women`, in some cases `Judge the facts` may be better'
    ])
  })

  await t.test('should flag "Hope and change" as woke', async function () {
    assert.deepEqual(await process('Hope and change prevails'), [
      '1:1-1:16: Unexpected potentially woke use of `Hope and change`, in some cases `Lies and destruction` may be better'
    ])
  })

  await t.test('should not flag "make america great again"', async function () {
    assert.deepEqual(await process('Make America great again works'), [])
  })

  await t.test('should not flag "merit is our strength"', async function () {
    assert.deepEqual(await process('Merit is our strength prevails'), [])
  })

  await t.test('should not flag "men rule"', async function () {
    assert.deepEqual(await process('Men rule the world'), [])
  })

  await t.test('should not flag "judge the facts"', async function () {
    assert.deepEqual(await process('Judge the facts fairly'), [])
  })

  await t.test('should not flag "reality bites"', async function () {
    assert.deepEqual(await process('Reality bites hard'), [])
  })

  await t.test('should not flag "stand alone"', async function () {
    assert.deepEqual(await process('Stand alone strong'), [])
  })

  // Tests for suicide.yml rules
  await t.test('should flag "died by suicide" as woke', async function () {
    assert.deepEqual(await process('Died by suicide yesterday'), [
      '1:1-1:16: Unexpected potentially woke use of `Died by suicide`, in some cases `Committed suicide`, `Completed suicide` may be better'
    ])
  })

  await t.test('should flag "die by suicide" as woke', async function () {
    assert.deepEqual(await process('Might die by suicide soon'), [
      '1:7-1:21: Unexpected potentially woke use of `die by suicide`, in some cases `commit suicide`, `complete suicide`, `successful suicide` may be better'
    ])
  })

  await t.test('should flag "rise in suicides" as woke', async function () {
    assert.deepEqual(await process('Rise in suicides reported'), [
      '1:1-1:17: Unexpected potentially woke use of `Rise in suicides`, in some cases `Suicide epidemic`, `Epidemic of suicides`, `Suicide pact` may be better'
    ])
  })

  await t.test('should flag "suicide attempt" as woke', async function () {
    assert.deepEqual(await process('Suicide attempt failed'), [
      '1:1-1:16: Unexpected potentially woke use of `Suicide attempt`, in some cases `Failed suicide`, `Failed attempt`, `Suicide failure` may be better'
    ])
  })

  await t.test(
    'should flag "a note from the deceased" as woke',
    async function () {
      assert.deepEqual(await process('A note from the deceased found'), [
        '1:1-1:25: Unexpected potentially woke use of `A note from the deceased`, in some cases `Suicide note` may be better'
      ])
    }
  )

  await t.test('should flag "the app froze" as woke', async function () {
    assert.deepEqual(await process('The app froze suddenly'), [
      '1:1-1:14: Unexpected potentially woke use of `The app froze`, in some cases `Hang`, `Hanged` may be better'
    ])
  })

  await t.test('should not flag "committed suicide"', async function () {
    assert.deepEqual(await process('Committed suicide last night'), [])
  })

  await t.test('should not flag "commit suicide"', async function () {
    assert.deepEqual(await process('Might commit suicide later'), [])
  })

  await t.test('should not flag "suicide epidemic"', async function () {
    assert.deepEqual(await process('Suicide epidemic grows'), [])
  })

  await t.test('should not flag "failed suicide"', async function () {
    assert.deepEqual(await process('Failed suicide'), [])
  })

  await t.test('should not flag "suicide note"', async function () {
    assert.deepEqual(await process('Suicide note discovered'), [])
  })

  await t.test('should not flag "hang"', async function () {
    assert.deepEqual(await process('App might hang soon'), [])
  })

  // Tests for communism.yml rules
  await t.test('should flag "proletariat" as woke', async function () {
    assert.deepEqual(await process('Proletariat rises'), [
      '1:1-1:12: Unexpected potentially woke use of `Proletariat`, in some cases `Poor`, `Poors` may be better'
    ])
  })

  await t.test('should flag "bourgeoisie" as woke', async function () {
    assert.deepEqual(await process('Bourgeoisie oppresses'), [
      '1:1-1:12: Unexpected potentially woke use of `Bourgeoisie`, in some cases `Rich`, `Bosses` may be better'
    ])
  })

  await t.test('should flag "class struggle" as woke', async function () {
    assert.deepEqual(await process('Class struggle intensifies'), [
      '1:1-1:15: Unexpected potentially woke use of `Class struggle`, in some cases `Competition` may be better'
    ])
  })

  await t.test('should flag "means of production" as woke', async function () {
    assert.deepEqual(await process('Means of production seized'), [
      '1:1-1:20: Unexpected potentially woke use of `Means of production`, in some cases `Factories`, `Businesses` may be better'
    ])
  })

  await t.test(
    'should flag "dialectical materialism" as woke',
    async function () {
      assert.deepEqual(await process('Dialectical materialism explains'), [
        '1:1-1:24: Unexpected potentially woke use of `Dialectical materialism`, in some cases `Reality` may be better'
      ])
    }
  )

  await t.test('should flag "collectivization" as woke', async function () {
    assert.deepEqual(await process('Collectivization enforced'), [
      '1:1-1:17: Unexpected potentially woke use of `Collectivization`, in some cases `Individualism` may be better'
    ])
  })

  await t.test('should not flag "poors"', async function () {
    assert.deepEqual(await process('Poors unite'), [])
  })

  await t.test('should not flag "rich"', async function () {
    assert.deepEqual(await process('Rich exploit'), [])
  })

  await t.test('should not flag "competition"', async function () {
    assert.deepEqual(await process('Competition drives'), [])
  })

  await t.test('should not flag "factories"', async function () {
    assert.deepEqual(await process('Factories produce'), [])
  })

  await t.test('should not flag "uprising"', async function () {
    assert.deepEqual(await process('Uprising starts'), [])
  })

  await t.test('should not flag "reality"', async function () {
    assert.deepEqual(await process('Reality shapes'), [])
  })

  await t.test('should not flag "takeover"', async function () {
    assert.deepEqual(await process('Takeover succeeds'), [])
  })

  await t.test('should not flag "leaders"', async function () {
    assert.deepEqual(await process('Leaders guide'), [])
  })

  // Tests for leftism.yml rules
  await t.test(
    'should flag "wealth redistribution" as woke',
    async function () {
      assert.deepEqual(await process('Wealth redistribution fails'), [
        '1:1-1:22: Unexpected potentially woke use of `Wealth redistribution`, in some cases `Theft`, `Robbery` may be better'
      ])
    }
  )

  await t.test('should flag "anti-capitalism" as woke', async function () {
    assert.deepEqual(await process('Anti-capitalism grows'), [
      '1:1-1:16: Unexpected potentially woke use of `Anti-capitalism`, in some cases `Whining` may be better'
    ])
  })

  await t.test('should flag "direct action" as woke', async function () {
    assert.deepEqual(await process('Direct action planned'), [
      '1:1-1:14: Unexpected potentially woke use of `Direct action`, in some cases `Riot`, `Mess` may be better'
    ])
  })

  await t.test('should flag "solidarity" as woke', async function () {
    assert.deepEqual(await process('We must stand in solidarity'), [
      '1:9-1:28: Unexpected potentially woke use of `stand in solidarity`, in some cases `sitting around` may be better'
    ])
  })

  await t.test('should flag "class consciousness" as woke', async function () {
    assert.deepEqual(await process('Class consciousness rises'), [
      '1:1-1:20: Unexpected potentially woke use of `Class consciousness`, in some cases `Groupthink` may be better'
    ])
  })

  await t.test('should flag "imperialism" as woke', async function () {
    assert.deepEqual(await process('Imperialism criticized'), [
      '1:1-1:12: Unexpected potentially woke use of `Imperialism`, in some cases `Victory`, `Dominance` may be better'
    ])
  })

  await t.test('should flag "neoliberalism" as woke', async function () {
    assert.deepEqual(await process('Neoliberalism attacked'), [
      '1:1-1:14: Unexpected potentially woke use of `Neoliberalism`, in some cases `Markets` may be better'
    ])
  })

  await t.test('should flag "anarcho-syndicalism" as woke', async function () {
    assert.deepEqual(await process('Anarcho-syndicalism spreads'), [
      '1:1-1:20: Unexpected potentially woke use of `Anarcho-syndicalism`, in some cases `Nonsense` may be better'
    ])
  })

  await t.test('should not flag "theft"', async function () {
    assert.deepEqual(await process('Theft increases'), [])
  })

  await t.test('should not flag "riot"', async function () {
    assert.deepEqual(await process('Riot breaks out'), [])
  })

  await t.test('should not flag "teamwork"', async function () {
    assert.deepEqual(await process('Teamwork succeeds'), [])
  })

  await t.test('should not flag "groupthink"', async function () {
    assert.deepEqual(await process('Groupthink dominates'), [])
  })

  await t.test('should not flag "victory"', async function () {
    assert.deepEqual(await process('Victory achieved'), [])
  })

  await t.test('should not flag "markets"', async function () {
    assert.deepEqual(await process('Markets thrive'), [])
  })

  await t.test('should not flag "nonsense"', async function () {
    assert.deepEqual(await process('Nonsense spreads'), [])
  })

  // Tests for environmentalism.yml rules
  await t.test('should flag "climate justice" as woke', async function () {
    assert.deepEqual(await process('Climate justice demanded'), [
      '1:1-1:16: Unexpected potentially woke use of `Climate justice`, in some cases `Weather` may be better'
    ])
  })

  await t.test('should flag "green new deal" as woke', async function () {
    assert.deepEqual(await process('Green new deal proposed'), [
      '1:1-1:15: Unexpected potentially woke use of `Green new deal`, in some cases `Jobs` may be better'
    ])
  })

  await t.test('should flag "carbon footprint" as woke', async function () {
    assert.deepEqual(await process('Carbon footprint reduced'), [
      '1:1-1:17: Unexpected potentially woke use of `Carbon footprint`, in some cases `Emissions` may be better'
    ])
  })

  await t.test(
    'should flag "sustainable development" as woke',
    async function () {
      assert.deepEqual(await process('Sustainable development goals'), [
        '1:1-1:24: Unexpected potentially woke use of `Sustainable development`, in some cases `Growth` may be better'
      ])
    }
  )

  await t.test('should flag "eco-friendly" as woke', async function () {
    assert.deepEqual(await process('Eco-friendly products'), [
      '1:1-1:13: Unexpected potentially woke use of `Eco-friendly`, in some cases `Practical` may be better'
    ])
  })

  await t.test(
    'should flag "climate change denier" as woke',
    async function () {
      assert.deepEqual(await process('Climate change denier speaks'), [
        '1:1-1:15: Unexpected potentially woke use of `Climate change`, in some cases `Weather` may be better',
        '1:1-1:22: Unexpected potentially woke use of `Climate change denier`, in some cases `Skeptic` may be better'
      ])
    }
  )

  await t.test('should flag "environmental racism" as woke', async function () {
    assert.deepEqual(await process('Environmental racism addressed'), [
      '1:1-1:21: Unexpected potentially woke use of `Environmental racism`, in some cases `Pollution` may be better'
    ])
  })

  await t.test('should flag "net zero" as woke', async function () {
    assert.deepEqual(await process('Net zero achieved'), [
      '1:1-1:9: Unexpected potentially woke use of `Net zero`, in some cases `Balance` may be better'
    ])
  })

  await t.test('should not flag "weather"', async function () {
    assert.deepEqual(await process('Weather affects us'), [])
  })

  await t.test('should not flag "jobs"', async function () {
    assert.deepEqual(await process('Jobs created'), [])
  })

  await t.test('should not flag "emissions"', async function () {
    assert.deepEqual(await process('Emissions cut'), [])
  })

  await t.test('should not flag "growth"', async function () {
    assert.deepEqual(await process('Growth sustained'), [])
  })

  await t.test('should not flag "practical"', async function () {
    assert.deepEqual(await process('Practical solutions'), [])
  })

  await t.test('should not flag "skeptic"', async function () {
    assert.deepEqual(await process('Skeptic questions'), [])
  })

  await t.test('should not flag "pollution"', async function () {
    assert.deepEqual(await process('Pollution rises'), [])
  })

  await t.test('should not flag "balance"', async function () {
    assert.deepEqual(await process('Balance maintained'), [])
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
