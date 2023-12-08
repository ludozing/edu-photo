import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import './PhotoView.scss';
import ImagePopup from './component/ImagePopup';
import { Carousel } from 'react-responsive-3d-carousel';
import eduLogo from '../../images/eduLogo.png';
import toMainIcon from '../../images/toMainIcon.png';
import axios from 'axios';
import { API_URL, STORAGE_URL } from '../../config/constants';
import useAsync from '../../hooks/useAsync';

function PhotoView(props) {
    const param = useParams();
    const { id } = param;

    async function getImageList() {
        const response = await axios.post(`${API_URL}/getImages`, { schoolName: id });
        return response.data;
    }

    let schoolName;
    let dataArr;
    switch (id) {
        case 'gangnam':
            schoolName = "울산강남고등학교";
            break;
        case 'haksung':
            schoolName = "학성고등학교";
            break;
        case 'hyundai':
            schoolName = "현대고등학교";
            break;
        case 'joongang':
            schoolName = "울산중앙고등학교";
            break;
        case 'joongangGirls':
            schoolName = "울산중앙여자고등학교";
            break;
        case 'mugeo':
            schoolName = "무거고등학교";
            break;
        case 'shinjung':
            schoolName = "신정고등학교";
            break;
        case 'shinsunGirls':
            schoolName = "신선여자고등학교";
            break;
        default:
            schoolName = "신정고등학교";
    };
    const [animate, setAnimate] = useState(true);
    const [popup, setPopup] = useState(false);
    const [selData, setSelData] = useState({});

    const onClick = (e, selData) => {
        e.preventDefault();
        setPopup(true);
        setAnimate(false);
        setSelData(selData);
    };
    const onClosePopup = (e) => {
        e.preventDefault();
        setAnimate(true);
        setPopup(false);
        setSelData({});
    }

    const state = useAsync(getImageList);
    const { loading, error, data: result } = state;
    if (loading) return <div className='content appCon'>로딩중...</div>
    if (error) {
        console.log(error)
        return <div className='content appCon'>페이지를 나타낼 수 없습니다.</div>
    }
    if (!result) return null;
    return (
        <div className='photoViewPage bg'>
            <div className='content'>
                <div className='innerBg'>
                    <div className='innerLine'>
                        <a className='toMain' href='/'>
                            <div>
                                <img src={toMainIcon} alt={'메인으로'} /> <p>메인으로</p>
                            </div>
                        </a>
                        <div className='carouselArea'>
                            <div className='schoolNameArea'>
                                <h1 className='schoolName'>{result.schoolName}</h1>
                            </div>
                            <Carousel
                                autoPlay={animate}
                                width='696px'
                                height='522px'
                                infiniteLoop={true}
                                arrowsDefaultColor="rgba(125, 184, 222, 0.5)"
                                arrowsHoveredColor='#7DB8DE'
                                arrowsHeight='80px'
                                arrowsWidth='80px'
                                depth={2}
                                isShadow={true}
                                showIndicators={false}
                                isStatusShadow={false}
                                statusColor={'#999'}
                            >
                                {
                                    result.images.length === 0 ? null:
                                    result.images.map((item, index, array) => {
                                        return (
                                            <div className='item' key={index}
                                                onClick={e => onClick(e, item)}
                                            >
                                                <img src={`${STORAGE_URL}/${item.imgUrl}`} alt={item.imgAlt} />
                                            </div>
                                        );
                                    })
                                }
                            </Carousel>
                        </div>
                        <img className='eduLogo' src={eduLogo} alt={"울산광역시교육청"} />
                    </div>
                </div>
            </div>
            <ImagePopup
                pop={popup}
                selData={selData}
                onClose={onClosePopup}
            />
        </div>
    );
}

export default PhotoView;