import type { Register, SessionContextUsage } from 'claude-code'

const k = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M` : `${Math.round(n / 1000)}k`

export const label = (c: SessionContextUsage): string =>
  `${c.tokens === undefined ? '–' : k(c.tokens)}/${k(c.window)}`

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const r = await next(e)
    try {
      $.ui.status(label((await $.session.usage()).context))
    } catch {}
    return r
  })

  on('session.measure', ($, e, next) => {
    if (e.changed.includes('context')) $.ui.status(label(e.context))
    return next(e)
  })
}
