import React from 'react';
import thumbnailsData from '../database/thumbnails.json';
import './MainPage.scss';

function MainPage(props) {
    return (
        <div className='mainPage'>
            <div className='content'>
                <div className='schoolCardsArea'>
                    {
                        thumbnailsData.map((item, index) => {
                            return (
                                <a key={index} href={item.url}>
                                    <div className='schoolCard'>
                                        <img className='schoolCardImg' src={item.imgUrl} alt={item.schoolName} />
                                        <p>{item.schoolName}</p>
                                    </div>
                                </a>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default MainPage;