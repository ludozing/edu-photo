import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import gangnamData from '../database/gangnam.json';
import haksungData from '../database/haksung.json';
import hyundaiData from '../database/hyundai.json';
import joongangData from '../database/joongang.json';
import joongangGirlsData from '../database/joongangGirls.json';
import mugeoData from '../database/mugeo.json';
import shinjungData from '../database/shinjung.json';
import shinsunGirlsData from '../database/shinsunGirls.json';
import './PhotoView.scss';
import ImagePopup from './ImagePopup';
import { Carousel } from 'react-responsive-3d-carousel';
import eduLogo from '../images/eduLogo.png';
import toMainIcon from '../images/toMainIcon.png';

function PhotoView(props) {
    const param = useParams();
    const { id } = param;
    let schoolName;
    let dataArr;
    switch (id) {
        case 'gangnam':
            schoolName = "울산강남고등학교";
            dataArr = gangnamData;
            break;
        case 'haksung':
            schoolName = "학성고등학교";
            dataArr = haksungData;
            break;
        case 'hyundai':
            schoolName = "현대고등학교";
            dataArr = hyundaiData;
            break;
        case 'joongang':
            schoolName = "울산중앙고등학교";
            dataArr = joongangData;
            break;
        case 'joongangGirls':
            schoolName = "울산중앙여자고등학교";
            dataArr = joongangGirlsData;
            break;
        case 'mugeo':
            schoolName = "무거고등학교";
            dataArr = mugeoData;
            break;
        case 'shinjung':
            schoolName = "신정고등학교";
            dataArr = shinjungData;
            break;
        case 'shinsunGirls':
            schoolName = "신선여자고등학교";
            dataArr = shinsunGirlsData;
            break;
        default:
            dataArr = gangnamData;
    };
    const [animate, setAnimate] = useState(true);
    const [popup, setPopup] = useState(false);
    const [selData, setSelData] = useState({});
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);

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

    return (
        <div className='photoViewPage'>
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
                        <h1 className='schoolName'>{schoolName}</h1>
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
                                dataArr.map((item, index, array) => {
                                    return (
                                        <div className='item' key={index}
                                            onClick={e => onClick(e, item)}
                                        >
                                            <img src={item.imgUrl} alt={item.fileName} />
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