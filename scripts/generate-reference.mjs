import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { delimiter, resolve } from 'node:path'

const runtimeFile = resolve('repos.local/reference-runtime.json')
const configured = existsSync(runtimeFile)
  ? JSON.parse(readFileSync(runtimeFile, 'utf8').replace(/^\uFEFF/, ''))
  : undefined
const python =
  process.env.HANGEUL_PYTHON ||
  configured?.python ||
  (process.platform === 'win32' ? 'py' : 'python3')
const packages = resolve('repos.local/python-packages')
const result = spawnSync(python, ['scripts/prepare-reference.py', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: {
    ...process.env,
    PYTHONUTF8: '1',
    ...(configured?.useLocalPackages !== false && existsSync(packages)
      ? { PYTHONPATH: [packages, process.env.PYTHONPATH].filter(Boolean).join(delimiter) }
      : {}),
  },
})
if (result.error) console.error(result.error.message)
process.exit(result.status ?? 1)
