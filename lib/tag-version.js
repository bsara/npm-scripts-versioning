#!/usr/bin/env node

/**
 * ISC License (ISC)
 *
 * Copyright (c) 2017, Brandon D. Sara (https://bsara.github.io/)
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


/* global echo, exec, exit, which */

require('shelljs/global');

const { version } = require('../package.json');



if (!which('git')) {
  echo("git executable not found! Install git and try again.");
  exit(1);
}


const tagName = `v${version}`;

_execCmd(`git tag ${tagName}`, `create git release tag (tag name: ${tagName})`);
_execCmd('git push --tags', `push git release tag to default remote (tag name: ${tagName})`);



// Helpers
// -------------------------------------------------------------

function _execCmd(cmdStr, cmdDesc) {
  const cmdReturnCode = exec(cmdStr).code;

  if (cmdReturnCode !== 0) {
    echo(`Error: Failed to ${cmdDesc}`);
    exit(cmdReturnCode);
  }
}
