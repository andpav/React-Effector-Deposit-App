import React from 'react'
import './App.css'

import { Deposit } from './form'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

export const App = () => {
  return (
    <Wrapper>
      <Deposit />
    </Wrapper>
  )
}
