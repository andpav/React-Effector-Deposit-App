import React from 'react'
import ReactCarousel from 'react-multi-carousel'
import styled from 'styled-components'

import { useDeviceType, RESPONSIVE } from './useDeviceType'

import { COLORS } from '../../constants'

import { Bitcoin } from './Bitcoin'

import 'react-multi-carousel/lib/styles.css'

const StyledAccentedText = styled.span`
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
  paymentSystems: any[] // TODO !!!
  selectedId: string
  currency: string
  select: (id: string) => void
}

export const Carousel = ({ paymentSystems, currency, select, selectedId }: CarouselProps) => {
  const deviceType = useDeviceType()

  return (
    <StyledParent>
      <ReactCarousel deviceType={deviceType} responsive={RESPONSIVE}>
        {paymentSystems.map((ps: any) => {
          // TODO: !!!
          const truncatedMin = ps.min.split('.')[0]
          const truncatedMax = ps.max.split('.')[0]

          return (
            <ItemWrapper key={ps.id} active={ps.id === selectedId} onClick={() => select(ps.id)}>
              <Bitcoin />
              <ContentWrapper>
                <StyledBlock>
                  <StyledText>Usage fee</StyledText>
                  <FeeRow>
                    <StyledAccentedText>~ {ps.fee ?? 0}%</StyledAccentedText>
                    {'  '}
                  </FeeRow>
                </StyledBlock>
                <div>
                  <StyledText>Processing currency</StyledText>
                  <div>
                    <StyledAccentedText>{ps.currency}</StyledAccentedText>
                  </div>
                  <StyledText>
                    {currency} {truncatedMin} - {truncatedMax}
                  </StyledText>
                </div>
              </ContentWrapper>
            </ItemWrapper>
          )
        })}
      </ReactCarousel>
    </StyledParent>
  )
}
