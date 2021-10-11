import React from 'react'
import styled from 'styled-components'

import { Input } from '../components/input'
import { Button } from '../components/button'
import { Carousel } from '../components/carousel'

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
  return (
    <Wrapper>
      <Widget>
        <Carousel
          currency={'usd'}
          paymentSystems={[
            { id: 'asd', fee: '5', currency: 'usd', min: '1', max: '5' },
            { id: 'asdd', fee: '2', currency: 'eur', min: '2', max: '10' },
            { id: 'asddd', fee: '4', currency: 'eur', min: '2', max: '10' },
            { id: 'asdddd', fee: '5', currency: 'eur', min: '2', max: '10' },
            { id: 'asddddd', fee: '6', currency: 'eur', min: '2', max: '10' },
            { id: 'asdddddd', fee: '7', currency: 'eur', min: '2', max: '10' },
          ]}
          select={() => {}}
          selectedId={''}
        />
        <Input mt="1rem" startAdornment="EUR" />
        <Fee>
          <span>Fee:</span> <span>~ 5%</span>
        </Fee>
        <Fee>
          <span>Result:</span> <span>228 EUR</span>
        </Fee>
        <Button mt="1rem" color="blue" size="medium" view="filled" type="submit">
          Submit
        </Button>
      </Widget>
    </Wrapper>
  )
}
