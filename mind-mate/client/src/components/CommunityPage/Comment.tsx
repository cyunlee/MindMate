import '../../styles/CommentComponent.scss';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Comment(props:any) {

    const { isAuthor } = props;
    const writerClass = isAuthor ? 'comment-writer-nickname stroke' : 'comment-writer-nickname';
    const commentdotthree = require('../../image/commentdotthree.png');

    const commentContainerRef = useRef<HTMLDivElement>(null);
    const commentBtnRef = useRef<HTMLDivElement>(null);
    const [isCommentBtnOpen, setIsCommentBtnOpen] = useState(false);
    const dotthree = useRef<HTMLImageElement>(null);

    const accessToken = localStorage.getItem('accessToken');
    const [loginUserid, setLoginUserid] = useState();

    //로그인한 유저의 userid 확인하기
    const verifyUser = async() => {
        try{
            const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization : accessToken
                }
            })
            
            if(res.data.isError === false) {
                const decoded = res.data.decoded;
                setLoginUserid(decoded.userid);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const onCommentBtnHandler = () => {
        if(commentBtnRef.current && isCommentBtnOpen===false){
            commentBtnRef.current.classList.remove('vanish');
            setIsCommentBtnOpen(true);
        }else if(commentBtnRef.current && isCommentBtnOpen===true){
            commentBtnRef.current.classList.add('vanish');
            setIsCommentBtnOpen(false);
        }
    }

    const deleteComment = async() => {
        try{
            const res = await axios({
                method: 'delete',
                url: '/api/deletecomment',
                data: {
                    nickname: props.nickname,
                    createdAt: props.createdAt,
                    content: props.content
                }
            })
            console.log(res.data);
            if(res.data.isError===false){
                commentContainerRef.current?.classList.add('vanish');
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const onCommentDeleteHandler = () => {
        if(window.confirm('댓글을 삭제하시겠습니까?')){
            deleteComment();
        }else{
            window.close()
        }
    }

    useEffect(()=>{
        verifyUser()
    }, []);


    //댓글 작성자 아이디와 로그인 아이디가 같으면 dotthree를 보이게 함
    useEffect(()=>{
        if(props.userid!==loginUserid){
            dotthree.current?.classList.add('vanish');
        }else if(props.userid===loginUserid){
            dotthree.current?.classList.remove('vanish');
        }
    }, [verifyUser])

    return ( 
        <>
            <div className='comment-container' ref={commentContainerRef}>
                <div className='comment-writer-profileimg'></div>
                <div className='comment-right-content'>
                    <div className='comment-info-container'>
                        <div className='comment-info'>
                            <div className={writerClass}>{props.nickname}</div>
                            <div className='comment-dot'>·</div>
                            <div className='comment-createdat'>{props.createdAt}</div>
                        </div>  
                        <img src={commentdotthree} ref={dotthree} alt="" onClick={onCommentBtnHandler}/>
                    </div>
                    <div className='comment-content-text'>{props.content}</div>
                </div>
                <div className='comment-select-button vanish' ref={commentBtnRef}>
                    <div id='comment-update'>수정</div>
                    <div id='comment-delete' onClick={onCommentDeleteHandler}>삭제</div>
                </div>
            </div>
        </>
     );
}

export default Comment;