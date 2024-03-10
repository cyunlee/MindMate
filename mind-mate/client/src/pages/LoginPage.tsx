import axios from 'axios';
import TopBar from '../components/TopBar';
import '../styles/LoginPage.scss';

function LoginPage() {
    return ( 
        <>
            <TopBar/>
            <div className='login-container'>
                <div className='auth-title'>로그인</div>
                <div className='login-box'>
                    <div className='login-contents'>
                            <input type="text" placeholder='아이디를 입력해주세요' className='auth-content' />
                            <input type="password" placeholder='비밀번호를 입력해주세요' className='auth-content' />
                            <div className='find-info-container'>
                                <div className='infos'>
                                    <div className='find-content'>비밀번호 찾기</div>
                                    <div className='find-line'>|</div>
                                    <div className='find-content'>아이디 찾기</div>
                                </div>
                            </div>
                    </div>
                    <div className='authbtn-box'>
                        <button className='login-btn'>로그인</button>
                        <button className='signup-btn'>회원가입</button>
                    </div>
                </div>
                <div className='auth-line'></div>
                <div className='apilogin-box'>
                    <button className='naver-login-btn'></button>
                    <button className='kakao-login-btn'></button>
                 </div>
            </div>
        </>
     );
}

export default LoginPage;