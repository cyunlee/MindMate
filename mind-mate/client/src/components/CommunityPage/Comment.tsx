import '../../styles/CommentComponent.scss';

function Comment(props:any) {

    const { isAuthor } = props;
    const writerClass = isAuthor ? 'comment-writer-nickname stroke' : 'comment-writer-nickname';
    const commentdotthree = require('../../image/commentdotthree.png');

    return ( 
        <>
            <div className='comment-container'>
                <div className='comment-writer-profileimg'></div>
                <div className='comment-right-content'>
                    <div className='comment-info-container'>
                        <div className='comment-info'>
                            <div className={writerClass}>{props.nickname}</div>
                            <div className='comment-dot'>·</div>
                            <div className='comment-createdat'>{props.createdAt}</div>
                        </div>  
                        <img src={commentdotthree} alt="" />
                    </div>
                    <div className='comment-content-text'>{props.content}</div>
                </div>
            </div>
        </>
     );
}

export default Comment;