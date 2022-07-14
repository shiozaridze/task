import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Component/home/HomePage';
import UserListView from './Component/user/UserListView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/user/:userId' element={<UserListView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
