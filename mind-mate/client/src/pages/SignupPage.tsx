import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import '../styles/SignupPage.scss';

function SignupPage() {
  //react hook에서 state 사용

  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');

  let pwValidCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'userid') setUserid(value);
    if (name === 'password') setPassword(value);
    if (name === 'confirmPassword') setConfirmPassword(value);
    if (name === 'nickname') setNickname(value);
  };

  //유효성 검사
  let [isValidID, setIsValidID] = useState<boolean>(false);
  let [isValidPassword, setIsValidPassword] = useState<boolean>(false);
  let [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>(false);
  let [isValidNickname, setIsValidNickname] = useState<boolean>(false);
  let [isValidAccount, setIsValidAccount] = useState<boolean>(false);

  //최종적으로 계산된 상태 값을 바탕으로 isValidAccount 상태 업데이트 (무한 리렌더링 방지)
  useEffect(() => {
    // if (userid.length >= 6) setIsValidID(true);
    // else setIsValidID(false);

    if (pwValidCheck.test(password)) setIsValidPassword(true);
    else setIsValidPassword(false);

    if (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      password === confirmPassword
    )
      setIsValidConfirmPassword(true);
    else setIsValidConfirmPassword(false);

    if (nickname.length >= 2) setIsValidNickname(true);
    else setIsValidNickname(false);

    if (
      isValidID &&
      isValidPassword &&
      isValidConfirmPassword &&
      isValidNickname
    )
      setIsValidAccount(true);
    else setIsValidAccount(false);
  }, [userid, password, confirmPassword, nickname]);

  //에러메시지
  let idMsg = useRef<HTMLDivElement>(null);
  let pwMsg = useRef<HTMLDivElement>(null);
  let confirmPwMsg = useRef<HTMLDivElement>(null);
  let nicknameMsg = useRef<HTMLDivElement>(null);
  let duplicatePassMsg = useRef<HTMLDivElement>(null);

  //let duplicateCount = 0;
  const [count, setCount] = useState(0);

  //아이디 중복체크, 함수에 값을 파라미터로 전달
  const checkDuplicate = async (userid: any) => {
    try {
      const res = await axios({
        method: 'get',
        url: 'http://localhost:3000/api/idcheck',
        params: {
          userid: userid,
        },
      });

      //duplicateCount++;
      setCount(count + 1);

      //아이디 조건이 맞지 않을 때 중복검사 진행한 후 메시지
      console.log(res.data);
      if (idMsg.current !== null) {
        idMsg.current.innerHTML = '아이디 입력 조건을 확인해주세요';
      }
      //아이디 조건 충족 후 중복검사 진행한 후 메시지
      if (duplicatePassMsg.current !== null && userid.length >= 6) {
        duplicatePassMsg.current.innerHTML = res.data.msg;
      }
      //아이디 조건 충족 후 중복검사 진행한 후 결과에 따라 유효성 셋팅
      if (userid.length >= 6 && res.data.isDuplicated === false) {
        setIsValidID(true);
      } else {
        setIsValidID(false);
      }
    } catch (error) {
      console.log('error : ', error);
    }
  };

  const getRandom = async () => {
    try {
      const res = await axios({
        method: 'get',
        url: '/api/random',
      })
      console.log(res.data);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  //회원가입
  const register = async () => {
    try {
      const res = await axios({
        method: 'post',
        url: '/api/signup',
        data: {
          userid: userid,
          password: password,
          nickname: nickname
        }
      })
      console.log(res.data);
    } catch (error) {
      console.log('error : ', error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="signup-container">
        <div className="auth-title">회원가입</div>
        <div className="signup-box">
          <div className="signup-contents">
            <div className="auth-userid-container">
              <label htmlFor="userid-input" className="auth-text">
                아이디
              </label>
              <div className="random-box">
                <div className="auth-valid-container">
                  <input
                    id="userid-input"
                    className="auth-content"
                    placeholder="아이디를 입력해주세요"
                    name="userid"
                    value={userid}
                    onChange={onChangeHandler}
                    required
                  ></input>
                  <button
                    className="valid-btn"
                    onClick={() => {
                      checkDuplicate(userid);
                    }}
                  >
                    중복검사
                  </button>
                </div>
                {userid.length > 0 && userid.length <= 5 && (
                  <div className="errorMsg" ref={idMsg}>
                    아이디는 6글자 이상이어야 합니다
                  </div>
                )}
                {userid.length >= 6 && (
                  <div className="passMsg" ref={duplicatePassMsg}></div>
                )}
              </div>
            </div>

            <div className="auth-container">
              <label htmlFor="pw-input" className="auth-text">
                비밀번호
              </label>
              <div>
                <input
                  id="pw-input"
                  className="auth-content"
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                  required
                ></input>
                {password.length > 0 && !pwValidCheck.test(password) && (
                  <div className="errorMsg" ref={pwMsg}>
                    영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요
                  </div>
                )}
              </div>
            </div>

            <div className="auth-container">
              <label htmlFor="pw-check" className="auth-text">
                비밀번호확인
              </label>
              <div>
                <input
                  id="pw-check"
                  className="auth-content"
                  type="password"
                  placeholder="비밀번호를 한 번 더 입력해주세요"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeHandler}
                  required
                ></input>
                {confirmPassword.length > 0 && password !== confirmPassword && (
                  <div className="errorMsg" ref={confirmPwMsg}>
                    비밀번호가 일치하지 않습니다
                  </div>
                )}
              </div>
            </div>

            <div className="auth-nickname-container">
              <label htmlFor="nickname-input" className="auth-text">
                닉네임
              </label>
              <div className="random-box">
                <div className="auth-random-container">
                  <input
                    id="nickname-input"
                    className="auth-content"
                    placeholder="닉네임을 입력해주세요"
                    name="nickname"
                    value={nickname}
                    onChange={onChangeHandler}
                    required
                  ></input>
                  <button className="random-btn" onClick={()=>{
                    getRandom()
                  }}>랜덤생성</button>
                </div>
                {nickname.length > 0 && nickname.length <= 1 && (
                  <div className="errorMsg" ref={nicknameMsg}>
                    닉네임은 2글자 이상이어야 합니다
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            className="signup-btn"
            onClick={() => {
              if (isValidAccount === true) {
                register();
              }else if(count === 0){
                alert('아이디 중복검사를 진행해주세요')
              }else {
                alert('입력한 정보를 다시 한 번 확인해주세요');
              }
            }}
          >
            가입하기
          </button>
        </div>
        <div className="auth-line"></div>
        <div className="authapi-box">
          <button className="kakao-signup-btn"></button>
          <button className="naver-signup-btn"></button>
        </div>
      </div>
    </>
  );
}

export default SignupPage;
