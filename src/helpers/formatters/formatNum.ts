interface Config {
  data: number
  units: string[]
  limit?: number
  steps?: number[]
}

export function formatNum({ data, units, limit, steps }: Config) {
  if (steps && steps.length !== units.length) {
    return data.toString()
  }

  const unitSteps = limit ? units.map((_, idx) => limit ** idx).reverse() : steps!

  let i = 0
  let rest = 0
  while (i < unitSteps.length) {
    const num = unitSteps[i]
    rest = data / num
    if (rest > 1) {
      break
    }
    i++
  }

  const num = Math.round(rest)
  const unit = units[Math.min(i, units.length - 1)] ?? ''

  return num + unit
}
