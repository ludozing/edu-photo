import React from 'react';
import { Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import EditSchool from './component/EditSchool';
import EditGallery from './component/EditGallery';
import toMainIcon from '../../images/toMainIcon.png';
import './AdminPage.scss';
import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import LoginPage from './LoginPage';
import { useSelector } from 'react-redux';
import LoadingPage from '../userPage/component/LoadingPage';

function AdminPage(props) {
    async function getThumbnailList() {
        const response = await axios.get(`${API_URL}/getThumbnails`)
        return response.data;
    }
    const loginState = useSelector(state => state.session.login);
    const state = useAsync(getThumbnailList);
    const { loading, error, data: result } = state;
    if (loading) return <div className='adminPage bg'><div className='content'><div className='innerBg'><div className='innerLine'><LoadingPage/></div></div></div></div>
    if (error) {
        console.log(error)
        return <div className='content appCon'>페이지를 나타낼 수 없습니다.</div>
    }
    if (!result) return null;
    return (
        <div className='adminPage bg'>
            <div className='content'>
                <div className='innerBg'>
                    <div className='innerLine'>
                        <Link className='toMain' to='/'>
                            <div>
                                <img src={toMainIcon} alt={'메인으로'} /> <p>메인으로</p>
                            </div>
                        </Link>
                        <div className='titleArea'>
                            <h1 className='title'>
                                <span>고교학점제</span>
                                <span>학교공간조성사업</span>
                            </h1>
                        </div>
                        {
                            loginState
                                ? <Routes>
                                    <Route path='/' element={<EditSchool schoolData={result} />} />
                                    <Route path='/:id' element={<EditGallery />} />
                                </Routes>
                                : <LoginPage />

                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;