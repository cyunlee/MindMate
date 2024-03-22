import '../styles/TopBar.scss';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


function TopBar() {
    const logoUrl = '/logo.png';
    const mypageIconUrl = '/user.png';
    const navigate = useNavigate();
    const location = useLocation();
    

    const isCommunityPage = location.pathname === '/community/all' || location.pathname === '/community/study' || location.pathname === '/community/money' || location.pathname === '/community/work' || location.pathname === '/community/love' || location.pathname === '/community/people' || location.pathname === '/community/general' 

    const isRoutinePage = location.pathname === '/routine';
    const isPlacesPage = location.pathname === '/places';
    const isConsultPage = location.pathname === '/consult';

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isExpired, setIsExpired] = useState<boolean>(false);

    const [userid, setUserid] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');

    const accessToken = localStorage.getItem('accessToken');
    
    const loginAgain = async (userid: string, password: string, nickname: string) => {
        try{
            const res = await axios({
                method: 'post',
                url: '/api/loginagain',
                data: {
                    userid: userid,
                    password: password,
                    nickname: nickname
                },
            })
            // console.log('연장 요청 승인 후 loginAgain으로 잘 보내지는 지 확인', userid, password, nickname);
            if(res.data.isError===false && accessToken) {

                localStorage.removeItem('accessToken');

                //새로운 토큰으로 대체하기
                const newToken= res.data.accessToken;
                localStorage.setItem('accessToken', newToken);
                axios.defaults.headers.common['x-access-token'] = newToken;

                const {userid} = res.data.userid;
                const {password} = res.data.password;
                const {nickname} = res.data.nickname;

                setUserid(userid);
                setPassword(password);
                setNickname(nickname);

                setIsLoggedIn(true);
                setIsExpired(false);
                console.log('재발급한 토큰 확인', newToken);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const handleLoginExtension = async() => {
        try {
            if(window.confirm('로그인 시간이 만료되었습니다. 연장하시겠습니까?')){
                const useridval = localStorage.getItem('userid');
                const passwordval = localStorage.getItem('password');
                const nicknameval = localStorage.getItem('nickname');

                if(useridval!==null && passwordval!==null && nicknameval!==null && useridval!==undefined && passwordval!==undefined && nicknameval!==undefined){
                    await loginAgain(useridval, passwordval, nicknameval);
                    alert('로그인 연장 성공');
                    window.location.reload();
                }
            }else{
                // localStorage.removeItem('accessToken');
                // localStorage.removeItem('userid');
                // localStorage.removeItem('password');
                // localStorage.removeItem('nickname')
                logout();
                alert('로그아웃 성공');
                window.location.reload();
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const getUserInfo = async () => {
        try{
            const res = await axios({
            method: 'get',
            url: '/api/verify',
            headers: {
                Authorization: accessToken
                }
            });

            //토큰이 만료되면 decoding이 안 되어서 userid, password, nickname에 아무 값도 없게 됨 -> 추후 로그인 연장 함수를 위한 기능
            // console.log('top bar decoded 결과>>>>>>', res.data.decoded);
            const {userid, nickname, password} = res.data.decoded;

            if(userid!==null && nickname!==null && password!==null && userid!==undefined && nickname!==undefined && password!==undefined){ //로그인 된 상태이고 다 값이 있을 때

                setUserid(userid);
                setPassword(password);
                setNickname(nickname);
    
                //그래서 로컬 스토리지에 아예 저장을 해버림
                localStorage.setItem('userid', userid);
                localStorage.setItem('password', password);
                localStorage.setItem('nickname', nickname);

                setIsLoggedIn(true);
                setIsExpired(false);
            }
           // console.log('클라이언트 변수 맨 처음 로그인 및 렌더 후 값 확인 >>>>', userid, password, nickname); 

        }catch(error:any){
            setIsLoggedIn(false);
            if(error.response?.status===401&&isLoggedIn===false){
                setIsExpired(true);
                if(isExpired===true){
                    handleLoginExtension();
                }
            }
        }
    }

    useEffect(()=>{
        if(accessToken) getUserInfo()
    },[isExpired])

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiredTime');
        localStorage.removeItem('userid');
        localStorage.removeItem('password');
        localStorage.removeItem('nickname');

        setIsLoggedIn(false);
        setIsExpired(true);

        // navigate('/login');
        // console.log(localStorage);
    }

    return ( 
        <>
            <div className='topbar'>
                <div className='top'>
                    <div className='top-btn-container'>
                        {isLoggedIn ? <div className='top-btn'>{userid}님</div> : <div className='top-btn' onClick={()=>{navigate('/signup')}}>회원가입</div>}
                        <div className='top-line'></div>
                        {isLoggedIn ? <div className='top-btn' onClick={()=>{logout(); alert('로그아웃 성공');}}>로그아웃</div> : <div className='top-btn' onClick={()=>{navigate('/login');}}>로그인</div>}
                        <div className='top-line'></div>
                        <button className='auth-btn'>전문가인증</button>
                    </div>
                    
                </div>
                <div className='bottom'>
                    <img className='logo' alt='logo' src={logoUrl} onClick={()=>{navigate('/')}}/>
                    <div className='bottom-btn-container'>
                        <div className={`bottom-btn ${isCommunityPage ? 'community' : ''}`} onClick={()=>{navigate('/community/all')}}>커뮤니티</div>
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