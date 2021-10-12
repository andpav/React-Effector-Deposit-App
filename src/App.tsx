import React from 'react'
import { useStore } from 'effector-react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'

import { Deposit } from './form'
import { Processing } from './processing'

import { $iframeUrl } from './stores/processing'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightslategray;
`

export const App = () => {
  const processingUrl = useStore($iframeUrl)

  return (
    <Wrapper>
      {processingUrl ? <Processing /> : <Deposit />}
      <ToastContainer />
    </Wrapper>
  )
}
