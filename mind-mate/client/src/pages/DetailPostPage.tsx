import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useRef } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import '../styles/DetailPostPage.scss';
import Comment from '../components/CommunityPage/Comment';

function DetailPostPage() {
    const arrowright = require('../image/arrow-right.png');
    const eyes = require('../image/eye.png');
    const heartdefault = require('../image/bigheartdefault.png');
    const commentdefault = require('../image/bigcommentdefault.png');
    const share = require('../image/share.png');
    const dotthree = require('../image/dotthree.png');
    
    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);

    const commentsBox = useRef<HTMLDivElement>(null);

    const handleCommentOpen = () => {
        switch(isCommentOpen){
            case false :
                setIsCommentOpen(true);
                break;
            case true :
                setIsCommentOpen(false);
                break;
        }
    }

    useEffect(()=>{
        if(isCommentOpen===true && commentsBox.current){
            commentsBox.current.classList.remove('vanish');
        }else if(isCommentOpen===false && commentsBox.current){
            commentsBox.current.classList.add('vanish');
        }
    }, [handleCommentOpen])


    return ( 
        <>
            <TopBar/>
            <div className='detailpost-container'>
                <div className='singlepost-container'>
                    <div className='singlepost-top-container'>
                        <div className='singlepost-category'>커뮤니티|Q&A<img src={arrowright} alt="" /> <span >학업, 진로</span></div>
                        <div className='singlepost-title'>영어로는 타이틀 한글로는 제목입니당</div>
                        <div className='singlepost-topbar-container'>
                            <div className='singlepost-info-box'>
                                <div id='singlepost-info-profile'></div>
                                <div id='singlepost-info-nickname'>부끄러운 어피치</div>
                                <img src={eyes} alt="조회수" />
                                <div id='singlepost-info-count'>456</div>
                                <div id='singlepost-info-dot'>·</div>
                                <div id='singlepost-info-date'>하루 전</div>
                            </div>
                            <div className='singlepost-action-box'>
                                <img src={share} alt="" />
                                <img src={dotthree} alt="" />
                            </div>
                        </div>
                    </div>     
                    <div id='singlepost-content'>안녕하세요 반가워요</div>
                    <div className='singlepost-bottombar-container'>
                        <div className='singlepost-reaction-box'>
                            <div className='singlepost-heart-box'>
                                <img src={heartdefault} alt="" />
                                <div className='singlepost-reaction-text'>0</div>
                            </div>
                            <div className='singlepost-comment-box'>
                                <img src={commentdefault} alt="" onClick={handleCommentOpen} />
                                <div className='singlepost-reaction-text'>10</div>
                            </div>
                        </div>
                        <button id='write-answer'>답변작성</button>
                    </div>

                    <div className='post-comments-container vanish' ref={commentsBox}>
                        <div className='comment-input-box'>
                            <div className='comment-input-top'>
                                <div id='writer-profileimg'></div>
                                <textarea></textarea>
                            </div>
                            <div className='comment-input-bottom'>
                                <button>댓글등록</button>
                            </div>
                        </div>
                        <div className='comments-box'>
                            <Comment/>
                            <Comment/>
                        </div>
                    </div> 
                    
                </div>
                <div className='answers-container'>
                    <div id='answers-text'><span id='expert-num'>1</span>개의 전문답변과 <span id='general-num'>1</span>개의 일반답변이 있습니다</div>
                    <div className='expertanswer-container'></div>
                    <div className='generalanswer-container'></div>
                </div>
            </div>
            
        </>
     );
}

export default DetailPostPage;