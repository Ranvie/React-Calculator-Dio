import React from 'react'
import { ButtonContainer } from './style';

const Button = ({label, onClick}) => {
  return (
    <ButtonContainer onClick={onClick}>
      {label}
    </ButtonContainer>
  )
}

export { Button };
