import React, {ChangeEvent, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import TopBar from '../components/TopBar';
import '../styles/LoginPage.scss';
import { access } from 'fs';

function LoginPage() {
    const [userid, setUserid] = useState('');
    const [password, setPassword] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        if (name === 'userid') setUserid(value);
        if (name === 'password') setPassword(value);
      };

    const signin = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/api/login',
                data: {
                userid: userid,
                password: password,
                }
            });
            alert(res.data.msg);
            console.log(res.data);

            if(res.data.isError===false) {
                let accessToken= res.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                axios.defaults.headers.common['x-access-token'] = accessToken;
                navigate('/');
            }

        }catch (error) {
            console.log('error : ', error);
        }
    }

    const navigate = useNavigate();

    return ( 
        <>
            <TopBar/>
            <div className='login-container'>
                <div className='auth-title'>로그인</div>
                <div className='login-box'>
                    <div className='login-contents'>
                            <input type="text" placeholder='아이디를 입력해주세요' className='auth-content' name="userid" value={userid} onChange={onChangeHandler}/>
                            <input type="password" placeholder='비밀번호를 입력해주세요' className='auth-content' name="password" value={password} onChange={onChangeHandler}/>
                            <div className='find-info-container'>
                                <div className='infos'>
                                    <div className='find-content'>비밀번호 찾기</div>
                                    <div className='find-line'>|</div>
                                    <div className='find-content'>아이디 찾기</div>
                                </div>
                            </div>
                    </div>
                    <div className='authbtn-box'>
                        <button className='login-btn' onClick={()=>{signin()}}>로그인</button>
                        <button className='signup-btn' onClick={()=>{navigate('/signup')}}>회원가입</button>
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