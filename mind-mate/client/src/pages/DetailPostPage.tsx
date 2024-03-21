import React, {ChangeEvent, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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

    const {postid} = useParams();
    
    const [category, setCategory] = useState<any>();
    const [title, setTitle] = useState();
    const [nickname, setNickname] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [content, setContent] = useState();
    

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

    const getDetailPost = async() => {
        try {
            const res = await axios({
                method: 'get',
                url: '/api/getdetailpost',
                params: {
                    postid: postid
                }
            })
            const detailPost = res.data.detailPost;
            setCategory(detailPost.postType);
            setTitle(detailPost.title);
            setNickname(detailPost.nickname);
            setCreatedAt(detailPost.createdAt);
            setContent(detailPost.content);
        }catch(error){
            console.log('error :', error);
        }
    } 

    useEffect(()=>{
        if(isCommentOpen===true && commentsBox.current){
            commentsBox.current.classList.remove('vanish');
        }else if(isCommentOpen===false && commentsBox.current){
            commentsBox.current.classList.add('vanish');
        }
    }, [handleCommentOpen])

    useEffect(()=>{
        getDetailPost()
    }, [])


    return ( 
        <>
            <TopBar/>
            <div className='detailpost-container'>
                <div className='singlepost-container'>
                    <div className='singlepost-top-container'>
                        <div className='singlepost-category'>커뮤니티|Q&A<img src={arrowright} alt="" /> <span >{category}</span></div>
                        <div className='singlepost-title'>{title}</div>
                        <div className='singlepost-topbar-container'>
                            <div className='singlepost-info-box'>
                                <div id='singlepost-info-profile'></div>
                                <div id='singlepost-info-nickname'>{nickname}</div>
                                <img src={eyes} alt="조회수" />
                                <div id='singlepost-info-count'>456</div>
                                <div id='singlepost-info-dot'>·</div>
                                <div id='singlepost-info-date'>{createdAt}</div>
                            </div>
                            <div className='singlepost-action-box'>
                                <img src={share} alt="" />
                                <img src={dotthree} alt="" />
                            </div>
                        </div>
                    </div>     
                    <div id='singlepost-content'>{content}</div>
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