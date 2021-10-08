import { createDomain } from 'effector'

export const domain = createDomain('domain')

export * from 'effector'

export const createEffect = domain.createEffect
export const createEvent = domain.createEvent
export const createStore = domain.createStore
