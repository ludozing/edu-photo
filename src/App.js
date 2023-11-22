import './App.css';
import { Route, Routes } from 'react-router';
import MainPage from './component/MainPage';
import PhotoView from './component/PhotoView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/view/:id' element={<PhotoView />} />
      </Routes>
    </div>
  );
}

export default App;
