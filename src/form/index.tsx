import React, { BaseSyntheticEvent, useCallback, useEffect } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/input'
import { Button } from '../components/button'
import { Carousel } from '../components/carousel'
import { Fee } from './Fee'

import {
  $currencySelected,
  $paymentSystems,
  $paymentSystemsPending,
  $paymentSystemsSelectedId,
  fetchPs,
  setSelectedId,
} from '../stores/paymentSystems'
import { depositFx, setAmount } from '../stores/deposit'

import { DepositCredentials, depositValidationScheme, digitsRegexp } from '../schemes'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Form = styled.form`
  max-width: 492px;
  padding: 24px 36px;
`

export const Deposit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(depositValidationScheme),
    reValidateMode: 'onChange',
    defaultValues: { amount: '' },
  })

  const { amount } = errors

  const paymentSystems = useStore($paymentSystems)
  const paymentSystemsPending = useStore($paymentSystemsPending)
  const selectedId = useStore($paymentSystemsSelectedId)
  const currencySelected = useStore($currencySelected)

  const onSubmit = useCallback(async (data: DepositCredentials) => depositFx(data), [])

  const onChange = useCallback((e: BaseSyntheticEvent) => {
    const value = e.currentTarget.value

    if (digitsRegexp.test(value)) {
      setAmount(value)
    }
  }, [])

  useEffect(() => {
    fetchPs()
  }, [])

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {paymentSystemsPending ? (
          <div>loading...</div>
        ) : (
          <Carousel paymentSystems={paymentSystems} select={setSelectedId} selectedId={selectedId} />
        )}
        <Input
          formName="amount"
          mt="1rem"
          startAdornment={currencySelected}
          register={register}
          onChange={onChange}
          error={amount && amount.message ? amount.message : null}
        />
        <Fee />
        <Button type="submit" mt="1rem" color="blue" size="medium" view="filled">
          Deposit
        </Button>
      </Form>
    </Wrapper>
  )
}
