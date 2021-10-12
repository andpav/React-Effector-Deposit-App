import { createEffect, createEvent } from '../../lib/effector'
import { toast } from 'react-toastify'

export const resetApp = createEvent()

export const sendApplicationErrorFx = createEffect((data: Error) => {
  console.error(data)
  toast('Something went wrong!', { type: 'error' })
})
