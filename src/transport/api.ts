import axios from 'axios'
import { Processing } from '../stores/processing'
import { Fee } from '../stores/fee'

const axiosInstance = axios.create()

// eslint-disable-next-line
const post = <T = any>(url: string, config: any = {}, data: any): Promise<T> => axiosInstance.post(url, data, config)
// eslint-disable-next-line
const get = <T = any>(url: string, config: any = {}): Promise<T> => axiosInstance.get(url, config)

export type Headers = Record<string, string> | null

type RequestParams = { endpoint: string; headers: Headers }

export type PostFormData = Record<string, string | undefined>
export type FetchFeeData = { amount: string; id: string }

export type GetPsList = { data: { data: any } } // TODO: !!!
export type PostForm = { data: { data: Processing } }
export type FetchFee = { data: { data: Fee } }

export const api = {
  getPsList: ({ endpoint, headers }: RequestParams) =>
    get<GetPsList>(endpoint, { headers }).then(({ data: { data } }) => data),
  postForm: ({ endpoint, headers, data }: RequestParams & { data: PostFormData }) =>
    post<PostForm>(endpoint, { headers }, data).then(({ data: { data } }) => data),
  fetchFee: ({ endpoint, headers, data }: RequestParams & { data: FetchFeeData }) =>
    post<FetchFee>(endpoint, { headers }, data).then(({ data: { data } }) => data),
}
