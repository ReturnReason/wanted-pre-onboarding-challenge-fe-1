import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  useCreateTodoMutation,
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from 'api/todoApi';

import { WHITE_COLOR, TEXT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from 'colors/common';
import Bg from 'components/Bg';
import Button from 'components/Button';
import Modal from 'components/Modal';

// TODO: 히스토리

export default function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.alert('로그인 후 이용하실 수 있습니다.');
      return navigate('/auth/login');
    }
  }, []);

  const modalRef = useRef(null);
  const modificationTodoRef = useRef(null);
  const param = useParams();

  const [mode, setMode] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState();
  const [createTodoContent, setCreateTodoCotent] = useState({
    title: '',
    content: '',
  });

  const [createTodoMutation] = useCreateTodoMutation();
  const [deleteTodoMutation] = useDeleteTodoMutation();
  const [updateTodoMutation] = useUpdateTodoMutation();

  const { data: todos, isLoading, isSuccess } = useGetTodosQuery();

  const option = { skip: !selectedTodo };
  const { data: selectTodo } = useGetTodoByIdQuery(selectedTodo, option);

  const addTodoHandler = () => {
    modalRef.current?.showModal();
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = await createTodoMutation(createTodoContent).unwrap();

      if (payload.data) {
        modalRef.current?.requestClose();
        window.alert('새로운 TODO가 등록되었습니다.');
      }
    } catch (error) {
      console.log(error);
      window.alert('예기치못한 에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  const titleInputHandler = ({ target }) => {
    setCreateTodoCotent((prev) => ({
      ...prev,
      title: target.value,
    }));
  };

  const contentInputHandler = ({ target }) => {
    setCreateTodoCotent((prev) => ({
      ...prev,
      content: target.value,
    }));
  };

  useEffect(() => {
    if (isSuccess && todos) {
      const { data } = todos;
      setAllTodos(() => {
        return [...data];
      });
    }
  }, [todos]);

  const showTodoDetail =
    (selectedTodo) =>
    ({ target }) => {
      if (target.id !== 'select') return;
      setSelectedTodo(selectedTodo);
      setMode('show');
    };

  const [modifyTitle, setModifyTitle] = useState(selectTodo?.title);
  const [modifyContent, setModifyContent] = useState(selectTodo?.content);

  const modifyMode =
    (selectedTodo) =>
    ({ target }) => {
      if (target.id !== 'modify') return;

      setModifyTitle(selectedTodo?.data.title);
      setModifyContent(selectedTodo?.data.content);
      setMode('modify');
    };

  const cancleModifyTodo = () => {
    setMode('show');
  };

  useEffect(() => {
    if (mode === 'modify') {
      modificationTodoRef.current.focus();
    }
  }, [mode]);

  const deleteTodo = (todo) => async () => {
    try {
      const payload = await deleteTodoMutation({ id: todo.id }).unwrap();
      if (payload) {
        window.alert('삭제되었습니다.');
      }
    } catch (error) {
      window.alert('에러가 발생했습니다. 잠시 후 다시 시도해주세요.');
      console.error(error);
    }
  };

  const changeTitleInput = ({ target }) => {
    setModifyTitle(target.value);
  };

  const changeContentInput = ({ target }) => {
    setModifyContent(target.value);
  };

  const requestModificationTodo = (todo) => async () => {
    try {
      console.log(modifyContent, modifyTitle, todo);
      const payload = await updateTodoMutation({
        id: todo.data.id,
        title: modifyTitle,
        content: modifyContent,
      }).unwrap();

      if (payload) {
        setMode('show');
      }
    } catch (error) {
      console.error(error);
      window.alert('에러 발생! 잠시 후 다시 시도해주세요.');
    }
  };

  const logoutHanlder = () => {
    localStorage.removeItem('token');
    window.alert('로그아웃되었습니다.');
    navigate('/');
  };

  return (
    <>
      {
        <form action='/todos' method='POST'>
          <Modal ref={modalRef} leftBtnText='Add' rightBtnText='Cancle' submit={submitHandler}>
            <TodoEditor>
              <label htmlFor='title'>Title</label>
              <input maxLength={50} onChange={titleInputHandler} type='text' id='title' />

              <label htmlFor='title'>Content</label>
              <TextArea maxLength={200} onChange={contentInputHandler} type='text' id='title' />
            </TodoEditor>
          </Modal>
        </form>
      }

      <Bg>
        <Conatiner>
          <div>
            <Logout>
              <Button onClick={logoutHanlder}>로그아웃</Button>
            </Logout>
            <h2>To do List</h2>
            {isLoading && <div>로딩중</div>}
            <TodoContainer>
              <TodoItems>
                {allTodos.length > 0 &&
                  allTodos.map((todo) => {
                    return (
                      <TodoItem key={`${todo.id}`}>
                        <li id='select' onClick={showTodoDetail(todo)}>
                          {todo.title}
                        </li>
                        <TodoButton id='delete' onClick={deleteTodo(todo)}>
                          삭제
                        </TodoButton>
                      </TodoItem>
                    );
                  })}
              </TodoItems>
              <TodoDetail>
                {mode === 'show' && selectTodo && (
                  <>
                    <h3>{selectTodo?.data?.title}</h3>
                    <p>{selectTodo?.data?.content}</p>
                    <TodoButton id='modify' onClick={modifyMode(selectTodo)}>
                      수정
                    </TodoButton>
                  </>
                )}

                {mode === 'modify' && (
                  <>
                    <ModifyInput
                      ref={modificationTodoRef}
                      placeholder='Title'
                      value={modifyTitle}
                      onChange={changeTitleInput}
                    />
                    <ModifyTextArea
                      placeholder='Content'
                      value={modifyContent}
                      onChange={changeContentInput}
                    />
                    <ModifyButtonContainer>
                      <TodoButton id='modify' onClick={requestModificationTodo(selectTodo)}>
                        확인
                      </TodoButton>
                      <TodoButton id='cancle' onClick={cancleModifyTodo}>
                        취소
                      </TodoButton>
                    </ModifyButtonContainer>
                  </>
                )}
              </TodoDetail>
            </TodoContainer>
            <Button onClick={addTodoHandler} className='add'>
              Add Todo
            </Button>
          </div>
        </Conatiner>
      </Bg>
    </>
  );
}

const Conatiner = styled.div`
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    width: 600px;
    height: 600px;
    background: ${WHITE_COLOR};
    border-radius: 20px;
    box-shadow: 2px 2px 20px #e37a7a5c;
  }

  h2 {
    color: ${TEXT_COLOR};
  }

  .add {
    width: 540px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: 5px;
  }
`;
const TodoEditor = styled.div`
  display: flex;
  flex-direction: column;

  > label {
    color: #746e6e;
    font-size: 15px;
    margin-top: 15px;
    margin-bottom: 5px;
  }

  > input,
  textarea {
    border: 1px solid #ddd;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;

    &:focus {
      outline: none;
    }
  }
`;

const TodoContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 90%;
  column-gap: 10px;
`;

const TodoItems = styled.ul`
  height: 450px;
  padding: 0;
  margin: 0;
  overflow: scroll;
  overflow-x: hidden;
  flex: 1;

  &::-webkit-scrollbar {
    width: 8px;
    background: ${SECONDARY_COLOR};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    height: 10px;
    background: ${PRIMARY_COLOR};
    border-radius: 10px;
  }
`;

const TodoItem = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
  margin-bottom: 5px;

  li {
    width: 100%;
    padding: 5px;
    padding-left: 10px;
    list-style: none;
    background: #ffeaea;
    color: ${PRIMARY_COLOR};
    border-radius: 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
`;
const TodoDetail = styled.div`
  max-height: 450px;
  flex: 1;
  padding: 20px;
  border-radius: 10px;
  background: #fff6f6;
  color: #746e6e;
`;

const ModifyInput = styled.input`
  width: 100%;
  border: none;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

const ModifyTextArea = styled.textarea`
  min-width: 100%;
  max-width: 200px;
  min-height: 80%;
  max-height: 300px;
  border: none;
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

const ModifyButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const TextArea = styled.textarea`
  min-width: 400px;
  max-width: 400px;
  min-height: 80px;
  max-height: 100px;
`;

const TodoButton = styled.button`
  min-width: 50px;
  display: block;
  cursor: pointer;
  background: ${PRIMARY_COLOR};
  color: ${WHITE_COLOR};
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin-right: 8px;
`;

const Logout = styled.div`
  position: absolute;
  right: 15px;
  top: 10px;
`;
