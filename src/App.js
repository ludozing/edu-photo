import './App.scss';
import { Route, Routes } from 'react-router';
import MainPage from './content/userPage/MainPage';
import PhotoView from './content/userPage/PhotoView';
import AdminPage from './content/adminPage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRefresh } from './reducer/authentication';
import { cleanup } from '@testing-library/react';
import { withCookies } from 'react-cookie';

function App() {
  const dispatch = useDispatch();
  const refTok = useSelector((state)=>state.session.refTok);
  useEffect(()=> {
      if(refTok) {
          dispatch(setRefresh())
      } else return cleanup;
  },[]);

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

export default withCookies(App);
