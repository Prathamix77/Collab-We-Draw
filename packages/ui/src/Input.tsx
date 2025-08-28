import React, { HtmlHTMLAttributes, HTMLInputTypeAttribute, ReactElement, ReactHTMLElement, ReactNode } from 'react';
import styled from 'styled-components';

interface InputProps {
  placeholder : HTMLInputTypeAttribute,
  ref:  React.Ref<HTMLInputElement>,
  type : HTMLInputTypeAttribute
}

export const Input = ({placeholder,type,ref}:InputProps) => {
  return (
    <StyledWrapper className='place-content-center'>
      <input  ref = {ref} type={type} name="text" className="input" placeholder={placeholder}/>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    max-width: auto;
    padding: 0.875rem;
    font-size: 1.5rem;
    color : #000000;
    border: 1.5px solid #000;
    border-radius: 0.5rem;
    box-shadow: 2.5px 3px 0 #000;
    outline: none;
    transition: ease 0.25s;
  }

  .input:focus {
    box-shadow: 5.5px 7px 0 black;
  }`;


