import React, { forwardRef, Ref } from 'react'
import styled from 'styled-components'

import { COLORS } from '../constants'

const INPUT_PADDING_X = '1rem'
const INPUT_PADDING_Y = 'calc(1rem - 1px)'

const StyledInputWrapper = styled.div`
  position: relative;
  font-size: 1rem;
  margin-bottom: 16px;

  & input:not(:placeholder-shown) {
    padding-top: calc(${INPUT_PADDING_Y} + ${INPUT_PADDING_X} * (2 / 3));
    padding-bottom: calc(${INPUT_PADDING_Y} / 3);
  }

  & input:not(:placeholder-shown) ~ label {
    padding-top: calc(1rem / 3);
    padding-bottom: calc(1rem / 3);
    font-size: 0.75rem;
    pointer-events: none;
  }

  & input::-webkit-input-placeholder {
    color: transparent;
  }

  & input:-ms-input-placeholder {
    color: transparent;
  }

  & input::-ms-input-placeholder {
    color: transparent;
  }

  & input::-moz-placeholder {
    color: transparent;
  }

  & input::placeholder {
    color: transparent;
  }
`

const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: 56px;
  padding: ${INPUT_PADDING_Y} ${INPUT_PADDING_X};
  font-weight: 300;
  color: white;
  background-color: ${COLORS.BACKGROUND_ONE};
  border: ${(props: { error: boolean }) => `1px solid ${props.error ? COLORS.PALETTE_ERROR : COLORS.BACKGROUND_THREE}`};
  border-radius: 4px;

  &:hover {
    background-color: ${COLORS.TEXT_THREE};
  }

  &:active {
    background-color: ${COLORS.TEXT_THREE};
  }

  &:focus {
    background-color: ${COLORS.TEXT_THREE};
  }
`

const StyledLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  color: ${COLORS.TEXT_ONE};
  padding: ${INPUT_PADDING_Y} ${INPUT_PADDING_X};
  margin-bottom: 0;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;

  &:hover {
    cursor: text;
  }
`

const StyledError = styled.div`
  color: ${COLORS.PALETTE_ERROR};
  margin-top: 0.25rem;
  margin-left: 2px;
  font-size: 0.75rem;
`

const StyledText = styled.div`
  color: ${COLORS.TEXT_ONE};
  margin-top: 0.25rem;
  font-size: 0.75rem;
`

export type InputProps = {
  type?: string
  id?: string
  name?: string
  label?: string
  error?: string | null
  value?: string | number
  defaultValue?: string | number
  text?: string
  required?: boolean
  autoFocus?: boolean
  autoComplete?: string
  transparent?: boolean
  shouldShowError?: boolean
  onChange?: (e: any) => void
}

export const Input = forwardRef((props: InputProps, ref: Ref<any>) => {
  const {
    id,
    name,
    label,
    value,
    defaultValue,
    error,
    text,
    required,
    autoFocus,
    autoComplete,
    onChange,
    shouldShowError,
  } = props

  return (
    <StyledInputWrapper>
      <StyledInput
        type="text"
        id={id}
        placeholder={label}
        name={name}
        ref={ref}
        error={Boolean(error) && Boolean(shouldShowError)}
        required={required}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      />
      {id && label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      {text && <StyledText>{text}</StyledText>}
      {shouldShowError && error && <StyledError>{error}</StyledError>}
    </StyledInputWrapper>
  )
})
