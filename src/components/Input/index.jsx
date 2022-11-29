import React from 'react'
import { InputContainer } from './style';

const Input = ({value, expression}) => {
  return (
    <InputContainer>
      <input value={expression}/>
      <input value={value}/>
    </InputContainer>
  )
}

export { Input };
