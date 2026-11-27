// Check the APIs used by Docusaurus and its plugins across the three security overrides.
const assert = require('node:assert/strict');
const {createRequire} = require('node:module');
const {pathToFileURL} = require('node:url');

// Tinypool loads this module as a worker when exercising its task interface.
module.exports = (value) => value;

async function verify() {
  for (const plugin of ['copy-webpack-plugin', 'css-minimizer-webpack-plugin']) {
    const fromPlugin = createRequire(require.resolve(plugin));
    const serialize = fromPlugin('serialize-javascript');
    assert.deepEqual(JSON.parse(serialize({ok: true})), {ok: true});
  }

  const fromSockjs = createRequire(require.resolve('sockjs'));
  assert.match(fromSockjs('uuid').v4(), /^[0-9a-f-]{36}$/);

  const fromCore = createRequire(require.resolve('@docusaurus/core/package.json'));
  const {default: Tinypool} = await import(pathToFileURL(fromCore.resolve('tinypool')).href);
  const pool = new Tinypool({filename: __filename, minThreads: 1, maxThreads: 1});
  try {
    assert.equal(await pool.run('ready'), 'ready');
  } finally {
    await pool.destroy();
  }
}

if (require.main === module) {
  verify().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
