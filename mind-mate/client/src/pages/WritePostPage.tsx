import TopBar from "../components/TopBar";
import '../styles/WritePostPage.scss';

function WritePostPage() {
    return ( 
        <>
            <TopBar/>
            <div className='writepost-container'>
                <div className='writepost-banner'>
                    <div className='writepost-content-title'>글 작성하기</div>
                    <div className='writepost-content'>마음 속 고민을 털어두고 전문가와 이용자들에게 답변을 받아보세요</div>
                </div>
                <div className='writepost-line'></div>
                <div className='writepost-content'>
                    <div className='writepost-title'>카테고리</div>
                    <select id='writepost-category-select' >
                        <option value="" disabled selected>카테고리를 선택해주세요</option>
                        <option value="">학업·진로</option>
                        <option value="">금전·사업</option>
                        <option value="">직장</option>
                        <option value="">연애</option>
                        <option value="">대인관계</option>
                        <option value="">일반 고민</option>
                    </select>
                </div>
                <div className='writepost-content'>
                    <div className='writepost-title'>제목</div>
                    <input id='writepost-title-input' placeholder="제목을 입력해주세요"></input>
                </div>
                <div className='writepost-content'>
                    <div className='writepost-title'>본문</div>
                    <textarea id='writepost-article-input' placeholder="내용을 입력해주세요"></textarea>
                </div>
                <div className='writepost-btn-container'>
                    <button id='temporary-save'>임시저장</button>
                    <button id='complete-post'>출간하기</button>
                </div>
            </div>           
        </>
     );
}

export default WritePostPage;