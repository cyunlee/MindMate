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

    const {postid} = useParams();

    //로그인 여부 체크
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const accessToken = localStorage.getItem('accessToken');
    
    //디테일 포스트
    const [category, setCategory] = useState<any>();
    const [title, setTitle] = useState();
    const [nickname, setNickname] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [content, setContent] = useState();

    //댓글 여닫기
    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
    const commentsBox = useRef<HTMLDivElement>(null);

    //댓글 내용
    const [commentContent, setCommentContent] = useState<string>();
    const commentRef = useRef<HTMLTextAreaElement>(null)

    //답변 달기
    const createAnswerRef = useRef<HTMLButtonElement>(null);
    if(isLoggedin===true){
        if(createAnswerRef.current){
        createAnswerRef.current.classList.remove('vanish');
        }
    }


    const verifyUser = async() => {
        try{
            const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization : accessToken
                }
            })
            console.log(res.data);
            if(res.data.isError === false) {
                setIsLoggedin(true);
            }else if(res.data.isError === true) {
                setIsLoggedin(false);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }  
    

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

    const onCommentContentHandler = () => {
        if(commentRef.current){
            const commentRefContent = commentRef.current.value;
            setCommentContent(commentRefContent);
        }
        console.log(commentContent);
    }

    const createComment = async () => {
        try {
            const res = await axios({
                method : 'post',
                url : '/api/postcomment',
                data : {
                    content : commentContent,
                    postid : postid
                },
                headers : {
                    Authorization : accessToken
                }
            })
            console.log(res.data);
        }catch (error) {
            console.log('error : ', error);
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
        verifyUser()
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
                        <button id='write-answer' className='answerBtn vanish' ref={createAnswerRef}>답변작성</button>
                    </div>

                    <div className='post-comments-container vanish' ref={commentsBox}>
                        <div className='comment-input-box'>
                            <div className='comment-input-top'>
                                <div id='writer-profileimg'></div>
                                <textarea ref={commentRef} onChange={onCommentContentHandler} onClick={()=>{if(isLoggedin===false) alert('로그인을 해야 이용하실 수 있습니다')}} ></textarea>
                            </div>
                            <div className='comment-input-bottom'>
                                <button onClick={()=>{if(commentContent?.length)createComment(); else{alert('댓글을 입력해야 등록할 수 있습니다')}}}>댓글등록</button>
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