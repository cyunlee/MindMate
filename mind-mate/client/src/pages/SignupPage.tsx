import axios from 'axios';
import TopBar from '../components/TopBar';
import '../styles/SignupPage.scss';

function SignupPage() {
    return ( 
        <>
            <TopBar/>
            <div className='signup-container'>
                <div className='auth-title'>회원가입</div>
                <div className='signup-box'>
                    <div className='signup-contents'>
                        <div className='auth-container'>
                            <label htmlFor='id-input' className='auth-text'>아이디</label>
                            <input id='id-input'className='auth-content' placeholder='아이디를 입력해주세요'></input>
                        </div>
                        <div className='auth-container'>
                            <label htmlFor='pw-input' className='auth-text'>비밀번호</label>
                            <input id='pw-input' className='auth-content' type='password' placeholder='비밀번호를 입력해주세요'></input>
                        </div>
                        <div className='auth-container'>
                            <label htmlFor='pw-check' className='auth-text'>비밀번호확인</label>
                            <input id='pw-check' className='auth-content' type='password' placeholder='비밀번호를 한 번 더 입력해주세요'></input>
                        </div>
                        <div className='auth-nickname-container'>
                            <label htmlFor='nickname-input' className='auth-text'>닉네임</label>
                            <div className='auth-random-container'>
                                <input id='nickname-input' className='auth-content' placeholder='닉네임을 입력해주세요'></input>
                                <button className='random-btn'>랜덤생성</button>
                            </div>
                        </div>
                    </div>
                    <button className='signup-btn'>가입하기</button>
                </div>
                <div className='auth-line'>
                </div>
                <div className='authapi-box'>
                    <button className='kakao-signup-btn'></button>
                    <button className='naver-signup-btn'></button>
                </div>
            </div>
        </>
     );
}

export default SignupPage;