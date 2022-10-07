declare global {
  type RemoveLast<TList extends unknown[]> = TList extends [...infer THead, unknown] ? THead : []
}

export {}
