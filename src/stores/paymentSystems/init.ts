import { sample, forward } from '../../lib/effector'

import { $commonApiData } from '../endpoints'
import { fetchPsFx, resetSelectedPs, setSelectedId, $psError, $paymentSystems, setError, fetchPs } from './index'

forward({
  from: fetchPsFx.doneData.filterMap((data) => data[0].id),
  to: setSelectedId,
})

sample({
  source: $commonApiData,
  clock: fetchPs,
  fn: (sourceData) => ({ endpoint: sourceData.fetchUrl, headers: sourceData.headers }),
  target: fetchPsFx,
})

sample({
  source: $paymentSystems,
  clock: resetSelectedPs,
  fn: (sourceData) => sourceData[0].id,
  target: setSelectedId,
})

sample({
  source: $psError,
  clock: fetchPsFx.failData,
  fn: (sourceData) => !sourceData,
  target: setError,
})
