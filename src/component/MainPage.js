import React from 'react';
import thumbnailsData from '../database/thumbnails.json';
import eduLogo from '../images/eduLogo.png';
import './MainPage.scss';

function MainPage(props) {
    return (
        <div className='mainPage'>
            <div className='content'>
                <div className='innerBg'>
                    <div className='innerLine'>
                        <div className='titleArea'>
                            <h1 className='title'>
                                <span>고교학점제</span>
                                <span>학교공간조성사업</span>
                            </h1>
                        </div>
                        <div className='schoolCardsArea'>
                            {
                                thumbnailsData.map((item, index) => {
                                    return (
                                        <a key={index} href={item.url}>
                                            <div className='schoolCard'>
                                                <div className='boxWrap'>
                                                    <img className='schoolCardImg' src={item.imgUrl} alt={item.schoolName} />
                                                </div>
                                                <div className='nameArea'>
                                                    <p>{item.schoolName}</p>
                                                </div>
                                            </div>
                                        </a>
                                    );
                                })
                            }
                        </div>
                        <img className='eduLogo' src={eduLogo} alt={"울산광역시교육청"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;