import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PRIMARY_COLOR, SECONDARY_COLOR, WHITE_COLOR } from 'colors/common';

export default function Home() {
  const navigate = useNavigate();

  const moveTodoPage = () => {
    navigate('/todos');
  };

  const moveLoginPage = () => {
    navigate('/auth/login');
  };

  const moveRegisterPage = () => {
    navigate('/auth/register');
  };

  return (
    <Container>
      <Main>
        <Todo>
          <p>▼ 로그인 후 입장하기</p>
          <button onClick={moveTodoPage}>TO DO LIST</button>
        </Todo>
        <BtnContainer>
          <div>
            <Button onClick={moveLoginPage}>로그인</Button>
            <Line />
          </div>
          <div>
            <Button onClick={moveRegisterPage}>회원가입</Button>
            <Line />
          </div>
        </BtnContainer>
      </Main>
    </Container>
  );
}

const textFocus = keyframes`
  0% {
    filter: blur(20px);
    opacity: 0;
  }

  100% {
    filter: blur(0px);
    opacity: 1;
  }
`;

const moving = keyframes`
  0%{
    transform : translateY(0px);
  }

  50%{
    transform : translateY(10px);
  }

  100%{
    transform : translateY(0px);
  }
`;

const moveLine = keyframes`
  0%{
    transform : translateX(0px);
  }

  50%{
    transform : translateX(20px);
  }

  100%{
    transform : translateX(0px);
  }
`;

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Main = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  background: linear-gradient(180deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR});
  transition: all 0.4s;
`;

const Todo = styled.div`
  position: relative;

  > p {
    color: ${WHITE_COLOR};
    animation: ${moving} 2s infinite;
    position: absolute;
    top: -70px;
    background: #ffffff20;
    padding: 5px;
    padding-top: 3px;
  }

  > button {
    border: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 30px;

    font-size: 50px;
    font-weight: 900;

    color: ${WHITE_COLOR};
    background: #c36a6a50;
    box-shadow: 10px 10px 50px #b0595950;

    cursor: pointer;

    transition: all 0.4s;

    &:hover {
      transform: translateY(5px);
      box-shadow: 10px 10px 20px #b0595950;
    }
  }
`;

const Line = styled.hr`
  width: 100%;
  border: none;
  border-bottom: 2px solid transparent;
`;

const BtnContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  > div:hover ${Line} {
    border-bottom: 2px solid #ffffff80;
    animation: ${moveLine} 0.5s alternate;
    animation-fill-mode: forwards;
  }
`;

const Button = styled.button`
  width: 200px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 10px;

  border: none;
  border-bottom: 2px solid transparent;

  font-size: 16px;
  color: ${WHITE_COLOR};
  background: none;

  animation: ${textFocus} 1s;
  transition: all 0.4s;

  cursor: pointer;
`;
