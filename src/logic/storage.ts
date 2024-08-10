import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const apiKey = useWebExtensionStorage(`${__NAME__}.api-key`, '')
export const syncNodeID = useWebExtensionStorage(`${__NAME__}.sync-node-id`, '')
