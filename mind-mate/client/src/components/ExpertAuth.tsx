import { useEffect, useRef, useState } from 'react';
import '../styles/ExpertAuthComponent.scss';

function ExpertAuth() {

    const modalclose = require('../image/modalclose.png');
    const sendemail = require('../image/sendemail.png');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

    const input1 = useRef<HTMLInputElement>(null);
    const input2 = useRef<HTMLInputElement>(null);
    const input3 = useRef<HTMLInputElement>(null);
    const input4 = useRef<HTMLInputElement>(null);
    const input5 = useRef<HTMLInputElement>(null);

    const onInputFocusHandler = (e:any) => {

        //다음 칸으로 자동으로 넘어가기
        if(input1.current?.value.length===1 && e.target.value.length===1) input2.current?.focus();
        if(input2.current?.value.length===1 && e.target.value.length===1) input3.current?.focus();
        if(input3.current?.value.length===1 && e.target.value.length===1) input4.current?.focus();
        if(input4.current?.value.length===1 && e.target.value.length===1) input5.current?.focus();

    }

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
                            <input type="text" />
                            <div>@</div>
                            <select name="" id="">
                                <option value="" disabled>이메일 주소</option>
                                <option value="">naver.com</option>
                                <option value="">hanmail.net</option>
                                <option value="">kakao.com</option>
                                <option value="">gmail.com</option>
                                <option value="">nate.com</option>
                            </select>
                            <img src={sendemail} alt="" />
                        </div>
                    </div>
                    <div className='expertauth-second'>
                        <div className='expertauth-subtitle'><span>&#91;2단계&#93;</span> 인증번호 입력</div>
                        <div className='expertauth-description'>이메일로 받은 인증번호를 입력해주세요</div>
                        <div className='expertauth-numbers'>
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input1} onChange={onInputFocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input2} onChange={onInputFocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input3} onChange={onInputFocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input4} onChange={onInputFocusHandler} />
                            <input type="text" maxLength={1} pattern="[0-9]+" ref={input5} onChange={onInputFocusHandler} />
                        </div>
                        <div className='expertauth-description'>제한시간 <span>3:00</span> 남았습니다</div>
                    </div>
                    <div className='expertauth-btnset'>
                        <button>다시 전송</button>
                        <input type="submit" value="제출 완료"></input>
                    </div>
                </div>
            </div>
            }   
        </>
     );
}

export default ExpertAuth;