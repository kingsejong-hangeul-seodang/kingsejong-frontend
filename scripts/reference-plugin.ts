import { spawn } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import type { Plugin } from 'vite'

// Development-only local tooling. Never included in the browser or preview server.
export function referencePlugin(): Plugin {
  let job: { state: 'running' | 'done' | 'error'; log: string } | null = null
  let accepting = false
  return {
    name: 'local-font-reference',
    configureServer(server) {
      server.middlewares.use('/data', async (req, res, next) => {
        const file = req.url
          ?.split('?')[0]
          ?.match(/^\/(guide-font\.(?:json|woff)|reference\.json)$/)?.[1]
        if (
          req.method !== 'GET' ||
          !file ||
          !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(req.headers.host ?? '')
        )
          return next()

        try {
          const content = await readFile(
            resolve(server.config.root, 'repos.local/guide-font', file),
          )
          res.writeHead(200, {
            'Content-Type': file.endsWith('.woff') ? 'font/woff' : 'application/json',
            'Cache-Control': 'no-store',
          })
          res.end(content)
        } catch {
          if (file === 'reference.json') return next()
          res.writeHead(404).end()
        }
      })
      server.middlewares.use('/__reference', async (req, res, next) => {
        if (req.url !== '/generate' && req.url !== '/status') return next()
        const host = req.headers.host ?? ''
        const origin = req.headers.origin
        const localHost = /^(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?$/.test(host)
        if (!localHost || (origin && origin !== `http://${host}` && origin !== `https://${host}`)) {
          res.writeHead(403).end()
          return
        }
        const respond = (code: number, value: unknown) => {
          res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' })
          res.end(JSON.stringify(value))
        }
        if (req.method === 'GET' && req.url === '/status') {
          respond(200, job ?? { state: 'idle', log: '' })
          return
        }
        if (req.method !== 'POST' || req.url !== '/generate') {
          respond(405, { message: 'Method not allowed' })
          return
        }
        if (req.headers['content-type'] !== 'application/octet-stream') {
          respond(415, { message: '폰트 파일을 선택해 주세요.' })
          return
        }
        if (accepting || job?.state === 'running') {
          respond(409, { message: '이미 생성 중이에요.' })
          return
        }
        accepting = true
        try {
          const chunks: Buffer[] = []
          let length = 0
          for await (const chunk of req) {
            length += chunk.length
            if (length > 30 * 1024 * 1024) {
              respond(413, { message: '폰트는 30MB 이하여야 해요.' })
              return
            }
            chunks.push(Buffer.from(chunk))
          }
          const buffer = Buffer.concat(chunks)
          const signature = buffer.subarray(0, 4).toString('hex')
          if (!['00010000', '4f54544f', '74727565'].includes(signature)) {
            respond(400, { message: 'TTF 또는 OTF 파일인지 확인해 주세요.' })
            return
          }
          const directory = resolve('repos.local/Python-correction-engine/data/fonts')
          await mkdir(directory, { recursive: true })
          const font = resolve(
            directory,
            `uploaded-${randomUUID()}${signature === '4f54544f' ? '.otf' : '.ttf'}`,
          )
          await writeFile(font, buffer)
          job = { state: 'running', log: '폰트를 저장했어요. 자모와 음절을 추출합니다.\n' }
          const current = job
          const child = spawn(
            process.execPath,
            ['scripts/generate-reference.mjs', '--font', font],
            {
              cwd: process.cwd(),
              env: { ...process.env, PYTHONUNBUFFERED: '1' },
              windowsHide: true,
            },
          )
          const append = (chunk: string) => {
            current.log = (current.log + chunk).slice(-8000)
          }
          child.stdout.setEncoding('utf8').on('data', append)
          child.stderr.setEncoding('utf8').on('data', append)
          child.on('error', (error) => {
            current.state = 'error'
            append(error.message)
          })
          child.on('close', (code) => {
            current.state = code === 0 ? 'done' : 'error'
          })
          respond(202, current)
        } catch (error) {
          respond(500, { message: error instanceof Error ? error.message : '폰트 생성 실패' })
        } finally {
          accepting = false
        }
      })
    },
  }
}
