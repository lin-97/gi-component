import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(fileURLToPath(new URL('..', import.meta.url)))

export function generateGlobalDts(outputPath = resolve(rootDir, 'dist/global.d.ts')) {
  const indexPath = resolve(rootDir, 'packages/index.ts')
  const indexContent = readFileSync(indexPath, 'utf-8')
  const componentNames = [...indexContent.matchAll(/export const (Gi\w+)/g)].map((match) => match[1])

  if (componentNames.length === 0) {
    throw new Error('No Gi* component exports found in packages/index.ts')
  }

  const entries = componentNames
    .map((name) => `    ${name}: typeof import('gi-component')['${name}']`)
    .join('\n')

  const content = `/* eslint-disable */
export {}

declare module 'vue' {
  export interface GlobalComponents {
${entries}
  }
}
`

  mkdirSync(dirname(outputPath), { recursive: true })
  writeFileSync(outputPath, content, 'utf-8')

  console.log(`Generated ${outputPath} with ${componentNames.length} components`)
}
