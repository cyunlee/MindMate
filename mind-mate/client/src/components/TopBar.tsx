import '../styles/TopBar.scss';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';


function TopBar() {
    const logoUrl = '/logo.png';
    const mypageIconUrl = '/user.png';
    const navigate = useNavigate();
    const location = useLocation();

    const isCommunityPage = location.pathname === '/community' || location.pathname === '/community/study' || location.pathname === '/community/money' || location.pathname === '/community/work' || location.pathname === '/community/love' || location.pathname === '/community/people' || location.pathname === '/community/general'
    const isRoutinePage = location.pathname === '/routine';
    const isPlacesPage = location.pathname === '/places';
    const isConsultPage = location.pathname === '/consult';

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userid, setUserid] = useState('');

    useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken');

        const getUserInfo = async () => {
            try{
                const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization: accessToken
                    }
                });
                const verifyid = res.data.decoded?.userid;
                if(verifyid!==undefined){
                    setUserid(verifyid);
                    setIsLoggedIn(true);
                }else if(verifyid===undefined){
                    setIsLoggedIn(false);
                }
            }catch(err){
                console.log(err);
            }
        }

        if(accessToken) {
            getUserInfo();    
        }else if(!accessToken) {
            setIsLoggedIn(false);
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiredTime');

        setIsLoggedIn(false);

        alert('로그아웃 성공');
        navigate('/login');
        console.log(localStorage);
    }

    return ( 
        <>
            <div className='topbar'>
                <div className='top'>
                    <div className='top-btn-container'>
                        {isLoggedIn ? <div className='top-btn'>{userid}님</div> : <div className='top-btn' onClick={()=>{navigate('/signup')}}>회원가입</div>}
                        <div className='top-line'></div>
                        {isLoggedIn ? <div className='top-btn' onClick={()=>{logout()}}>로그아웃</div> : <div className='top-btn' onClick={()=>{navigate('/login')}}>로그인</div>}
                        <div className='top-line'></div>
                        <button className='auth-btn'>전문가인증</button>
                    </div>
                    
                </div>
                <div className='bottom'>
                    <img className='logo' alt='logo' src={logoUrl} onClick={()=>{navigate('/')}}/>
                    <div className='bottom-btn-container'>
                        <div className={`bottom-btn ${isCommunityPage ? 'community' : ''}`} onClick={()=>{navigate('/community')}}>커뮤니티</div>
                        <div className={`bottom-btn ${isPlacesPage ? 'places' : ''}`} onClick={()=>{navigate('/places')}}>주변장소</div>
                        <div className={`bottom-btn ${isRoutinePage ? 'routine' : ''}`} onClick={()=>{navigate('/routine')}}>루틴관리</div>
                        <div className={`bottom-btn ${isConsultPage ? 'consult' : ''}`} onClick={()=>{navigate('/consult')}}>상담하기</div>
                    </div>
                    <img className='mypage-icon' alt='mypage-icon' src={mypageIconUrl}/>
                </div>
            </div>
        </>
     );
}

export default TopBar;