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
  text-transform: none;
  letter-spacing: normal;
  color: ${(props) => (props.view === 'semi' ? BUTTON_COLORS[props.color] : 'white')};
  font-size: ${(props) => BUTTON_SIZES[props.size].fontSize};
  font-weight: 500;
  line-height: ${(props) => BUTTON_SIZES[props.size].lineHeight};
  height: ${(props) => BUTTON_SIZES[props.size].height};
  min-width: ${(props) => BUTTON_SIZES[props.size].width};
  background-color: ${(props) => (props.view === 'filled' ? BUTTON_COLORS[props.color] : 'transparent')};
  border-color: ${(props) => BUTTON_COLORS[props.color]};
  padding: 0 1rem;
  border-radius: 4px;
  border-style: solid;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    opacity: ${(props) => (props.disabled ? 0.5 : 0.85)};
  }

  &:focus {
    border-color: ${COLORS.ACCENT_ONE};
    outline: none;
  }
`

const TransparentButton = styled.button<ButtonProps>`
  text-transform: none;
  letter-spacing: normal;
  color: ${(props) => BUTTON_COLORS[props.color]};
  font-size: ${(props) => BUTTON_SIZES[props.size].fontSize};
  line-height: ${(props) => BUTTON_SIZES[props.size].lineHeight};
  font-weight: 300;
  height: ${(props) => BUTTON_SIZES[props.size].height};
  background-color: transparent;
  border-color: transparent;
  padding: 0;
  border-radius: 4px;
  border-style: solid;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    opacity: 0.85;
  }

  &:focus {
    background-color: ${COLORS.BACKGROUND_ONE};
    outline: none;
    opacity: 1;
  }
`

export const Button = (props: ButtonProps) => {
  const ButtonView = props.view === 'transparent' ? TransparentButton : ColoredButton

  return <ButtonView {...props} />
}
