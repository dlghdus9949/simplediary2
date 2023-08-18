import React, { useContext, useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({
    id,
    author,
    content,
    emotion,
    created_date,
}) => {

    const {onRemove, onEdit} = useContext(DiaryDispatchContext)

    const [isEdit, setIsEdit] = useState(false);
    const togleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();

    const handleRemove = () => {
        if(window.confirm(`${id+1}번째 일기를 삭제하시겠습니까?`)){
            onRemove(id);
        }
    };

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit = () => {

        if(localContent.length < 5){
            localContentInput.current.focus();
            return;
        }

        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
            onEdit(id, localContent);
            togleIsEdit();
        }

    }

    return (
        <div className="DiaryItem">
            <div className="info">
                <span>
                    작성자 : {author} | 감정점수 : {emotion}
                </span>
                <br/>
                <span className="date">
                    {new Date(created_date).toLocaleDateString()}
                </span>
            </div>
            <div className="content">
                {isEdit ? (
                    <>
                        <textarea 
                            ref={localContentInput}
                            value={localContent}
                            onChange={(e)=>setLocalContent(e.target.value)}
                        />
                    </>
                ) : (
                    <>{content}</>
                )}
            </div>
            {isEdit ? (
                <>
                    <button onClick={togleIsEdit}>취소</button>
                    <button onClick={handleEdit}>완료</button>
                </> 
            ) : (
                <>
                    <button onClick={handleRemove}>삭제</button>
                    <button onClick={togleIsEdit}>수정</button>
                </>
            )}
        </div>
    );
};

export default React.memo(DiaryItem);