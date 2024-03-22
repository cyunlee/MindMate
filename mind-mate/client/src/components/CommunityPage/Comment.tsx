import '../../styles/CommentComponent.scss';

function Comment(props:any) {
    return ( 
        <>
            <div className='comment-container'>
                <div className='comment-writer-profileimg'></div>
                <div className='comment-right-content'>
                    <div className='comment-info'>
                        <div className='comment-writer-nickname'>{props.nickname}</div>
                        <div className='comment-dot'>·</div>
                        <div className='comment-createdat'>{props.createdAt}</div>
                    </div>
                    <div className='comment-content-text'>{props.content}</div>
                </div>
            </div>
        </>
     );
}

export default Comment;