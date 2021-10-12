import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { $paymentSystemSelected } from '../stores/paymentSystems'
import { $fee, $feePending, $result } from '../stores/fee'

const StyledFee = styled.div`
  color: white;
`

export const Fee = () => {
  const fee = useStore($fee)
  const feePending = useStore($feePending)
  const result = useStore($result)
  const selectedPS = useStore($paymentSystemSelected)

  if (feePending) {
    return <div>...loading</div>
  }

  if (!fee || !selectedPS) {
    return null
  }

  const { currency } = selectedPS

  return (
    <>
      <StyledFee>
        <span>Fee:</span>{' '}
        <span>
          {fee} {currency}
        </span>
      </StyledFee>
      <StyledFee>
        <span>Result:</span>{' '}
        <span>
          {result} {currency}
        </span>
      </StyledFee>
    </>
  )
}
