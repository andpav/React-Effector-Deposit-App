import React, { forwardRef, Ref } from 'react'
import styled from 'styled-components'

import { COLORS } from '../constants'

const INPUT_PADDING_X = '1rem'
const INPUT_PADDING_Y = 'calc(1rem)'

const StyledWrapper = styled.div<{ mb?: string; mt?: string }>`
  position: relative;
  font-size: 1rem;
  margin-top: ${({ mt }) => mt};
  margin-bottom: ${({ mb }) => mb};
`

const StyledInputWrapper = styled.div<{ error: boolean }>`
  display: flex;
  align-items: center;
  padding: ${INPUT_PADDING_Y} ${INPUT_PADDING_X};
  background-color: ${COLORS.BACKGROUND_ONE};
  border: ${(props: { error: boolean }) => `1px solid ${props.error ? COLORS.PALETTE_ERROR : COLORS.BACKGROUND_THREE}`};

  border-bottom: 1px solid ${(props: { error: boolean }) => (props.error ? COLORS.PALETTE_ERROR : COLORS.TEXT_THREE)};

  border-radius: 4px;

  &:hover {
    background-color: ${COLORS.TEXT_THREE};
    cursor: text;
  }

  &:active {
    background-color: ${COLORS.TEXT_THREE};
  }

  &:focus {
    background-color: ${COLORS.TEXT_THREE};
  }
`

const StyledInput = styled.input<{ startAdornment: boolean }>`
  font-weight: 300;
  color: white;
  width: ${props => (props.startAdornment ? '80%' : '100%')};
  background-color: transparent;
  border: none;
  padding: 0;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`

const StartAdornmentWrapper = styled.span`
  color: ${COLORS.TEXT_ONE};
  margin-right: 4px;
  max-width: 15%;
  overflow: hidden;
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
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;

  //&:hover {
  //  cursor: text;
  //}
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
  formName?: string
  error?: string | null
  value?: string | number
  defaultValue?: string | number
  startAdornment?: string
  text?: string
  required?: boolean
  autoFocus?: boolean
  autoComplete?: string
  mb?: string
  mt?: string
  onChange?: (e: any) => void
  register: any // TODO: !!!
}

export const Input = forwardRef((props: InputProps, ref: Ref<any>) => {
  const {
    type,
    name,
    formName,
    value,
    defaultValue,
    startAdornment,
    error,
    text,
    required,
    autoFocus,
    autoComplete = 'off',
    onChange,
    mb,
    mt,
    register,
  } = props
  return (
    <StyledWrapper mb={mb} mt={mt}>
      <StyledInputWrapper error={Boolean(error)}>
        {startAdornment && <StartAdornmentWrapper>{startAdornment}</StartAdornmentWrapper>}
        <StyledInput
          type={type}
          id={name}
          placeholder={startAdornment ? '' : name}
          startAdornment={Boolean(startAdornment)}
          name={formName}
          ref={ref}
          required={required}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          {...register(formName)}
        />
        {name && <StyledLabel htmlFor={name}>{name}</StyledLabel>}
      </StyledInputWrapper>
      {text && <StyledText>{text}</StyledText>}
      {error && <StyledError>{error}</StyledError>}
    </StyledWrapper>
  )
})
