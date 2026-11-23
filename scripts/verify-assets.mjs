import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? files(join(directory, entry.name)) : [join(directory, entry.name)],
  )
}

const codeFiles = files('src').filter((file) => /\.[jt]sx?$/.test(file))
const references = new Set()
for (const file of codeFiles) {
  const source = readFileSync(file, 'utf8')
  assert(!source.includes('figma.com/api/mcp/asset'), `${file}: temporary asset URL`)
  for (const match of source.matchAll(
    /['"`]((?:\/assets\/[\w/-]+\.(?:svg|png))|(?:[a-f\d]{5}\.(?:svg|png)))['"`]/g,
  )) {
    const asset = match[1].startsWith('/') ? match[1].slice(1) : `assets/figma/${match[1]}`
    assert(statSync(join('public', asset)).size > 0, `${file}: empty asset ${asset}`)
    references.add(asset)
  }
}

// Preserve original design exports as screens move from static artwork to generated strokes.
// Every active reference must still resolve; unused source artwork need not be deleted.

const registry = readFileSync('src/app/routes/screens.tsx', 'utf8')
const routes = [...registry.matchAll(/component:/g)]
assert(routes.length >= 33, 'Preserve all original Figma screens alongside supplemental previews')
const modules = [...registry.matchAll(/import\('([^']+)'\)/g)]
assert(modules.length > 0, 'Screen registry must load actual screen modules')
for (const [, module] of modules) {
  assert(statSync(`${resolve('src/app/routes', module)}.tsx`).isFile(), `Missing screen: ${module}`)
}
console.log(
  `Verified ${routes.length} screen routes and ${references.size} referenced local assets.`,
)
