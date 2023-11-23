import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Slider from './Slider';
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
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

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
    const [count, setCount] = useState(0);
    const [popup, setPopup] = useState(false);
    const [selData, setSelData] = useState({});
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);
    // const onPrev = (e) => {
    //     e.preventDefault();
    //     console.log(count)
    //     if (count === 0) {
    //         setCount(dataArr.length - 1);
    //     } else {
    //         setCount(count => count - 1);
    //     };
    // };
    // const onNext = (e) => {
    //     e.preventDefault();
    //     if (count === dataArr.length - 1) {
    //         setCount(0);
    //     } else {
    //         setCount(count => count + 1);
    //     };
    // };
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
    // useEffect(() => {
    //     let changingItems;
    //     if (animate) {
    //         changingItems = setInterval(() => {
    //             if (count === dataArr.length - 1) {
    //                 setCount(0);
    //             } else {
    //                 setCount(count => count + 1);
    //             };
    //         }, 3000);
    //     } else {
    //         clearInterval(changingItems);
    //     };
    //     return () => clearInterval(changingItems);
    // }, [count, animate])

    return (
        <div className='photoViewPage'>
            <header>
                <a href='/'>←메인으로</a>
                <h1>{schoolName}</h1>
            </header>
            <Slider data={dataArr} onStop={onStop} onRun={onRun} onClick={onClick} animate={animate} />
            {/* <button
                className='btns prevBtn'
                onClick={onPrev}
                onMouseOver={onStop}
                onMouseOut={onRun}
            >
                <BsFillCaretLeftFill />
            </button>
            <button
                className='btns nextBtn'
                onClick={onNext}
                onMouseOver={onStop}
                onMouseOut={onRun}
            >
                <BsFillCaretRightFill />
            </button> */}
            <ImagePopup
                pop={popup}
                selData={selData}
                onClose={onClosePopup}
            />
        </div>
    );
}

export default PhotoView;