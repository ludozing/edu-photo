import React, { useEffect, useState } from 'react';
import eduLogo from '../../images/eduLogo.png';
import './MainPage.scss';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { API_URL, STORAGE_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';
import { Link } from 'react-router-dom';
import noImgIcon from '../../images/schoolIcon.png';
import adminBtn from '../../images/adminBtn.png';
import LoadingPage from './component/LoadingPage';

function MainPage(props) {
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate("/admin");
    };
    async function getThumbnailList() {
        const response = await axios.get(`${API_URL}/getThumbnails`)
        return response.data;
    }

    const [isError, setIsError] = useState(false);
    const [attemptCount, setAttemptCount] = useState(0);
    const state = useAsync(getThumbnailList);
    const { loading, error, data: result } = state;

    useEffect(() => {
        if(state.error!==null && attemptCount<2) {
            console.log("ac:"+attemptCount)
            setTimeout(() => {
                if(state.error!==null) setAttemptCount(count => count + 1);
            }, 100);
        } else if (state.error!==null && attemptCount<4) {
            console.log("ac:"+attemptCount)
            setTimeout(() => {
                if(state.error!==null) setAttemptCount(count => count +1);
            }, 500);
        } else {
            if(state.error!==null) setIsError(true);
        }
    }, [state.error, attemptCount])
    if (loading) return <div className='mainPage bg'><div className='content'><div className='innerBg'><div className='innerLine'><LoadingPage /></div></div></div></div>
    if (isError) {
        console.log(error)
        return <div className='content appCon' style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <p>페이지를 나타낼 수 없습니다.</p>
            <p>잠시 후 다시 시도해 주세요.</p>
        </div>
    }
    if (!result) return null;
    return (
        <div className='mainPage bg'>
            <div className='content'>
                <div className='innerBg'>
                    <div className='innerLine'>
                        <button className='loginBtn' onClick={onClick}>
                            <img src={adminBtn} alt={'관리자 로그인'} />
                        </button>
                        <div className='titleArea'>
                            <h1 className='title'>
                                <span>고교학점제</span>
                                <span>학교공간조성사업</span>
                            </h1>
                        </div>
                        <div className='schoolCardsArea'>
                            <div className='schoolCardsWrap'>
                                {
                                    result.length === 0 ? null :
                                        result.map((item, index) => {
                                            return (
                                                <Link key={index} to={`/view/${item._id}`}>
                                                    <div className='schoolCard'>
                                                        <div className='boxWrap'>
                                                            {
                                                                item.imgUrl ?
                                                                    <img className='schoolCardImg' src={`${STORAGE_URL}/${item.imgUrl}`} alt={item.schoolName} />
                                                                    :
                                                                    <div className='schoolCardImg noImg'>
                                                                        <img src={noImgIcon} alt={"학교"} />
                                                                    </div>
                                                            }
                                                        </div>
                                                        <div className='nameArea'>
                                                            <p>{item.schoolName}</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })
                                }
                            </div>
                        </div>
                        <img className='eduLogo' src={eduLogo} alt={"울산광역시교육청"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;