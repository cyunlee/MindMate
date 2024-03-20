import '../../styles/CommentComponent.scss';

function Comment() {
    return ( 
        <>
            <div className='comment-container'>
                <div className='comment-writer-profileimg'></div>
                <div className='comment-right-content'>
                    <div className='comment-info'>
                        <div className='comment-writer-nickname'>나는별빛무지개123</div>
                        <div className='comment-dot'>·</div>
                        <div className='comment-createdat'>약 1분전</div>
                    </div>
                    <div className='comment-content-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit mollitia quaerat sint ea odit, rerum deserunt iste! Voluptatibus similique sunt, veniam nemo, non consequuntur accusantium provident vitae at fugit quisquam!</div>
                </div>
            </div>
        </>
     );
}

export default Comment;