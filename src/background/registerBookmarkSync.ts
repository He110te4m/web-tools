import { onMessage } from 'webext-bridge/background'
import { apiKey } from '~/logic/storage'

export enum EventName {
  update = 'update-local-bookmark',
  sync = 'sync-local-bookmark',
}

export function registerBookmarkSync() {
  browser.runtime.onInstalled.addListener(updateBookmark)
  onMessage(EventName.update, updateBookmark)

  browser.bookmarks.onChanged.addListener(syncBookmark)
  browser.bookmarks.onCreated.addListener(syncBookmark)
  onMessage(EventName.sync, syncBookmark)
}

function updateBookmark() {
  if (!apiKey.value) {
    return
  }
}

function syncBookmark() {
  if (!apiKey.value) {
    return
  }
}
