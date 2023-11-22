import React, { useEffect } from 'react';
import { useState } from 'react';
import "./Slider.scss";
import ImagePopup from './ImagePopup';

function Slider({ data, onStop, onRun, count, onClick, selData }) {
    return (
        <div className="wrapper">
            <div className="slide_container">
                <div
                    className="slide_wrapper"
                >
                    <div className='item'
                        onClick={e => onClick(e, data[count - 4 < 0 ? data.length - 4 + count : count - 4])}
                    >
                        <img src={data[count - 4 < 0 ? data.length - 4 + count : count - 4].imgUrl} alt={data[count - 4 < 0 ? data.length - 4 + count : count - 4].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count - 3 < 0 ? data.length - 3 + count : count - 3])}
                    >
                        <img src={data[count - 3 < 0 ? data.length - 3 + count : count - 3].imgUrl} alt={data[count - 3 < 0 ? data.length - 3 + count : count - 3].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count - 2 < 0 ? data.length - 2 + count : count - 2])}
                    >
                        <img src={data[count - 2 < 0 ? data.length - 2 + count : count - 2].imgUrl} alt={data[count - 2 < 0 ? data.length - 2 + count : count - 2].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count - 1 < 0 ? data.length - 1 + count : count - 1])}
                    >
                        <img src={data[count - 1 < 0 ? data.length - 1 + count : count - 1].imgUrl} alt={data[count - 1 < 0 ? data.length - 1 + count : count - 1].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count])}
                        onMouseOver={onStop}
                        onMouseLeave={selData?null:onRun}
                    >
                        <img src={data[count].imgUrl} alt={data[count].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count + 1 > data.length - 1 ? count + 1 - data.length : count + 1])}
                    >
                        <img src={data[count + 1 > data.length - 1 ? count + 1 - data.length : count + 1].imgUrl} alt={data[count + 1 > data.length - 1 ? count + 1 - data.length : count + 1].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count + 2 > data.length - 1 ? count + 2 - data.length : count + 2])}
                    >
                        <img src={data[count + 2 > data.length - 1 ? count + 2 - data.length : count + 2].imgUrl} alt={data[count + 2 > data.length - 1 ? count + 2 - data.length : count + 2].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count + 3 > data.length - 1 ? count + 3 - data.length : count + 3])}
                    >
                        <img src={data[count + 3 > data.length - 1 ? count + 3 - data.length : count + 3].imgUrl} alt={data[count + 3 > data.length - 1 ? count + 3 - data.length : count + 3].fileName} />
                    </div>
                    <div className='item'
                        onClick={e => onClick(e, data[count + 4 > data.length - 1 ? count + 4 - data.length : count + 4])}
                    >
                        <img src={data[count + 4 > data.length - 1 ? count + 4 - data.length : count + 4].imgUrl} alt={data[count + 4 > data.length - 1 ? count + 4 - data.length : count + 4].fileName} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Slider;