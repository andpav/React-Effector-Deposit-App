import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

import { COLORS } from '../constants'

export type Size = 'small' | 'medium' | 'large'
export type View = 'transparent' | 'semi' | 'filled'
export type Color = 'green' | 'blue'

export type ButtonProps = {
  size: Size
  view: View
  color: Color
  mt?: string
  mb?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const BUTTON_SIZES = {
  small: {
    height: '32px',
    width: '72px',
    paddingTop: '12px',
    paddingRight: '16px',
    fontSize: '14px',
    lineHeight: '16px',
  },
  medium: {
    height: '32px',
    width: '100px',
    paddingTop: '8px',
    paddingRight: '16px',
    fontSize: '14px',
    lineHeight: '16px',
  },
  large: {
    height: '32px',
    width: '150px',
    paddingTop: '8px',
    paddingRight: '16px',
    fontSize: '14px',
    lineHeight: '16px',
  },
}

const BUTTON_COLORS = {
  blue: COLORS.ACCENT_ONE,
  green: COLORS.ACCENT_TWO,
}

const ColoredButton = styled.button<ButtonProps>`
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
  text-transform: none;
  letter-spacing: normal;
  color: ${props => (props.view === 'semi' ? BUTTON_COLORS[props.color] : 'white')};
  font-size: ${props => BUTTON_SIZES[props.size].fontSize};
  font-weight: 500;
  line-height: ${props => BUTTON_SIZES[props.size].lineHeight};
  height: ${props => BUTTON_SIZES[props.size].height};
  min-width: ${props => BUTTON_SIZES[props.size].width};
  background-color: ${props => (props.view === 'filled' ? BUTTON_COLORS[props.color] : 'transparent')};
  border-color: ${props => BUTTON_COLORS[props.color]};
  padding: 0 1rem;
  border-radius: 4px;
  border-style: solid;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  &:hover {
    opacity: ${props => (props.disabled ? 0.5 : 0.85)};
  }

  &:focus {
    border-color: ${COLORS.ACCENT_ONE};
    outline: none;
  }
`

export const Button = (props: ButtonProps) => {
  return <ColoredButton {...props} />
}
