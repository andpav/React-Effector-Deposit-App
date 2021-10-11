import { sample, forward } from '../../lib/effector'

import { fetchPsFx, resetSelectedPs, setSelectedId, $psError, $paymentSystems, setError, fetchPs } from './index'

forward({
  from: fetchPsFx.doneData.filterMap(data => data[0].id),
  to: setSelectedId,
})

forward({
  from: fetchPs,
  to: fetchPsFx,
})

sample({
  source: $paymentSystems,
  clock: resetSelectedPs,
  fn: sourceData => sourceData[0].id,
  target: setSelectedId,
})

sample({
  source: $psError,
  clock: fetchPsFx.failData,
  fn: sourceData => !sourceData,
  target: setError,
})
