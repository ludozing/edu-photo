import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../config/constants';
import { useNavigate } from 'react-router';
import './LoginPage.scss';

function LoginPage({ setLoginState }) {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        adminId: '',
        adminPw: ''
    });
    const onChange = e => {
        e.preventDefault();
        setAdminData({
            ...adminData,
            [e.target.name]: e.target.value
        })
    };
    const onSubmit = e => {
        e.preventDefault();
        axios.post(`${API_URL}/adminLogin`, adminData)
            .then(res => {
                if (res.data.success) {
                    setLoginState(true);
                    navigate('/admin');
                } else {
                    window.alert('로그인 실패')
                }
            })
            .catch(err => console.error(err))
    };
    return (
        <div className='loginPage'>

            <h2>관리자 로그인</h2>
            <p>관리자 모드 로그인페이지입니다.</p>
            <form onSubmit={onSubmit}>
                <div className='inputArea'>
                    <div>
                        <label className='adminIdLabel' htmlFor='adminId'>아이디</label>
                        <input className='adminIdInput' type='text' name='adminId' onChange={onChange} />
                    </div>
                    <div>
                        <label className='adminPwLabel' htmlFor='adminPw'>비밀번호</label>
                        <input className='adminPwInput' type='password' name='adminPw' onChange={onChange} />
                    </div>
                </div>
                <input className='loginBtn' type='submit' value={'로그인'} />
            </form>
        </div>
    );
}

export default LoginPage;