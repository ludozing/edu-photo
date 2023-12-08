import './App.scss';
import { Route, Routes } from 'react-router';
import MainPage from './content/userPage/MainPage';
import PhotoView from './content/userPage/PhotoView';
import AdminPage from './content/adminPage';
import LoginPage from './content/adminPage/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
        {/* <Route path='/login' element={<LoginPage />} /> */}
        <Route path='/view/:id' element={<PhotoView />} />
        <Route path='/admin/*' element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
