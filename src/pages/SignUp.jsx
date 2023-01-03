import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Bg from 'components/Bg';

import { PRIMARY_COLOR, SECONDARY_COLOR, TEXT_COLOR, WHITE_COLOR } from 'colors/common';
import { useCreateUserMutation } from 'api/userApi';

const EMAIL_REGEXP = new RegExp('^[a-zA-Z0-9]+@[a-zA-Z]+[.]{1}[A-Za-z]{2,3}$');

export default function SignUp() {
  const [createUser] = useCreateUserMutation();

  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    email: '',
    password: '',
  });
  const [emailValidCheckMessage, setEmailValidCheckMessage] = useState('');
  const [pwValidCheckMessage, setPwValidCheckMessage] = useState('');
  const [isFormComplete, setIsFormComplete] = useState(false);

  const emailRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      emailRef.current.focus();
    }, 500);
  }, []);

  const moveLoginPage = () => {
    navigate('/auth/login');
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      return window.alert('이메일 또는 비밀번호의 형식이 올바르지 않습니다.');
    }

    try {
      const payload = await createUser(formInputs).unwrap();
      localStorage.setItem('token', payload.token);

      if (payload.message === '계정이 성공적으로 생성되었습니다') {
        window.alert('회원가입 완료! 로그인 페이지로 이동합니다.');
        navigate('/auth/login');
      }
    } catch (error) {
      console.error(error);

      if (error.status === 400) {
        window.alert(error.data.details);
      }

      if (error.status === 409) {
        window.alert('이미 존재하는 이메일입니다.');
      }
    }
  };

  const emailInput = ({ target }) => {
    setFormInputs((prev) => ({
      ...prev,
      email: target.value,
    }));
  };

  useEffect(() => {
    if (!EMAIL_REGEXP.test(formInputs.email)) {
      return setEmailValidCheckMessage('이메일의 형식이 올바르지 않습니다.');
    }
    setEmailValidCheckMessage('올바른 이메일 형식입니다.');
  }, [formInputs.email]);

  const passwordInput = ({ target }) => {
    setFormInputs((prev) => ({
      ...prev,
      password: target.value,
    }));
  };

  useEffect(() => {
    if (formInputs.password.length < 8) {
      return setPwValidCheckMessage('비밀번호는 8자 이상 입력해야 합니다.');
    }
    setPwValidCheckMessage('사용 가능한 비밀번호입니다.');
  }, [formInputs.password]);

  useEffect(() => {
    if (formInputs.password.length >= 8 && EMAIL_REGEXP.test(formInputs.email)) {
      return setIsFormComplete(true);
    }
    setIsFormComplete(false);
  }, [formInputs]);

  return (
    <Bg>
      <Container>
        <SignUpForm onSubmit={submitHandler}>
          <h2>Sign Up</h2>
          <label htmlFor='email'>Email</label>
          {<ValidCheckEmailMessage>{emailValidCheckMessage}</ValidCheckEmailMessage>}
          <input
            onChange={emailInput}
            ref={emailRef}
            type='email'
            name='email'
            id='email'
            required
            placeholder='사용할 이메일을 입력해주세요.'
          />

          <label htmlFor='pw'>Password</label>
          {<ValidCheckPwMessage>{pwValidCheckMessage}</ValidCheckPwMessage>}
          <input
            onChange={passwordInput}
            required
            type='password'
            name='pw'
            id='pw'
            placeholder='사용할 비밀번호를 입력해주세요.'
          />

          <button>Sign Up</button>

          <Login>
            이미 회원가입하셨나요?
            <span role='button' onClick={moveLoginPage}>
              로그인
            </span>
          </Login>
        </SignUpForm>
      </Container>
    </Bg>
  );
}

const fadeIn = keyframes`
  0% {
    opacity : 0;
  }

  25%{
    opacity : 0.3;
  }

  50%{
    opacity : 0.5;
  }

  75%{
    opacity : 0.7;
  }

  100%{
    opacity : 1;
  }
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;

  animation: ${fadeIn} 0.5s;
`;

const SignUpForm = styled.form`
  width: 500px;
  height: 90vh;
  display: flex;
  background: ${WHITE_COLOR};

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
    color: ${TEXT_COLOR};
  }

  > label {
    margin-top: 15px;
    font-size: 12px;
    color: ${TEXT_COLOR};
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
    background: linear-gradient(to left, ${PRIMARY_COLOR}, ${SECONDARY_COLOR});
    position: relative;
    color: #ffffff;
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

const ValidCheckEmailMessage = styled.span`
  font-size: 12px;
  color: #746e6e;
  position: absolute;
  top: 130px;
  left: 100px;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 50%;
    background: #fec1c130;
    position: absolute;
    bottom: -2px;
  }
`;

const ValidCheckPwMessage = styled.span`
  font-size: 12px;
  color: #746e6e;
  position: absolute;
  bottom: 187px;
  left: 130px;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 50%;
    background: #fec1c130;
    position: absolute;
    bottom: -2px;
  }
`;

const Login = styled.div`
  color: #746e6e;
  font-size: 13px;
  position: absolute;
  bottom: 38px;
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
