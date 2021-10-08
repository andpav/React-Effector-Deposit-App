import React from 'react'
import styled from "styled-components";


import {Input} from "../components/input";
import {Button} from "../components/button";
import {Carousel} from "../components/carousel";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Widget = styled.div`
  max-width: 540px;
  padding: 24px 36px;
`

export const DepositWidget = () => {
  return <Wrapper>
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

      <div>
        Amount
      </div>
      <Input  />

      <div>
        Fee
      </div>

      <Button color="blue" size="medium" view="filled" type="submit">
        Submit
      </Button>
    </Widget>
  </Wrapper>
}
