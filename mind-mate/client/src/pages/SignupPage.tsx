import axios from 'axios';
import TopBar from '../components/TopBar';
import '../styles/SignupPage.scss';

function SignupPage() {
    return ( 
        <>
            <TopBar/>
            <div className='signup-container'>
                <div className='auth-title'>회원가입</div>
                <div className='auth-content'>아이디</div>
                <div className='auth-content'>비밀번호</div>
                <div className='auth-content'>비밀번호 확인</div>
                <div className='auth-content'>닉네임</div>
            </div>
        </>
     );
}

export default SignupPage;