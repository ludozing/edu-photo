import React, { useEffect, useState } from 'react';
import useAsync from '../../../hooks/useAsync';
import axios from 'axios';
import { API_URL } from '../../../config/constants';
import { useNavigate } from 'react-router';
import EditNamePopup from './EditNamePopup';
import delIcon from '../../../images/delIcon.png';
import toGallIcon from '../../../images/toGallIcon.png';
import editNameIcon from '../../../images/editNameIcon.png';
import downIcon from '../../../images/downIcon.png';
import upIcon from '../../../images/upIcon.png';

function EditSchool({ schoolData }) {
    const [dataArr, setDataArr] = useState([]);
    const [selIdx, setSelIdx] = useState(-1);
    const [isChanged, setIsChanged] = useState(false);
    const [openEditName, setOpenEditName] = useState(false);
    const [deleteArr, setDeleteArr] = useState([]);
    const [nsName, setNsName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        setDataArr([...schoolData]);
    }, []);
    useEffect(() => {
        // 데이터 변화 체크
        const status = JSON.stringify(schoolData) !== JSON.stringify(dataArr);
        const status2 = deleteArr.length > 0
        console.log('3. ' + status || status2)
        setIsChanged(status || status2);
    }, [dataArr, deleteArr])

    const onClick = (e, index) => {
        e.preventDefault();
        if (selIdx === index) {
            setSelIdx(-1);
        } else {
            setSelIdx(index);
        }
    };
    const onEditName = (e, changedName) => {
        e.preventDefault();
        if(changedName==='') {
            window.alert('입력된 이름이 없습니다.')
            return;
        } else {
            // 현재 상태관리 중인 데이터 복사해서 변수에 담음
            let copiedDataArr = [...dataArr];
            // 선택한 데이터의 학교명을 변경 값으로 수정
            copiedDataArr[selIdx].schoolName = changedName;
            // 새로운 인덱스를 바탕으로 배열 소팅하여 새롭게 상태관리
            setDataArr(copiedDataArr.sort((a, b) => a.orderIdx - b.orderIdx));
            setOpenEditName(false);
        }
    };

    const onTypeNS = (e) => {
        e.preventDefault();
        setNsName(e.target.value);
    }
    const onCreateData = (e) => {
        e.preventDefault();
        const newSchool = {
            _id: '',
            schoolName: nsName,
            imgUrl: '',
            orderIdx: dataArr.length
        };
        setDataArr([...dataArr, newSchool]);
        setNsName('');
    }

    const onCancelCreatingData = (e) => {
        e.preventDefault();
        setNsName('');
    }

    // 선택한 학교의 순서를 선순위로 이동
    const onMoveUp = (e) => {
        e.preventDefault();
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
        setSelIdx(selIdx - 1);
    };

    // 선택한 학교의 순서를 후순위로 이동
    const onMoveDown = (e) => {
        e.preventDefault();
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
        setSelIdx(selIdx + 1);
    };

    const onDeleteData = (e, dataId) => {
        e.preventDefault();
        if (dataId.length === 0) {
            const copiedDataArr = [...dataArr];
            const filteredArr = copiedDataArr.filter(item => item.orderIdx !== selIdx);
            setDataArr(filteredArr.sort((a, b) => a.orderIdx - b.orderIdx));
            setSelIdx(-1);
        } else {
            const filteredArr = deleteArr.filter(item => item === dataId)
            if (filteredArr.length === 0) {
                setDeleteArr([...deleteArr, dataId]);
            } else {
                const copiedDArr = [...deleteArr];
                const filteredDArr = copiedDArr.filter(data => data !== filteredArr[0]);
                setDeleteArr(filteredDArr);
            }
        }
    }

    const onOpenModal = e => {
        e.preventDefault();
        setOpenEditName(true);
    };

    const onCloseModal = e => {
        e.preventDefault();
        e.stopPropagation();
        setOpenEditName(false);
    };

    const onCancel = (e) => {
        e.preventDefault();
        navigate(0);
    };

    const onNaviToEditGal = (e) => {
        e.preventDefault();
        if (dataArr[selIdx]._id.length <= 0) {
            window.alert('아직 등록되지 않은 학교입니다.')
            return;
        };
        if (isChanged) {
            if (deleteArr.filter(data => data === dataArr[selIdx]._id).length > 0) {
                window.alert('삭제 대기 중인 갤러리입니다.');
                return;
            } else if (window.confirm('변경사항이 저장되지 않았습니다. 저장하시겠습니까?')) {
                // 저장한다
                let editedDataArr = [];
                for (let i = 0; i < dataArr.length; i++) {
                    if (dataArr[i]._id) {
                        const [dbData] = schoolData.filter(item => item._id === dataArr[i]._id);
                        if (JSON.stringify(dataArr[i]) === JSON.stringify(dbData)) {
                            continue;
                        } else {
                            editedDataArr.push(dataArr[i]);
                        }
                    } else {
                        editedDataArr.push(dataArr[i]);
                    }
                };
                axios.post(`${API_URL}/editSchoolList`, { editedData: editedDataArr, deletedData: deleteArr }).then((res) => {
                    navigate(`/admin/${dataArr[selIdx]._id}`);
                }).catch(err => console.error(err));
            } else {
                // 저장하지 않는다
                navigate(`/admin/${dataArr[selIdx]._id}`);
            }
        } else {
            navigate(`/admin/${dataArr[selIdx]._id}`);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let editedDataArr = [];
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i]._id) {
                const [dbData] = schoolData.filter(item => item._id === dataArr[i]._id);
                if (JSON.stringify(dataArr[i]) === JSON.stringify(dbData)) {
                    continue;
                } else {
                    editedDataArr.push(dataArr[i]);
                }
            } else {
                editedDataArr.push(dataArr[i]);
            }
        };
        axios.post(`${API_URL}/editSchoolList`, { editedData: editedDataArr, deletedData: deleteArr }).then((res) => {
            navigate(`/`)
        }).catch(err => console.error(err));
    };

    return (
        <div className='editSchool'>
            <h2 className='title'>학교 리스트 수정</h2>
            <form onSubmit={onSubmit}>
                <div className='schoolListArea'>
                    <ul className='schoolList'>
                        {
                            dataArr.length === 0 ? null :
                                dataArr.map((item, index, array) => {
                                    return (
                                        <li key={index} onClick={e => onClick(e, index)} className={selIdx === index ? 'schoolBtn selected' : 'schoolBtn'}>
                                            <p>{item.schoolName}</p>
                                            <p>{deleteArr.filter(data => data === item._id).length === 0 ? '' : '삭제'}</p>
                                        </li>
                                    )
                                })
                        }
                        <li className='schoolBtn newSchool'>
                            <div className='inputArea'>
                                <input type='text' onChange={onTypeNS} value={nsName} placeholder='신규로 추가할 학교를 입력해주세요.' />
                                <button className='addNew' onClick={onCreateData}></button>
                            </div>
                            <button className={nsName===''?'cancelNew invisible':'cancelNew visible'} onClick={onCancelCreatingData}></button>
                        </li>
                    </ul>
                </div>
                <div className='btnsArea bottom'>
                    <input type='submit' value={'적용'} disabled={!isChanged} />
                    <button className='btn cancel' onClick={onCancel}>취소</button>
                </div>
                <div className='btnsArea side'>
                    <button className='goUp' onClick={onMoveUp} disabled={selIdx === -1 || selIdx === 0}>
                        <img src={upIcon} alt='위' />
                        </button>
                    <button className='goDown' onClick={onMoveDown} disabled={selIdx === -1 || selIdx === dataArr.length - 1}>
                        <img src={downIcon} alt='아래' />
                        </button>
                    <button className='editName' disabled={selIdx === -1} onClick={onOpenModal}>
                        <img src={editNameIcon} alt='수정' />
                    </button>
                    <button className='toGall' disabled={selIdx === -1} onClick={onNaviToEditGal}>
                        <img src={toGallIcon} alt='사진' />
                    </button>
                    <button className='delSchool' disabled={selIdx === -1} onClick={e => onDeleteData(e, dataArr[selIdx]._id)}>
                        <img src={delIcon} alt='삭제' />
                    </button>
                </div>
            </form>
            <EditNamePopup
                isOpen={openEditName}
                selectedData={selIdx === -1 ? null : dataArr[selIdx]}
                onClose={onCloseModal}
                onEditName={onEditName}
            />
            {/* <WarningPopup
                isOpen={openWarning}
                onClose */}
        </div>
    );
}

export default EditSchool;