import React, { useEffect } from 'react';
import "./Slider.scss";
import { Carousel } from 'react-responsive-3d-carousel'


function Slider({ data, onStop, onRun, onClick, animate }) {
    return (
        <div className="wrapper">
            <div className='slide_wrapper'>
            <Carousel
                autoPlay={animate}
                width='600px'
                height='480px'
                infiniteLoop={true}
                arrowsDefaultColor="rgba(255, 255, 255, 0.3)"
                arrowsHoveredColor='white'
                depth={2}
                isShadow={true}
                showIndicators={false}

            >
                {
                    data.map((item, index, array) => {
                        return (
                            <div className='item' key={index}
                                onClick={e => onClick(e, item)}
                                onMouseOver={onStop}
                                onMouseOut={onRun}
                            >
                                <img src={item.imgUrl} alt={item.fileName} />
                            </div>
                        );
                    })
                }
            </Carousel>
            </div>
            {/* <div
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
                    onMouseOut={selData.imgUrl?null:onRun}
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
            </div>             */}
        </div>
    );
}

export default Slider;