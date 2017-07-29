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


/* global echo, exec, exit, which */

require('shelljs/global');

const fs                 = require('fs');
const { files, version } = require('package.json');



const filePaths = pkg.files.filter((filePath) => (filePath.startsWith("!") === false));

if (fs.existsSync('package-lock.json')) {
  filePaths.push('package-lock.json');
}


// Commit & push changes
// -------------------------------------------------------------

if (!which('git')) {
  echo("git executable not found! Install git and try again.");
  exit(1);
}

_execCmd(`git add package.json ${filePaths.join(" ")}`, "add (`git add`) changed version reference files");
_execCmd(`git commit -m "version bump (v${version})"`, "commit version changes");
_execCmd('git push', "push git version bump commit to default git remote");



// Helpers
// -------------------------------------------------------------

function _execCmd(cmdStr, cmdDesc) {
  const cmdReturnCode = exec(cmdStr).code;

  if (cmdReturnCode !== 0) {
    echo(`Error: Failed to ${cmdDesc}`);
    exit(cmdReturnCode);
  }
}
