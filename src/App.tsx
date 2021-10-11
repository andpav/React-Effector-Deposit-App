import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { Deposit } from './form'
import { $iframeUrl } from './stores/processing'
import { Iframe } from './lib/iframe'

import './App.css'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const IframeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 540px;
  height: 360px;
`

export const App = () => {
  const processingUrl = useStore($iframeUrl)

  return processingUrl ? (
    <Wrapper>
      <IframeWrapper>
        <Iframe
          url="http://www.youtube.com/embed/xDMP3i36naA"
          width="100%"
          height="100%"
          id="123"
          display="inline"
          position="relative"
          onLoad={() => {
            setTimeout(() => {
              // eslint-disable-next-line no-restricted-globals
              parent.postMessage('success_deposit', '*')
            }, 3500)
          }}
        />
      </IframeWrapper>
    </Wrapper>
  ) : (
    <Wrapper>
      <Deposit />
    </Wrapper>
  )
}
