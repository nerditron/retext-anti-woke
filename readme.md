# retext-anti-woke

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to shred woke, politically correct, far-left, and commie
nonsense from your text, replacing it with raw, unfiltered language that says
it like it is.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`unified().use(retextAntiWoke[, options])`](#unifieduseretextantiwoke-options)
  * [`Options`](#options)
* [Messages](#messages)
* [Types](#types)
* [Compatibility](#compatibility)
* [Related](#related)
* [Contributing](#contributing)
* [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin that doesn’t coddle your
feelings.
It’s a fork of “retext-equality”, flipped on its head to hunt down
and destroy woke jargon—think “social justice,” “microaggressions,”
“safe spaces,” and “proletariat”—and swap them out for direct, no-nonsense
alternatives.
Sick of the PC police?
This is your weapon.

## When should I use this?

Use it when you’re done with the woke word salad and want your writing to hit
hard and clear.
If you’re a writer who’s tired of tiptoeing around snowflakes,
this plugin’s got your back.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install retext-anti-woke
```

In Deno with [`esm.sh`][esmsh]:

```javascript
import retextAntiWoke from 'https://esm.sh/retext-anti-woke@7'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextAntiWoke from 'https://esm.sh/retext-anti-woke@7?bundle'
</script>
```

## Use

Say your document example.txt contains this woke garbage:

```txt
Privilege is a systemic issue that requires allyship.
```

Run this module example.js:

```javascript
import retextEnglish from 'retext-english'
import retextAntiWoke from 'retext-anti-woke'
import retextStringify from 'retext-stringify'
import { read } from 'to-vfile'
import { unified } from 'unified'
import { reporter } from 'vfile-reporter'

const file = await unified()
  .use(retextEnglish)
  .use(retextAntiWoke)
  .process(await read('example.txt'))

console.error(reporter(file))
```

And watch node “example.js” rip it apart:

```txt
example.txt
1:1-1:10  warning  Unexpected woke use of ‘Privilege’, try ‘merit’
1:39-1:47 warning  Unexpected woke use of ‘allyship’, try ‘support’

 2 warnings
```

## API

This package exports no identifiers.
The default export is [retextAntiWoke][api-retext-anti-woke].

### `unified().use(retextAntiWoke[, options])`

Rip out woke nonsense from your text.

###### Parameters

* `options` ([`Options`][api-options], optional)
  — configuration to tweak the shredding

###### Returns

Transform ([`Transformer`][unified-transformer]).

### `Options`

Configuration (TypeScript type).

###### Fields

* `ignore` (`Array<string>`, optional)
  — woke terms you’re too weak to ditch
* `binary` (`boolean`, default: `false`)
  — allow “they” or “them” if you’re into that

## Messages

Check [rules.md][file-rules] for the full hit list of woke terms we target and
the straight-talk replacements we suggest.
Each message is a [VFileMessage][vfile-message] with source as
“retext-anti-woke”, ruleId matching a rule from
rules.md, actual as the woke trash, and expected as the real words.
Some come with a note to tell it like it is.

## Types

This package is fully typed with [TypeScript][].
It exports the additional type [`Options`][api-options].

## Compatibility

Built by the unified collective, this works with maintained Node.js versions.
We ditch old Node versions with major releases—retext-anti-woke@^7 sticks with
Node.js 16+.

## Related

* [Chad](https://github.com/nerditron/Chad)
  — Catch sensitive, considerate writing

## Contributing

Got a beef or a better idea?
See [contributing.md][contributing] in [retextjs/.github][health].
Open a pull request—no woke excuses accepted.

To create new patterns, add them in the YAML files in the [`data/`][file-data]
directory, and run `npm install` and then `npm test` to build everything.
Please see the current patterns for inspiration.
New English rules will automatically be added to `rules.md`.

When you are happy with the new rule, add a test for it in
[`test.js`][file-test], and open a pull request.

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].

## License

[MIT][license]  [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-equality/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-equality/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-equality.svg

[coverage]: https://codecov.io/github/retextjs/retext-equality

[downloads-badge]: https://img.shields.io/npm/dm/retext-equality.svg

[downloads]: https://www.npmjs.com/package/retext-equality

[size-badge]: https://img.shields.io/bundlejs/size/retext-equality

[size]: https://bundlejs.com/?q=retext-equality

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/nerditron/retext-anti-woke/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[vfile-message]: https://github.com/vfile/vfile-message

[file-rules]: rules.md

[file-data]: data/

[file-test]: test.js

[api-options]: #options

[api-retext-anti-woke]: #unifieduseretextantiwoke-options
