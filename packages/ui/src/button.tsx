
import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  text : String,
  onClick :()=>void
}

export const Button = ({text, onClick}:ButtonProps) => {
  return (
    <StyledWrapper>
      <button onClick={onClick} id="bottone1"><strong>{text}</strong></button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  #bottone1 {
   padding-left: 33px;
   padding-right: 33px;
   padding-bottom: 16px;
   padding-top: 16px;
   border-radius: 9px;
   background: #000000;
   border: none;
   font-family: inherit;
   text-align: center;
   cursor: pointer;
   transition: 0.4s;
  }

  #bottone1:hover {
   box-shadow: 7px 5px 56px -14px #000000;
  }

  #bottone1:active {
   transform: scale(0.97);
   box-shadow: 7px 5px 56px -10px #000000;
  }`;


