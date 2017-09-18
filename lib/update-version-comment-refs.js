#!/usr/bin/env node

/**
 * ISC License (ISC)
 *
 * Copyright (c) 2017, Brandon D. Sara (https://bsara.pro/)
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
 * AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */


/* global sed */

require('shelljs/global');

const escapeStringRegexp = require('escape-string-regexp');
const path               = require('path');
const pkg                = require(path.join(process.cwd(), 'package.json'));



const filePaths = [ ...(pkg.files || []), pkg.main, pkg.module ].filter((filePath) => (filePath.startsWith("!") === false));

// eslint-disable-next-line max-len
// CREDIT: `semver-regex` NPM package (https://github.com/sindresorhus/semver-regex/blob/master/index.js)
const semverRegex = '\\bv?(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)\\.(?:0|[1-9]\\d*)(?:-[\\da-z\\-]+(?:\\.[a-z\\d\\-]+)*)?(?:\\+[a-z\\d\\-]+(?:\\.[a-z\\d\\-]+)*)?\\b';


// Update all files containing project's version in comments
// -------------------------------------------------------------

filePaths.forEach(function(filePath) {
  sed('-i', RegExp(`\\*\\s+${escapeStringRegexp(pkg.name)}\\s+${semverRegex}`), `* ${pkg.name} v${pkg.version}`, filePath);
});
