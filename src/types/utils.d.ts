type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
declare global {
  /** Remove tuple last element */
  type RemoveLast<TList extends unknown[]> = TList extends [...infer THead, unknown] ? THead : []

  /**
   * XOR<{ a: number }, { b: string }>
   *   => { a: number; b?: never } & { a?: never, b: number }
   */
  type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;
}

export {}
