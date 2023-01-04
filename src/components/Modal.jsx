import { useState, forwardRef, useImperativeHandle } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { PRIMARY_COLOR, WHITE_COLOR } from 'colors/common';

const Modal = forwardRef(({ children, leftBtnText, rightBtnText, submit }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    showModal() {
      setVisible(true);
    },

    closeModal(e) {
      if (e.target !== e.currentTarget) return;
      setVisible(false);
    },
    requestClose() {
      setVisible(false);
    },
  }));

  return (
    <>
      {visible && (
        <Bg onClick={ref.current.closeModal} ref={ref}>
          <Card>
            <div>{children}</div>
            <ButtonWrapper>
              <Button onClick={submit}>{leftBtnText}</Button>
              <Button onClick={ref.current.closeModal} outline>
                {rightBtnText}
              </Button>
            </ButtonWrapper>
          </Card>
        </Bg>
      )}
    </>
  );
});

export default Modal;

const Bg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #00000070;
  overflow: hidden;
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: ${WHITE_COLOR};
  width: 500px;
  border-radius: 10px;
  z-index: 999;
  box-shadow: 5px 5px 50px #ff9a9e50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  position: relative;
  overflow: hidden;
  padding: 20px;
  padding-top: 20px;
  border: 2px dashed #ff9a9e90;

  &:after {
    content: '';
    background: ${PRIMARY_COLOR};
    width: 100%;
    height: 10px;
    position: absolute;
    top: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-top: 20px;

  button {
    width: 200px;
    box-shadow: none;

    &:hover {
      box-shadow: none;
    }
  }
`;
