/** 时间戳类型，后续需要扩展直接修改此类型即可 */
export type Time = number

export type Counter = BaseConfig & XOR<{ loop?: false }, CounterLoopConfig>

interface BaseConfig {
  title: string
  /** 倒计时对应的时间 */
  targetTime: Time
}

interface CounterLoopConfig {
  /** 时间需要循环计时，如每年中秋、每月十五 */
  loop: true
  /** 开始循环的时间 */
  startTime: Time
  /** 循环的单位，按年、按月、按日循环 */
  loopUnit: 'year' | 'month' | 'day'
}
