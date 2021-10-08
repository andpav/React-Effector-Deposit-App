import { createEffect, createEvent } from '../../lib/effector'

export const resetApp = createEvent()

export const sendApplicationErrorFx = createEffect(console.error)
