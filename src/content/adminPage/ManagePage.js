import React, { useEffect, useMemo, useRef, useState } from 'react';
// import multer from 'multer';

function ManagePage(props) {
    const [selSchool, setSelSchool] = useState('');
    const [imageFile, setImageFile] = useState(null);    
    
    const formRef = useRef();
    const imageFileInputRef = useRef();
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, `public/images/${selSchool}`);
    //     },
    //     filename: function (req, file, cb) {
    //         // cb(null,)
    //     }
    // })
    const onChangeSelBox = (e) => {
        e.preventDefault();
        setSelSchool(e.target.value);
    };
    const onChangefileInput = (e) => {
        const fileList = e.target.files;
        const length = fileList?.length;
        if (fileList && fileList[0]) {
            const url = URL.createObjectURL(fileList[0]);

            setImageFile({
                file: fileList[0],
                thumbnail: url,
                type: fileList[0].type.slice(0, 5),
            });
        }
    };
    const showImage = useMemo(() => {
        if (!imageFile && imageFile == null) {
            return null
        }
        return <img src={imageFile.thumbnail} alt={imageFile.type} />;
    }, [imageFile])
    const onSubmit = (e) => {
        e.preventDefault();
        if (!selSchool) {
            window.alert('학교를 선택해주세요.');
        } else if (!imageFile) {
            window.alert('업로드된 이미지가 없습니다.');
        } else {
           
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit} ref={formRef}>

                <p>
                    <label htmlFor='school'>학교</label>
                    <select name='school' onChange={onChangeSelBox} defaultValue={''}>
                        <option value={''}>=선택=</option>
                        <option value={'gangnam'}>울산강남고등학교</option>
                        <option value={'haksung'}>학성고등학교</option>
                        <option value={'hyundai'}>현대고등학교</option>
                        <option value={'joongang'}>울산중앙고등학교</option>
                        <option value={'joongangGirls'}>울산중앙여자고등학교</option>
                        <option value={'mugeo'}>무거고등학교</option>
                        <option value={'shinjung'}>신정고등학교</option>
                        <option value={'shinsunGirls'}>신선여자고등학교</option>
                    </select>
                </p>
                <div>
                    {showImage}
                </div>
                <p>
                    <label htmlFor='imgFile'>파일</label>
                    <input name='imgFile' type="file" accept='image/jpg, image/jpeg, image/png' ref={imageFileInputRef} onChange={onChangefileInput}></input>
                </p>
                <p>
                    <input type='submit' value={'등록'} />
                </p>
            </form>
        </div>
    );
}

export default ManagePage;