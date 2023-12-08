import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import EditGalleryForm from './EditGalleryForm';
import { API_URL } from '../../../config/constants';
import useAsync from '../../../hooks/useAsync';
import './EditGallery.scss';

function EditGallery(props) {
    const param = useParams();
    const {id} = param;
    async function getImageList() {
        const response = await axios.post(`${API_URL}/getImages`, {schoolName: id})
        return response.data;
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
        <div className='editContent editGallery'>
            <h2 className='schoolName'>{`학교 사진 수정 / ${result.schoolName}`}</h2>
            <EditGalleryForm originData={result.images} schoolId={id} />
        </div>
    );
}

export default EditGallery;