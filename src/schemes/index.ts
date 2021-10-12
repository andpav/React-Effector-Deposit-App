import { InferType, object, string } from 'yup'

export const digitsRegexp = /^\d+$/

export const depositValidationScheme = object({
  amount: string().required('Required field').matches(digitsRegexp, 'This field should have digits only'),
})

export type DepositCredentials = InferType<typeof depositValidationScheme>
