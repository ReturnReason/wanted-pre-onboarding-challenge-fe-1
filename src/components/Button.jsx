import { PRIMARY_COLOR, WHITE_COLOR } from 'colors/common';
import styled, { css } from 'styled-components';

export default function Button({ children, onClick, outline = false }) {
  return (
    <div>
      <Btn onClick={onClick} outline={outline}>
        {children}
      </Btn>
    </div>
  );
}

const Btn = styled.button`
  width: 100%;
  margin-top: 22px;
  padding: 10px;
  border-radius: 50px;
  border: none;

  color: ${WHITE_COLOR};
  background: linear-gradient(to left, #ff9a9e, #ffc6c8);
  ${({ outline }) =>
    outline &&
    css`
      background: ${WHITE_COLOR};
      color: ${PRIMARY_COLOR};
      border: 2px solid ${PRIMARY_COLOR};
    `}

  position: relative;
  z-index: 5;
  transition: all 0.2s;
  outline: none;
  cursor: pointer;

  &::before {
    content: '';
    background: none;
    width: 50%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 50px;
    background: none;

    box-shadow: 0px 15px 20px #ffb8b85c;
    ${({ outline }) =>
      outline &&
      css`
        box-shadow: none;
      `}
  }

  &::after {
    content: '';
    background: none;
    width: 50%;
    height: 100%;

    position: absolute;
    top: 0;
    right: 0;

    background: none;
    border-radius: 50px;

    box-shadow: 0px 15px 30px #ffa9c15c;
    ${({ outline }) =>
      outline &&
      css`
        box-shadow: none;
      `}
  }

  &:hover {
    box-shadow: #d8949740 0px -8px 5px inset, #ffa4a950 0px 5px 5px;
  }
`;
