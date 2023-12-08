import React, { useState } from 'react';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import EditSchool from './component/EditSchool';
import EditGallery from './component/EditGallery';
import toMainIcon from '../../images/toMainIcon.png';
import './AdminPage.scss';
import axios from 'axios';
import useAsync from '../../hooks/useAsync';
import { API_URL } from '../../config/constants';
import LoginPage from './LoginPage';

function AdminPage(props) {
    const [loginState, setLoginState] = useState(false);
    async function getThumbnailList() {
        const response = await axios.get(`${API_URL}/getThumbnails`)
        return response.data;
    }

    const state = useAsync(getThumbnailList);
    const { loading, error, data: result } = state;
    if (loading) return <div className='content appCon'>로딩중...</div>
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
                        <a className='toMain' href='/'>
                            <div>
                                <img src={toMainIcon} alt={'메인으로'} /> <p>메인으로</p>
                            </div>
                        </a>
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
                                : <LoginPage setLoginState={setLoginState} />

                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;