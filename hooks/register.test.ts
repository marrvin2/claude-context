import { test, expect } from 'claude-code/testing'
import { label } from './register'

test('label formats tokens and window', async () => {
  expect(label({ tokens: 84_000, window: 200_000, percent: 42 })).toBe('84k/200k')
  expect(label({ tokens: 104_400, window: 1_000_000 })).toBe('104k/1M')
  expect(label({ window: 1_000_000 })).toBe('–/1M')
})

test('session.measure writes the status line', async ($, on) => {
  const seen: (string | undefined)[] = []
  on('ui.status', ($, e) => { seen.push(e.text); return { value: undefined } })
  on('session.measure', ($, e) => ({ changed: e.changed }))
  await $.session.measure({
    context: { tokens: 50_000, window: 200_000, percent: 25 },
    rateLimits: [],
    changed: ['context'],
  })
  expect(seen.at(-1)).toBe('50k/200k')
})
