import React from 'react';
import { AiOutlineClose } from "react-icons/ai";
import { STORAGE_URL } from '../../../config/constants';

function ImagePopup({pop, selData, onClose}) {
    return (
        <div className={pop?'popupBg visible':'popupBg invisible'} onClick={onClose}>
            <div className='popup' onClick={e => {e.stopPropagation();}}>
                <button onClick={onClose}><AiOutlineClose /></button>
                <div className='imgArea'>
                    <img src={`${STORAGE_URL}/${selData.imgUrl}`} alt={selData.fileName} />
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;