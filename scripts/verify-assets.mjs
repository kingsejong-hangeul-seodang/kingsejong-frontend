import assert from 'node:assert/strict'
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

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

for (const asset of files('public/assets')) {
  const relative = asset.replaceAll('\\', '/').replace(/^public\//, '')
  assert(references.has(relative), `Unused asset: ${relative}`)
}

const registry = readFileSync('src/app/screens.ts', 'utf8')
const routes = [...registry.matchAll(/component: page\('([^']+)', '([^']+)'\)/g)]
assert.equal(routes.length, 33, 'All 33 Figma screens must be registered')
for (const [, group, name] of routes) {
  assert(statSync(`src/features/${group}/screens/${name}.tsx`).isFile(), `Missing screen: ${name}`)
}
console.log(
  `Verified ${routes.length} screen routes and ${references.size} referenced local assets.`,
)
