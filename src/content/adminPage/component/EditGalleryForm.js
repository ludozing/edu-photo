import React, { useEffect, useRef, useState } from 'react';
import { API_URL, STORAGE_URL } from '../../../config/constants';
import prevIcon from '../../../images/gal_prev.png';
import nextIcon from '../../../images/gal_next.png';
import deleteIcon from '../../../images/gal_delete.png';
import chkIcon from '../../../images/chkIcon.png';
import plusIcon from '../../../images/plusIcon.png';
import cancelDelBtn from '../../../images/cancelDeleteBtn.png'
import { useNavigate } from 'react-router';
import axios from 'axios';

function EditGalleryForm({ originData, schoolId }) {
    const [dataArr, setDataArr] = useState([]);
    const [selIdx, setSelIdx] = useState(-1);
    const [isChanged, setIsChanged] = useState(false);
    const [deleteArr, setDeleteArr] = useState([]);
    const [imageFileArr, setImageFileArr] = useState([]);
    const [orderChanged, setOrderChanged] = useState([]);

    const navigate = useNavigate();
    const fileInput = useRef();

    useEffect(() => {
        const copyArr = JSON.parse(JSON.stringify(originData));
        setDataArr([...copyArr])
    }, [originData]);
    useEffect(() => {
        // 데이터 변화 체크
        setIsChanged(JSON.stringify(originData) !== JSON.stringify(dataArr) || deleteArr.length > 0);
    }, [dataArr, deleteArr, originData]);

    const onSelPic = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        if (selIdx === index) {
            setSelIdx(-1);
        } else {
            setSelIdx(index);
        }
    };

    const onSelThumbnail = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let copiedDataArr = [...dataArr];
        const [prevThumbnail] = dataArr.filter(item => item.isThumbnail);
        copiedDataArr[dataArr.indexOf(prevThumbnail)].isThumbnail = false;
        copiedDataArr[selIdx].isThumbnail = true;
        copiedDataArr.sort((a, b) => a.orderIdx - b.orderIdx)
        setDataArr(copiedDataArr);
    }

    // 선택한 학교의 순서를 선순위로 이동
    const onMoveUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // 인덱스가 0인 경우 아무 일도 일어나지 않음
        if (selIdx <= 0) return false;
        // 현재 상태관리 중인 데이터 복사해서 변수에 담음
        let copiedDataArr = [...dataArr];
        // 선택한 데이터의 인덱스 - 1인 데이터를 선택한 데이터의 인덱스로 수정
        copiedDataArr[selIdx - 1].orderIdx = selIdx;
        // 선택한 데이터의 인덱스를 선택한 데이터의 인덱스 - 1로 수정
        copiedDataArr[selIdx].orderIdx = selIdx - 1;
        // 새로운 인덱스를 바탕으로 배열 소팅하여 새롭게 상태관리
        setDataArr(copiedDataArr.sort((a, b) => a.orderIdx - b.orderIdx));
        // 데이터 선택 커서를 앞으로 이동
        const selectedData = dataArr[selIdx];
        const ocArr = [...orderChanged, selectedData._id];
        const set = new Set(ocArr);
        setOrderChanged([...set]);
        setSelIdx(selIdx - 1);
    };

    // 선택한 학교의 순서를 후순위로 이동
    const onMoveDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lastIdx = dataArr.length - 1;
        // 인덱스가 마지막인 경우 아무 일도 일어나지 않음
        if (selIdx === lastIdx) return false;
        // 현재 상태관리 중인 데이터 복사해서 변수에 담음
        let copiedDataArr = [...dataArr];
        // 선택한 데이터의 인덱스 + 1인 데이터를 선택한 데이터의 인덱스로 수정
        copiedDataArr[selIdx + 1].orderIdx = selIdx;
        // 선택한 데이터의 인덱스를 선택한 데이터의 인덱스 + 1로 수정
        copiedDataArr[selIdx].orderIdx = selIdx + 1;
        // 새로운 인덱스를 바탕으로 배열 소팅하여 새롭게 상태관리
        setDataArr(copiedDataArr.sort((a, b) => a.orderIdx - b.orderIdx));
        // 데이터 선택 커서를 뒤로 이동
        const selectedData = dataArr[selIdx];
        const ocArr = [...orderChanged, selectedData._id];
        const set = new Set(ocArr);
        setOrderChanged([...set]);
        setSelIdx(selIdx + 1);
    };

    const onDelete = (e, dataId) => {
        e.preventDefault();
        e.stopPropagation();
        const filteredArr = deleteArr.filter(item => item === dataId)
        if (filteredArr.length === 0) {
            setDeleteArr([...deleteArr, dataId]);
        } else {
            const copiedDArr = [...deleteArr];
            const filteredDArr = copiedDArr.filter(data => data !== filteredArr[0]);
            setDeleteArr(filteredDArr);
        }
    };

    const onUploadFile = e => {
        fileInput.current.click();
    }
    const onChangefileInput = (e) => {
        const fileList = e.target.files;
        const oldFile = fileList[0];
        const fileExtension = e.target.files[0].name.split('.')[1]
        console.log(fileList);
        const timeStamp = + new Date();
        let maxSize = 5 * 1024 * 1024; //* 5MB 사이즈 제한
        let fileSize = fileList[0].size; //업로드한 파일용량
        const newFile = new File([oldFile], `${schoolId}_${timeStamp}.${fileExtension}`, { type: oldFile.type });
        if (fileSize > maxSize) {
            alert("파일첨부 사이즈는 5MB 이내로 가능합니다.");
            e.target.value = ''; //업로드한 파일 제거
            window.alert('5MB 이상의 파일은 업로드할 수 없습니다.');
            return;
        }
        if (fileList && fileList[0]) {
            const url = URL.createObjectURL(fileList[0]);
            const newData = {
                _id: '',
                schoolName: schoolId,
                orderIdx: dataArr.length,
                isThumbnail: false,
                imgUrl: url,
                imgAlt: '',
                tempId: timeStamp,
                fileExtension: fileExtension
            }
            setDataArr([...dataArr, newData]);
            setImageFileArr([...imageFileArr, newFile]);
        }
    };

    // const onUploadImages = async (arr) => {
    //     const promises = arr.map(async data => {
    //         const formData = new FormData();
    //         formData.append('imageFile', data.file);
    //         return await axios.post(`${API_URL}/uploadImg`, formData, {
    //             header: { 'Content-Type': 'multipart/form-data' }
    //         }).then(() => console.log('이미지 업로드 완료'));
    //     });
    //     return await Promise.all(promises);
    //     // for (const data of imageFileArr) {
    //     //     const formData = new FormData();
    //     //     formData.append('imageFile', data.file);
    //     //     await axios.post(`${API_URL}/uploadImg`, formData, {
    //     //         header: { 'Content-Type': 'multipart/form-data' }
    //     //     })
    //     // }
    // };

    const onSubmit = async (e) => {
        e.preventDefault();
        // for (const data of imageFileArr) {
        //     const formData = new FormData();
        //     formData.append('imageFile', data.file);
        //     formData.append('schoolId', data.schoolId);
        //     formData.append('tempId', data.tempId);
        //     await axios.post(`${API_URL}/uploadImg`, formData, {
        //         header: { 'Content-Type': 'multipart/form-data' }
        //     }).then((res)=> console.log(res.filename));
        // };
        const formData = new FormData();
        for (const data of imageFileArr) {
            formData.append(`files`, data);
        }
        await axios.post(`${API_URL}/uploadImg`, formData, {
            header: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
            console.log('다음 작업 진행')
            let editedDataArr = [];
            for (let i = 0; i < dataArr.length; i++) {
                if (dataArr[i]._id) {
                    const [dbData] = originData.filter(item => item._id === dataArr[i]._id);
                    if (JSON.stringify(dataArr[i]) === JSON.stringify(dbData)) {
                        continue;
                    } else {
                        editedDataArr.push(dataArr[i]);
                    }
                } else {
                    editedDataArr.push(dataArr[i]);
                }
            };

            axios.post(`${API_URL}/editGallery`, {
                editedData: editedDataArr,
                deletedData: deleteArr,
            })
                .then(res => {
                    navigate('/admin');
                })
                .catch(err => console.error(err));
        }).catch(error => console.error(error));
    };

    const onCancel = (e) => {
        e.preventDefault();
        navigate('/admin');
    };
    return (
        <form className='editGalForm' onSubmit={onSubmit}>
            <div className='imgListWrap'>
                <ul className='imgList'>
                    {
                        dataArr.length === 0 ? null :
                            dataArr.map((item, index, array) => {
                                return (<li key={index} onClick={e => onSelPic(e, index)}>
                                    <div className={`imgFrame ${selIdx === index ? 'selected' : ''} ${orderChanged.filter(fi => fi === item._id).length > 0 ? 'oc' : ''}`}>
                                        <div className='imgWrap'>

                                            <img src={item._id !== '' ? `${STORAGE_URL}/${item.imgUrl}` : item.imgUrl} alt={item.imgAlt} />
                                            <button className={
                                                item.isThumbnail
                                                    ? 'thumbnailBtn visible on'
                                                    : selIdx === index
                                                        ? 'thumbnailBtn visible off'
                                                        : originData.filter(fi => fi._id === item._id)[0].isThumbnail
                                                            ? 'thumbnailBtn visible on original'
                                                            : 'thumbnailBtn invisible off'
                                            } onClick={onSelThumbnail}><img src={chkIcon} alt='선택되지 않음' /><span>대표</span></button>
                                            <div className={selIdx === index && deleteArr.filter(data => data === item._id).length === 0 ? 'selBox visible' : 'selBox invisible'}>
                                                <div className='btnsArea'>
                                                    <button className='prevBtn' onClick={onMoveUp} disabled={selIdx === 0}>
                                                        <img src={prevIcon} alt='이전으로' />
                                                    </button>
                                                    <button className='nextBtn' onClick={onMoveDown} disabled={selIdx === dataArr.length - 1}>
                                                        <img src={nextIcon} alt='다음으로' />
                                                    </button>
                                                    <button className='delBtn' onClick={e => onDelete(e, dataArr[selIdx]._id)}>
                                                        <img src={deleteIcon} alt='삭제' />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={deleteArr.filter(data => data === item._id).length !== 0 ? 'deleting visible' : 'deleting invisible'}>
                                                <p>삭제대기</p>
                                                <button onClick={e => onDelete(e, item._id)}>
                                                    <img src={cancelDelBtn} alt={'삭제 취소'} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>);
                            })
                    }
                    <li className='newImage' onClick={onUploadFile}>
                        <input type='file' accept='image/jpg, image/jpeg, image/png' ref={fileInput} onChange={onChangefileInput} />
                        <div className={'imgFrame'}>
                            <div className='imgWrap'>
                                <img src={plusIcon} alt={'사진 추가'} />
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className='btnsArea'>
                <input type='submit' value={'적용'} disabled={!isChanged} />
                <button onClick={onCancel}>취소</button>
            </div>
        </form>
    );
}

export default EditGalleryForm;