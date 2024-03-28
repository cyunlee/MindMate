import '../../styles/GeneralAnswerComponent.scss'

function GenralAnswer() {
    return ( 
        <>
            <div className='general-answer-container'>
                <div className='general-answer-topbar'>
                    <div className='general-answer-profile'></div>
                    <div className='general-answer-name'>부끄러운 어피치</div>
                    <div className='general-answer-time'>1분전</div>
                </div>
                <div className='general-answer-title'>일반회원의 답변입니다</div>
                <div className='general-answer-body'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro delectus illum quo esse odit facere deleniti nobis blanditiis doloribus! Sapiente, molestias sunt. Ratione minus at voluptas? Aperiam alias eum facilis.</div>
            </div>
        </>
     );
}

export default GenralAnswer;