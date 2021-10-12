import axios from 'axios'
import { Processing } from '../stores/processing'
import { Fee } from '../stores/fee'
import { PaymentSystems } from '../stores/paymentSystems'

const axiosInstance = axios.create()

// eslint-disable-next-line
const post = <T = any>(url: string, config: any = {}, data: any): Promise<T> => axiosInstance.post(url, data, config)
// eslint-disable-next-line
const get = <T = any>(url: string, config: any = {}): Promise<T> => axiosInstance.get(url, config)

export type PostFormData = { amount: string; id: string }
export type FetchFeeData = { amount: string; id: string }

export type GetPsList = { data: { data: PaymentSystems } }
export type PostForm = { data: { data: Processing } }
export type FetchFee = { data: { data: Fee } }

export const api = {
  getPsList: () => get<GetPsList>('/api/payment-systems', {}).then(({ data: { data } }) => data),
  postForm: (data: PostFormData) => post<PostForm>('/api/create-payment', {}, data).then(({ data: { data } }) => data),
  fetchFee: (data: FetchFeeData) => post<FetchFee>('/api/fee', {}, data).then(({ data: { data } }) => data),
}
