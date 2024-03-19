import React, { useState, useEffect, useRef } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

import TopBar from "../components/TopBar";
import '../styles/WritePostPage.scss';


function WritePostPage() {

    const [category, setCategory] = useState('');
    const [title, setTitle] = useState<String>("");
    const [content, setContent] = useState('');

    const categoryRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const navigate = useNavigate();

    const onCategoryHandler = () => {
        const categoryVal : any = categoryRef.current?.value;
        setCategory(categoryVal);
    }

    const onTitleHandler = () => {
        const titleVal = titleRef.current?.value;
        setTitle(titleVal || ''); //titleVal이 undefined일 경우 ''으로 state 설정
    }

    const onContentHandler = () => {
        const contentVal = contentRef.current?.value
        setContent(contentVal || ''); //contentVal이 undefined일 경우 ''으로 state 설정
    }

    const accessToken = localStorage.getItem('accessToken');

    //글 출간하는 함수
    const writePost = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/writepost',
                data: {
                    category: category,
                    title: title,
                    content: content,
                },
                headers: {
                    Authorization: accessToken
                }
            })
            console.log(res.data);
            navigate('/community');

        } catch (error) {
        console.log('error : ', error);
         }
    }


    return ( 
        <>
            <TopBar/>
            <div className='writepost-container'>
                <div className='writepost-banner'>
                    <div className='writepost-content-title'>글 작성하기</div>
                    <div className='writepost-content'>마음 속 고민을 털어두고 전문가와 이용자들에게 답변을 받아보세요</div>
                </div>
                <div className='writepost-line'></div>
                <div className='writepost-content'>
                    <div className='writepost-title'>카테고리</div>
                    <select id='writepost-category-select' ref={categoryRef} onChange={onCategoryHandler}>
                        <option disabled selected>카테고리를 선택해주세요</option>
                        <option value="학업·진로">학업·진로</option>
                        <option value="금전·사업">금전·사업</option>
                        <option value="직장">직장</option>
                        <option value="연애">연애</option>
                        <option value="대인관계">대인관계</option>
                        <option value="일반고민">일반고민</option>
                    </select>
                </div>
                <div className='writepost-content'>
                    <div className='writepost-title'>제목</div>
                    <input id='writepost-title-input' placeholder="제목을 입력해주세요" ref={titleRef} onChange={onTitleHandler}></input>
                </div>
                <div className='writepost-content'>
                    <div className='writepost-title'>본문</div>
                    <textarea id='writepost-article-input' placeholder="내용을 입력해주세요" ref={contentRef} onChange={onContentHandler}></textarea>
                </div>
                <div className='writepost-btn-container'>
                    {/* <button id='temporary-save'>임시저장</button> */}
                    <button id='complete-post' onClick={()=>{writePost()}}>출간하기</button>
                </div>
            </div>           
        </>
     );
}

export default WritePostPage;