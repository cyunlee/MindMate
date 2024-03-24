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
    console.log(postid);

    //로그인 여부 체크
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const accessToken = localStorage.getItem('accessToken');

    //댓글 등록 버튼 클릭
    const [isCommentBtnClicked, setIsCommentBtnClicked] = useState<boolean>(false);
    
    //디테일 포스트
    const [category, setCategory] = useState<any>();
    const [title, setTitle] = useState();
    const [nickname, setNickname] = useState();
    const [createdAt, setCreatedAt] = useState();
    const [content, setContent] = useState();
    const [userid, setUserid] = useState();

    const dotthreeRef = useRef<HTMLImageElement>(null);
    const postBtnRef = useRef<HTMLDivElement>(null);
    const [isPostBtnOpen, setIsPostBtnOpen] = useState<boolean>(false);

    //댓글 여닫기 여부
    const [isCommentOpen, setIsCommentOpen] = useState<boolean>(false);
    const commentsBox = useRef<HTMLDivElement>(null);

    //댓글 내용
    const [commentContent, setCommentContent] = useState<string>('');
    const commentRef = useRef<HTMLTextAreaElement>(null)

    //댓글 정보
    const [commentNickname, setCommentNickname] = useState<any>();
    const [isAuthor, setIsAuthor] = useState<boolean>(false);
    const [commentUserid, setCommentUserid] = useState<any>();

    //댓글 데이터 가져오기
    const [commentDatas, setCommentDatas] = useState([]);

    //답변 달기 버튼 유무(로그인 상태에 따라 달라짐)
    const createAnswerRef = useRef<HTMLButtonElement>(null);
    if(isLoggedin===true){
        if(createAnswerRef.current){
        createAnswerRef.current.classList.remove('vanish');
        }
    }

    //로그인 상태 확인하기 위해 (댓글 달 때 활용)
    const verifyUser = async() => {
        try{
            const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization : accessToken
                }
            })
            // console.log('verify user>>>>', res.data);
            if(res.data.isError === false) {
                setIsLoggedin(true);
                const decoded = res.data.decoded;
                // console.log('decoded>>>>', decoded);
                setCommentNickname(decoded.nickname);
                if(decoded.userid!==undefined) setCommentUserid(decoded.userid);
                
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
            console.log('detail post>>>>', detailPost);
            setCategory(detailPost.postType);
            setTitle(detailPost.title);
            setNickname(detailPost.nickname); 
            setCreatedAt(detailPost.createdAt);
            setContent(detailPost.content);
            if(detailPost.userid!==undefined) setUserid(detailPost.userid);

        }catch(error){
            console.log('error :', error);
        }
    } 

    const deletePost = async () => {
        try{
            const res = await axios({
                method: 'delete',
                url: '/api/deletepost',
                data: {
                    postid: postid
                }
            })
            console.log(res.data);
        }catch(error){
            console.log('error : ', error);
        }
    }

    if(commentUserid===userid) dotthreeRef.current?.classList.remove('vanish');
    else if(commentUserid!==userid) dotthreeRef.current?.classList.add('vanish');

    const onPostBtnHandler = () => {
        if(isPostBtnOpen===false){
            postBtnRef.current?.classList.remove('vanish');
            setIsPostBtnOpen(true);
        }else if(isPostBtnOpen===true){
            postBtnRef.current?.classList.add('vanish');
            setIsPostBtnOpen(false);
        }
    }

    const onPostUpdateHandler = () => {

    }

    const onCommentContentHandler = () => {
        if(commentRef.current){
            const commentRefContent = commentRef.current.value;
            setCommentContent(commentRefContent);
        }
    }

    const createComment = async () => {
        try {
            const res = await axios({
                method : 'post',
                url : '/api/postcomment',
                data : {
                    content : commentContent,
                    postid : postid,
                    nickname : commentNickname,
                    isauthor: isAuthor,
                    userid: commentUserid
                },
            })
            console.log(res.data);

        }catch (error) {
            console.log('error : ', error);
        }
    }

    const getAllComment = async() => {
        try{
            const res = await axios({
                method: 'get',
                url: '/api/getcomment',
                params: {
                    postid: postid
                }
            })
            setCommentDatas(res.data.comments);
        }catch(error){
            console.log('error : ', error);
        }
    }

    useEffect(()=>{
        if(isCommentOpen===true && commentsBox.current){
            commentsBox.current.classList.remove('vanish')
        }else if(isCommentOpen===false && commentsBox.current){
            commentsBox.current.classList.add('vanish');
        }
    }, [handleCommentOpen])

    useEffect(()=>{
        getDetailPost();
        verifyUser();
    }, [])

    useEffect(()=>{
        getAllComment();
        console.log(commentDatas);
    }, [isCommentOpen, isCommentBtnClicked])

    useEffect(()=>{
        if(userid===commentUserid) {console.log('최종', userid); console.log('최종', commentUserid); setIsAuthor(true)};
    }, [isCommentOpen])


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
                                <img src={dotthree} ref={dotthreeRef} className='post-dotthree vanish' alt="" onClick={()=>{onPostBtnHandler()}} />
                                <div className='post-select-button vanish' ref={postBtnRef}>
                                    <div id='post-update' onClick={onPostUpdateHandler}>수정</div>
                                    <div id='post-delete' onClick={()=>{if(window.confirm('포스트를 삭제하시겠습니까?')){deletePost(); window.location.href=('/community/all')}}}>삭제</div>
                                </div>
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
                                <img src={commentdefault} alt="" onClick={handleCommentOpen}  />
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
                                <div className='comment-count'>{commentContent.length}/1000</div>
                                <button onClick={()=>{
                                    if(commentContent?.length){createComment(); getAllComment();}
                                    else{alert('댓글을 입력해야 등록할 수 있습니다')}}
                                }>댓글등록</button>
                            </div>
                        </div>
                        <div className='comments-box'>     
                            {
                                ( commentDatas.length > 0 ? 
                                    commentDatas.slice(0).reverse().map((commentData:any, index:any)=>(
                                        <Comment key={index}
                                                 nickname={commentData.nickname}
                                                 content={commentData.content}
                                                 createdAt={commentData.createdAt}
                                                 isAuthor={commentData.isauthor}
                                                 userid={commentData.userid}
                                                />
                                ))
                                : <div className='comment-none'>댓글이 없습니다. 댓글을 입력해볼까요?</div>
                            )
                                
                        }
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