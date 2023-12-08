import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import './EditNamePopup.scss';

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.42)'
    },
    content: {
        width: '470px',   
        height: '282px',    
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)',
        borderRadius: '18px',
        padding: '26px'
    },
};

Modal.setAppElement('#root');

function EditNamePopup({ isOpen, selectedData, onClose, onEditName }) {
    const [nameValue, setNameValue] = useState('');
    useEffect(() => {
        setNameValue('');
    }, [isOpen]);

    const onChangeInput = e => {
        e.preventDefault();
        setNameValue(e.target.value);
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={customStyles}
            contentLabel='학교 이름 수정'
        >
            <div className='modalContentArea'>
                <h3>학교 이름 수정</h3>
                <p>학교이름을 수정합니다.<br />{`현재 학교 이름 : ${selectedData?selectedData.schoolName:''}`}</p>
                <input type='text' defaultValue={nameValue} onChange={onChangeInput} />
                <div className='btnsArea'>
                    <button className='submit' onClick={e => onEditName(e, nameValue)}>적용</button>
                    <button className='cancel' onClick={onClose}>취소</button>
                </div>
            </div>
        </Modal>
    );
}

export default EditNamePopup;