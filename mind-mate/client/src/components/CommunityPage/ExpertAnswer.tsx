import '../../styles/ExpertAnswerComponent.scss';

function ExpertAnswer() {
    return ( 
        <>
            <div className='expert-answer-container'>
                <div className='expert-answer-topbar'>
                    <div className='expert-answer-profile'></div>
                    <div className='expert-answer-name'>발그레한 라이언</div>
                    <div className='expert-answer-time'>1분전</div>
                </div>
                <div className='expert-answer-title'>전문가의 답변입니다</div>
                <div className='expert-answer-body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium fugiat accusamus nihil voluptatibus iure necessitatibus sed ad reiciendis, id, eligendi quam ducimus repudiandae. Et magni explicabo distinctio laudantium rerum sed!</div>
            </div>
        </>
     );
}

export default ExpertAnswer;