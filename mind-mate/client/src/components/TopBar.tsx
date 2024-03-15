import '../styles/TopBar.scss';
import { useNavigate } from 'react-router-dom';

function TopBar() {
    const logoUrl = '/logo.png';
    const mypageIconUrl = '/user.png';
    const navigate = useNavigate();
    return ( 
        <>
            <div className='topbar'>
                <div className='top'>
                    <div className='top-btn-container'>
                        <div className='top-btn' onClick={()=>{navigate('/signup')}}>회원가입</div>
                        <div className='top-line'></div>
                        <div className='top-btn' onClick={()=>{navigate('/login')}}>로그인</div>
                        <div className='top-line'></div>
                        <button className='auth-btn'>전문가인증</button>
                    </div>
                    
                </div>
                <div className='bottom'>
                    <img className='logo' alt='logo' src={logoUrl} onClick={()=>{navigate('/')}}/>
                    <div className='bottom-btn-container'>
                        <div className='bottom-btn'>커뮤니티</div>
                        <div className='bottom-btn'>주변장소</div>
                        <div className='bottom-btn'>루틴관리</div>
                        <div className='bottom-btn'>상담하기</div>
                    </div>
                    <img className='mypage-icon' alt='mypage-icon' src={mypageIconUrl}/>
                </div>
            </div>
        </>
     );
}

export default TopBar;