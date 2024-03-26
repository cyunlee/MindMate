import { useEffect, useState } from 'react';
import '../styles/ExpertAuthComponent.scss';

function ExpertAuth() {

    const modalclose = require('../image/modalclose.png');
    const sendemail = require('../image/sendemail.png');

    const [isModalOpen, setIsModalOpen] = useState<boolean>(true);


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
                            <input type="text" pattern="[0-9]+"/>
                            <input type="text" pattern="[0-9]+" />
                            <input type="text" pattern="[0-9]+"/>
                            <input type="text" pattern="[0-9]+"/>
                            <input type="text" pattern="[0-9]+"/>
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