import React, { useEffect } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

import { Input } from '../components/input'
import { Button } from '../components/button'
import { Carousel } from '../components/carousel'
import { $paymentSystems, $paymentSystemsSelectedId, fetchPs, setSelectedId } from '../stores/paymentSystems'
import { depositFx } from '../stores/deposit'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightslategray;
`

const Widget = styled.div`
  max-width: 492px;
  padding: 24px 36px;
`

const Fee = styled.div`
  color: white;
`

export const Deposit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onSubmit',
    // resolver: yupResolver(recoveryValidationScheme),
    reValidateMode: 'onChange',
    defaultValues: { amount: '' },
  })

  const onSubmit = async (data: any) => {
    // TODO: !!!
    return depositFx(data)
  }

  const paymentSystems = useStore($paymentSystems)
  const selectedId = useStore($paymentSystemsSelectedId)

  useEffect(() => {
    fetchPs()
  }, [])

  return (
    <Wrapper>
      <Widget>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Carousel currency={'usd'} paymentSystems={paymentSystems} select={setSelectedId} selectedId={selectedId} />
          <Input formName="amount" mt="1rem" startAdornment="EUR" register={register} />
          <Fee>
            <span>Fee:</span> <span>~ 5%</span>
          </Fee>
          <Fee>
            <span>Result:</span> <span>228 EUR</span>
          </Fee>
          <Button type="submit" mt="1rem" color="blue" size="medium" view="filled">
            Submit
          </Button>
        </form>
      </Widget>
    </Wrapper>
  )
}
