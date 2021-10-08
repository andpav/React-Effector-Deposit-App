import { createEvent, restore, combine } from '../../lib/effector'
import { Headers } from '../../transport/api'

export type Endpoints = { fetchUrl: string; submitUrl: string; fetchFeeUrl: string }

export const defaultEndpoints = { fetchUrl: '', submitUrl: '', fetchFeeUrl: '' }

export const setEndpoints = createEvent<Endpoints>()
export const resetEndpoints = createEvent()

export const $endpoints = restore(setEndpoints, defaultEndpoints).reset(resetEndpoints)

export type ApiData = { headers: Headers | null }

export const defaultApiData = { headers: null }

export const setApiData = createEvent<ApiData>()

export const resetApiData = createEvent()

export const $apiData = restore(setApiData, defaultApiData).reset(resetApiData)

export const $commonApiData = combine($endpoints, $apiData).map(
  ([{ fetchUrl, submitUrl, fetchFeeUrl }, { headers }]) => ({
    fetchUrl: fetchUrl,
    submitUrl: submitUrl,
    fetchFeeUrl: fetchFeeUrl,
    headers,
  }),
)
