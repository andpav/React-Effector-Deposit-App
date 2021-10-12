import React from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'

import { $iframeUrl } from '../stores/processing'
import { Iframe } from '../lib/iframe'

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const IframeWrapper = styled.div`
  width: 540px;
  height: 360px;
`

export const Processing = () => {
  const processingUrl = useStore($iframeUrl)

  return (
    <Wrapper>
      <IframeWrapper>
        <Iframe
          url={processingUrl}
          width="100%"
          height="100%"
          id="123"
          display="inline"
          position="relative"
          onLoad={() => {
            setTimeout(() => {
              // eslint-disable-next-line no-restricted-globals
              parent.postMessage('success_deposit', '*')
            }, 3000)
          }}
        />
      </IframeWrapper>
    </Wrapper>
  )
}
