import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ExpertAuthComponent.scss';
import axios from 'axios';

function ExpertAuth() {

    const modalclose = require('../image/modalclose.png');
    const sendemail = require('../image/sendemail.png');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);
    const input3 = useRef<HTMLInputElement>(null);
    const input4 = useRef<HTMLInputElement>(null);
    const input5 = useRef<HTMLInputElement>(null);

    const [userId, setUserId] = useState<string>("");
    const [userSelectAddr, setUserSelectAddr] = useState<string>("naver.com");

    const userIdRef = useRef<HTMLInputElement>(null);
    const userSelectRef = useRef<HTMLSelectElement>(null);

    const [userEmail, setUserEmail] = useState<string>("");

    const [serverNum, setServerNum] = useState<string>("");
    const [userNum, setUserNum] = useState<number>(0);

    const [input1Num, setInput1Num] = useState<string>("");
    const [input2Num, setInput2Num] = useState<string>("");
    const [input3Num, setInput3Num] = useState<string>("");
    const [input4Num, setInput4Num] = useState<string>("");
    const [input5Num, setInput5Num] = useState<string>("");

    const accessToken = localStorage.getItem('accessToken');

    const [loginUserId, setLoginUserId] = useState<string>("");

    const navigate = useNavigate();

    const onInput1FocusHandler = (e:any) => {
        //다음 칸으로 자동으로 넘어가기
        if(input1.current?.value.length===1 && e.target.value.length===1) input2.current?.focus();
        setInput1Num(e.target.value);
    }

    const onInput2FocusHandler = (e:any) => {
        if(input2.current?.value.length===1 && e.target.value.length===1) input3.current?.focus();
        setInput2Num(e.target.value);
    }

    const onInput3FocusHandler = (e:any) => {
        if(input3.current?.value.length===1 && e.target.value.length===1) input4.current?.focus();
        setInput3Num(e.target.value);
    }

    const onInput4FocusHandler = (e:any) => {
        if(input4.current?.value.length===1 && e.target.value.length===1) input5.current?.focus();
        setInput4Num(e.target.value);
    }

    const onInput5FocusHandler = (e:any) => {
        setInput5Num(e.target.value);
    }

    useEffect(()=>{
        const inputNum = input1Num + input2Num + input3Num + input4Num + input5Num;
        //inputNum은 string
        setUserNum(parseInt(inputNum));
        console.log(userNum);
        
    }, [input1Num, input2Num, input3Num, input4Num, input5Num])

    const onUserIdHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUserId(e.target.value);
    }

    const onUserSelectAddrHandler = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setUserSelectAddr(e.target.value);
    }

    useEffect(()=>{
        if(userId!==undefined && userSelectAddr!==undefined){
            const email = userId + "@" + userSelectAddr;
            setUserEmail(email);
        }
    }, [userId, userSelectAddr])

    //로그인한 유저의 userid 확인하기
    const verifyUser = async() => {
        try{
            const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization : accessToken
                }
            })
            
            if(res.data.isError === false) {
                const decoded = res.data.decoded;
                setLoginUserId(decoded.userid);
            }
        }catch(error){
            console.log('error : ', error);
        }
    }

    const compareNumber = async () => {
        try{
            if(parseInt(serverNum)===userNum){

                const res = await axios({
                    method: 'patch',
                    url: '/api/expertauth',
                    data: {
                        email: userEmail,
                        isExpert: true,
                        userid: loginUserId
                    },
                })
                console.log(res.data);
                console.log('loginUser>>>>>', loginUserId);
                if(res.data.isError===false){
                    alert('인증 성공');
                    logout();
                    alert('다시 로그인해주세요');
                    navigate('/login');
                }
                
            }else{
                alert('인증 실패')
            }

        }catch(error){
            console.log('error :', error);
        }
    }

    const sendEmail = async() => {
        try{
            const res = await axios({
                method: 'post',
                url: '/api/sendmail',
                data: {
                    email: userEmail
                }
            })
            alert('메일이 발송되었습니다')
            console.log(res.data.randomNum);
            setServerNum(res.data.randomNum); 
        }catch(error){
            console.log('error : ', error);
        }
    }
    
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('expiredTime');
        localStorage.removeItem('userid');
        localStorage.removeItem('password');
        localStorage.removeItem('nickname');
        localStorage.removeItem('isExpert');
    }

    useEffect(()=>{
        verifyUser()
    }, [])

    return ( 
        <>
            {isModalOpen===true&&
            <div className='expertauth-background'>
                <div className='expertauth'>
                    <div className='expertauth-top'>
                        <div className='expertauth-title'>전문가 인증</div>
                        <img src={modalclose} alt="" onClick={()=>{setIsModalOpen(false)}} />
                    </div>
                    <div className='expertauth-first'>
                        <div className='expertauth-subtitle'><span>&#91;1단계&#93;</span> 인증메일 입력</div>
                        <div className='expertauth-description'>전문가 인증을 진행할 이메일을 입력해주세요</div>
                        <div className='expertauth-email'>
                            <input type="text" onChange={onUserIdHandler} ref={userIdRef} />
                            <div>@</div>
                            <select name="" id="" onChange={onUserSelectAddrHandler} ref={userSelectRef}>
                                <option value="" disabled>이메일 주소</option>
                                <option value="naver.com">naver.com</option>
                                <option value="hanmail.com">hanmail.net</option>
                                <option value="kakao.com">kakao.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="nate.com">nate.com</option>
                            </select>
                            <img src={sendemail} alt="" onClick={()=>{sendEmail()}}/>
                        </div>
                    </div>
                    <div className='expertauth-second'>
                        <div className='expertauth-subtitle'><span>&#91;2단계&#93;</span> 인증번호 입력</div>
                        <div className='expertauth-description'>이메일로 받은 인증번호를 입력해주세요</div>
                        <div className='expertauth-numbers'>
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input1} onChange={onInput1FocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input2} onChange={onInput2FocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input3} onChange={onInput3FocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input4} onChange={onInput4FocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input5} onChange={onInput5FocusHandler} />
                        </div>
                        <div className='expertauth-description'>제한시간 <span>3:00</span> 남았습니다</div>
                    </div>
                    <div className='expertauth-btnset'>
                        <button onClick={()=>{sendEmail()}}>다시 전송</button>
                        <button onClick={()=>{compareNumber()}}>제출 완료</button>
                    </div>
                </div>
            </div>
            }   
        </>
     );
}

export default ExpertAuth;