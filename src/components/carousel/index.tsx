import React from 'react'
import ReactCarousel from 'react-multi-carousel'
import styled from 'styled-components'

import { useDeviceType, RESPONSIVE } from './useDeviceType'

import { COLORS } from '../../constants'

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

const StyledInfo = styled.div`
  margin-left: 8px;
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

const IconWrapper = styled.div`
  margin-left: 5px;
  margin-bottom: 3px;
`

const RightIcon = () => (
  <IconWrapper>
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.5 13L7.5 7L1.5 0.999999" stroke="#A8AEBD" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </IconWrapper>
)

const Arrow = styled.button<{ left: boolean }>`
  position: absolute;
  top: calc(50% - 20px);
  ${(props) => (props.left ? 'left: -20px' : 'right: -20px')};
  ${(props) => (props.left ? 'transform: rotate(180deg);' : '')};
  outline: 0;
  transition: all 0.5s;
  border-radius: 35px;
  z-index: 1000;
  background-color: ${COLORS.TEXT_THREE};
  border: none;
  outline: none;
  min-width: 40px;
  min-height: 40px;
  box-shadow: 0 ${(props) => (props.left ? '-12px' : '12px')} 24px rgba(18, 27, 38, 0.5);
  cursor: pointer;

  &:hover {
    background-color: ${COLORS.BACKGROUND_ONE};
  }

  &:active,
  &:focus {
    border: none;
    outline: none;
  }
`

const CustomRightArrow = ({ onClick }: any) => (
  <Arrow onClick={onClick} left={false}>
    <RightIcon />
  </Arrow>
)

const CustomLeftArrow = ({ onClick }: any) => (
  <Arrow onClick={onClick} left={true}>
    <RightIcon />
  </Arrow>
)

const ButtonGroup = ({ next, previous }: any) => (
  <div className="carousel-button-group">
    <CustomLeftArrow onClick={() => previous()} />
    <CustomRightArrow onClick={() => next()} />
  </div>
)

export const Carousel = ({ paymentSystems, currency, select, selectedId }: CarouselProps) => {
  const deviceType = useDeviceType()

  return (
    <StyledParent>
      <ReactCarousel
        deviceType={deviceType}
        responsive={RESPONSIVE}
        arrows={false}
        renderButtonGroupOutside
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        customButtonGroup={<ButtonGroup />}
      >
        {paymentSystems.map((ps: any) => { // TODO: !!!
          const truncatedMin = ps.min.split('.')[0]
          const truncatedMax = ps.max.split('.')[0]

          return (
            <ItemWrapper key={ps.id} active={ps.id === selectedId} onClick={() => select(ps.id)}>
              {/*{getPsIcon(ps.id)}*/}
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
