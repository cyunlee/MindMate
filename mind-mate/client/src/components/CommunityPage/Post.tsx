import '../../styles/PostComponent.scss';

function Post(props: any) {

    const heartEmoji = require('../../image/heart.png');
    const commentEmoji = require('../../image/comment.png');
    const eyeEmoji = require('../../image/eye.png');
   
    return ( 
        <>
            <div className='postdiv-container'>
                <div className='postcontent-container'>
                    <div className='postcontent-box'>
                        <div id='postcontent-title'>{props.title}</div>
                        <div id='postcontent-time'>{props.createdAt}</div>
                    </div>
                    <div className='postcontent-box'>
                        <div id='postcontent-photo'></div>
                        <div id='postcontent-name'>{props.nickname}</div>
                        <div id='postcontent-category'>{props.category}</div>
                    </div>
                    <div className='postcontent-box'>
                        <div className='postemoji-box'>
                            <img className='emoji' src={heartEmoji} alt='좋아요'/>
                            <div className='postinfo-num'>10</div>
                        </div>
                        <div className='postemoji-box'>
                            <img className='emoji' src={commentEmoji} alt='댓글'/>
                            <div className='postinfo-num'>10</div>
                        </div>
                        <div className='postemoji-box'>
                            <img className='emoji' src={eyeEmoji} alt='조회수'/>
                            <div className='postinfo-num'>456</div>
                        </div>
                    </div>
                </div>
                <div className='postanswer-container'>
                    <div className='response-box'>
                        <div className='response-title'>전문 답변</div>
                        <div className='response-number'>2</div>
                    </div>
                    <div className='response-box'>
                        <div className='response-title'>일반 답변</div>
                        <div className='response-number'>0</div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Post;