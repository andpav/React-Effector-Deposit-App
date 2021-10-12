import React from 'react'
import ReactCarousel from 'react-multi-carousel'
import styled from 'styled-components'

import { useDeviceType, RESPONSIVE } from './useDeviceType'

import { COLORS } from '../../constants'
import { PaymentSystem, PaymentSystems } from '../../stores/paymentSystems'

import { Bitcoin } from './Bitcoin'

import 'react-multi-carousel/lib/styles.css'

const StyledAccentedText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: white;
`

const StyledText = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${COLORS.TEXT_ONE};
`

const FeeRow = styled.div`
  display: flex;
`

const StyledBlock = styled.div`
  margin-bottom: 12px;
`

const ContentWrapper = styled.div`
  padding: 16px;
`

const StyledParent = styled.div`
  position: relative;

  & .react-multi-carousel-item {
    width: 148px !important;
    margin-right: 16px;
  }
`

const ItemWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${(props: { active: boolean }) => (props.active ? COLORS.ACCENT_ONE : COLORS.BACKGROUND_THREE)};
  background-color: ${COLORS.BACKGROUND_ONE};

  &:hover {
    cursor: pointer;
    border: 1px solid ${COLORS.ACCENT_ONE};
  }
`

type CarouselProps = {
  paymentSystems: PaymentSystems
  selectedId: string
  select: (id: string) => void
}

export const Carousel = ({ paymentSystems, select, selectedId }: CarouselProps) => {
  const deviceType = useDeviceType()

  return (
    <StyledParent>
      <ReactCarousel deviceType={deviceType} responsive={RESPONSIVE}>
        {paymentSystems.map((ps: PaymentSystem) => (
          <ItemWrapper key={ps.id} active={ps.id === selectedId} onClick={() => select(ps.id)}>
            <Bitcoin />
            <ContentWrapper>
              <StyledBlock>
                <StyledText>Usage fee</StyledText>
                <FeeRow>
                  <StyledAccentedText>~ {ps.fee ?? 0}%</StyledAccentedText>
                </FeeRow>
              </StyledBlock>
              <StyledBlock>
                <StyledText>Processing currency</StyledText>
                <StyledAccentedText>{ps.currency}</StyledAccentedText>
              </StyledBlock>
            </ContentWrapper>
          </ItemWrapper>
        ))}
      </ReactCarousel>
    </StyledParent>
  )
}
