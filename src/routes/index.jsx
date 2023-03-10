import { Routes, Route, Navigate } from 'react-router-dom';
import { Home, Login, SignUp, Todo } from 'pages/index';

export default function index() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth'>
        <Route index element={<Navigate to='/auth/login' />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<SignUp />} />
      </Route>
      <Route path='/todos' element={<Todo />}>
        <Route path=':id' />
      </Route>
    </Routes>
  );
}
