import { createEffect, createEvent, forward } from '../../lib/effector'

export type Processing = { redirect: { url: string } }

export const startProcessing = createEvent<Processing>()

export const startProcessingFx = createEffect({
  handler: ({ redirect }: Processing) => {
    const { url } = redirect

    window.location.replace(url)
  },
})

forward({
  from: startProcessing,
  to: startProcessingFx,
})

/* keep it here, iframe's version of processing */
// export const listener = createEvent<MessageEvent>()

// export const $iframeUrl = restore(startProcessing, '')

// export const finishProcessing = createEvent()

// export const startProcessingFx = createEffect({
//   handler: () => {
//     window.addEventListener('message', listener)
//   },
// })

// export const finishProcessingFx = createEffect({
//   handler: () => {
//     window.removeEventListener('message', listener)
//     window.location.replace(window.location.href)
//   },
// })

// guard({
//   source: listener,
//   filter: (message) => message.data === 'success_deposit',
//   target: finishProcessing,
// })

// forward({
//   from: finishProcessing,
//   to: finishProcessingFx,
