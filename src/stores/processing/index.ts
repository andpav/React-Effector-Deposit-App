import { createEffect, createEvent, forward } from '../../lib/effector'
import { guard, restore } from 'effector'
import { toast } from 'react-toastify'
import { resetApp } from '../app'

export type Processing = { redirect: { url: string } }

export const startProcessing = createEvent<string>()

export const listener = createEvent<MessageEvent>()

export const resetIframeUrl = createEvent()

export const $iframeUrl = restore(startProcessing, '').reset(resetIframeUrl)

export const finishProcessing = createEvent()

export const startProcessingFx = createEffect({
  handler: () => {
    window.addEventListener('message', listener)
  },
})

// mock
// forward({
//   from: startProcessingFx.done,
//   to: createEffect(() => {
//     setTimeout(() => {
//       window.postMessage('success_deposit')
//     }, 2000)
//   }),
// })

export const finishProcessingFx = createEffect({
  handler: () => {
    window.removeEventListener('message', listener)

    toast('Success deposit!', { type: 'success' })
  },
})

forward({
  from: startProcessing,
  to: startProcessingFx,
})

guard({
  source: listener,
  filter: message => message.data === 'success_deposit',
  target: finishProcessing,
})

forward({
  from: finishProcessing,
  to: finishProcessingFx,
})

forward({
  from: finishProcessingFx,
  to: resetApp,
})
