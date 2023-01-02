import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const idInput = useRef();

  const moveRegisterPage = () => {
    navigate('/auth/register');
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    idInput.current.focus();
  }, []);

  return (
    <Bg>
      <Container>
        <LoginForm onSubmit={submitForm}>
          <h2>Login</h2>
          <label htmlFor='id'>ID</label>
          <input ref={idInput} type='text' name='id' id='id' placeholder='아이디를 입력하세요.' />

          <label htmlFor='pw'>Password</label>
          <input type='password' name='pw' id='pw' placeholder='비밀번호를 입력하세요.' />
          <button>Login</button>

          <Join>
            아직 회원가입을 안하셨나요?
            <span role='button' onClick={moveRegisterPage}>
              회원가입
            </span>
          </Join>
        </LoginForm>
      </Container>
    </Bg>
  );
}

const Bg = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(to left, #ff9a9e, #fad0c4);
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  &::before {
    content: '';
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    background: linear-gradient(to bottom, #ffffff50, #ffffff20, #ffffff20, #ffffff05, #ffffff01);
    display: block;
    width: 1500px;
    height: 1500px;
    border-radius: 999px;
    position: absolute;
    bottom: -900px;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;

  width: 500px;
  height: 400px;

  background: #fff;
  box-shadow: 2px 2px 20px #e37a7a5c;
  padding: 50px;
  padding-top: 45px;
  border-radius: 20px;

  > h2 {
    color: #ce6a6a;
  }

  > label {
    margin-top: 15px;
    font-size: 12px;
    color: #ce6a6a;
  }

  > input {
    border: none;
    padding: 5px;
    padding-bottom: 8px;
    border-bottom: 2px solid #ad979850;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #b3adad;
      font-size: 12px;
    }
  }

  > button {
    width: 100%;
    margin-top: 22px;
    padding: 10px;
    border-radius: 50px;
    border: none;
    background: linear-gradient(to left, #ff9a9e, #ffc6c8);
    position: relative;
    color: #ffffff;
    z-index: 5;
    transition: all 0.2s;
    cursor: pointer;

    &::before {
      content: '';
      background: none;
      width: 50%;
      height: 100%;
      top: 0;
      left: 0;
      background: none;
      box-shadow: 0px 15px 20px #ffb8b85c;
      border-radius: 50px;
      position: absolute;
    }

    &::after {
      content: '';
      background: none;
      width: 50%;
      height: 100%;
      top: 0;
      right: 0;
      background: none;
      border-radius: 50px;
      box-shadow: 0px 15px 30px #ffa9c15c;
      position: absolute;
    }

    &:hover {
      box-shadow: #d8949740 0px -8px 5px inset, #ffa4a950 0px 5px 5px;
    }
  }
`;

const Join = styled.div`
  color: #746e6e;
  font-size: 13px;
  position: absolute;
  bottom: 35px;
  right: 50px;

  > span {
    margin-left: 8px;
    color: #f0878a;
    cursor: pointer;

    &:hover {
      background: #f2b0b330;
    }
  }
`;
