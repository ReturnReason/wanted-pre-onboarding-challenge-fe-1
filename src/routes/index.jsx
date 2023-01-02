import { Routes, Route } from 'react-router-dom';
import { Home, Login, SignUp } from 'pages/index';

export default function index() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth'>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<SignUp />} />
      </Route>
    </Routes>
  );
}
