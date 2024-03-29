import { useEffect, useRef, useState } from "react";
import TopBar from "../components/TopBar";
import '../styles/RoutinePage.scss'
import axios from 'axios';

function RoutinePage() {

    const [isTest, setIsTest] = useState<boolean>(true);
    const [isTodo, setIsTodo] = useState<boolean>(false);
    const [isAllActivity, setIsAllActivity] = useState<boolean>(false);

    //상위 버튼 조작
    const handleIsTest = () => {
        if(isTest===false){
            setIsTest(true)
            setIsAllActivity(false)
            setIsTodo(false)
        }
    }

    const handleIsTodo = () => {
        if(isTodo===false){
            setIsTodo(true)
            setIsAllActivity(false)
            setIsTest(false)
        }
    }

    const handleIsAllActivity = () => {
        if(isAllActivity===false){
            setIsAllActivity(true)
            setIsTest(false)
            setIsTodo(false)
    
        }
    }
    
    //라디오 버튼-우울 증상

    const [d1Val, setD1Val] = useState<number>(0);
    const [d2Val, setD2Val] = useState<number>(0);
    const [d3Val, setD3Val] = useState<number>(0);
    const [d4Val, setD4Val] = useState<number>(0);
    const [d5Val, setD5Val] = useState<number>(0)

    const [dSum, setDSum] = useState<number>(0);

    const d1Handler = (e: any) => {
        setD1Val(parseInt(e.target.value))
    };

    const d2Handler = (e: any) => {
        setD2Val(parseInt(e.target.value))
    };

    const d3Handler = (e: any) => {
        setD3Val(parseInt(e.target.value))
    };

    const d4Handler = (e: any) => {
        setD4Val(parseInt(e.target.value))
    };

    const d5Handler = (e: any) => {
        setD5Val(parseInt(e.target.value))
    };
    
    useEffect(()=>{
        setDSum(d1Val+d2Val+d3Val+d4Val+d5Val);
        console.log('dSum>>>>>', dSum);
    }, [d1Val, d2Val, d3Val, d4Val, d5Val])

     //라디오 버튼-불안 증상

     const [a1Val, setA1Val] = useState<number>(0);
     const [a2Val, setA2Val] = useState<number>(0);
     const [a3Val, setA3Val] = useState<number>(0);
     const [a4Val, setA4Val] = useState<number>(0);
     const [a5Val, setA5Val] = useState<number>(0)
 
     const [aSum, setASum] = useState<number>(0);
 
     const a1Handler = (e: any) => {
         setA1Val(parseInt(e.target.value))
     };
 
     const a2Handler = (e: any) => {
         setA2Val(parseInt(e.target.value))
     };
 
     const a3Handler = (e: any) => {
         setA3Val(parseInt(e.target.value))
     };
 
     const a4Handler = (e: any) => {
         setA4Val(parseInt(e.target.value))
     };
 
     const a5Handler = (e: any) => {
         setA5Val(parseInt(e.target.value))
     };
     
     useEffect(()=>{
         setASum(a1Val+a2Val+a3Val+a4Val+a5Val);
         console.log('aSum>>>>>', aSum);
     }, [a1Val, a2Val, a3Val, a4Val, a5Val])
 
     //자가진단 정보 보여주기 여부

     const [isDepressInfoOpen, setIsDepressInfoOpen] = useState<boolean>(false);
     const [isAnxietyInfoOpen, setIsAnxietyInfoOpen] = useState<boolean>(false);
     const depressedInfoRef = useRef<HTMLDivElement>(null);
     const anxietyInfoRef = useRef<HTMLDivElement>(null)

     const showDepressSelfTestInfo = () => {
        if(isDepressInfoOpen===false){
            depressedInfoRef.current?.classList.remove('vanish');
            setIsDepressInfoOpen(true)
        }else if(isDepressInfoOpen===true){
            depressedInfoRef.current?.classList.add('vanish');
            setIsDepressInfoOpen(false)
        }
     }

     const showAnxietySelfTestInfo = () => {
        if(isAnxietyInfoOpen===false){
            anxietyInfoRef.current?.classList.remove('vanish');
            setIsAnxietyInfoOpen(true)
        }else if(isAnxietyInfoOpen===true){
            anxietyInfoRef.current?.classList.add('vanish');
            setIsAnxietyInfoOpen(false)
        }
     }

     //루틴 생성 및 보여주기

     const createRoutine = async() => {
        try{
            const res = await axios({
                method: 'post',
                url: '/api/createroutine',
                data: {
                    dInfo: depressedInfoRef.current?.innerHTML,
                    aInfo: anxietyInfoRef.current?.innerHTML,
                    dSum: dSum,
                    aSum: aSum
                }
            })
            if(res.data.isError===false){
                setIsTest(false);
                setIsTodo(true);
                setIsAllActivity(false);
                setTodoList(res.data.aiRoutine);
            }
        }catch(error){
            console.log('error : ', error);
        }
     }

     const [todoList, setTodoList] = useState();

    return ( 
        <>
            <TopBar/>
            <div className='routine-container'>
                <div className='routine-topbar'>
                    <button onClick={handleIsTest} className={(isTest===true?'selected':'')}>자가진단</button>
                    <button onClick={handleIsTodo} className={(isTodo===true?'selected':'')}>오늘할일</button>
                    <button onClick={handleIsAllActivity} className={(isAllActivity===true?'selected':'')}>전체활동</button>
                </div>
                {(isTest===true)?
                <div className='test-container'>
                    <div className='table-topbar'>
                        <div className='table-title'>우울 증상</div>
                        <div id='depressed-score' onClick={()=>showDepressSelfTestInfo()}>?</div>
                        <div className='selftest-info vanish' ref={depressedInfoRef}>
                            <div>총점 0: 적응상의 지장을 초래할만한 우울 관련 증상을 거의 보고하지 않았습니다. (정상)</div>
                            <div>총점 1-2: 경미한 수준의 우울감이 있으나 일상생활에 지장을 줄 정도는 아닙니다. (경미한 수준)</div>
                            <div>총점 3-4: 경미한 수준의 우울감을 비교적 자주 경험하는 것으로 보고하였습니다. (경미한 수준)</div>
                            <div>총점 5-9: 중간 수준의 우울감을 비교적 자주 경험하는 것으로 보고하였습니다. (중간 수준)</div>
                            <div>총점 10 이상: 약간 심한 수준부터 심한 수준까지의 우울감을 경험하는 것으로 보고하였습니다. (약간심한 수준 이상)</div>
                        </div>
                    </div>  
                    <table border={2}>
                        <thead>
                            <tr>
                                <th colSpan={2}>지난 2주일 동안 당신은 다음의 문제들로 인해서 얼마나 자주 방해를 받았습니까?</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>일 또는 여가 활동을 하는데 흥미나 즐거움을 느끼지 못함</td>
                                <td><input type="radio" name="d1" value={0} onChange={d1Handler} />0</td>
                                <td><input type="radio" name="d1" value={1} onChange={d1Handler} />1</td>
                                <td><input type="radio" name="d1" value={2} onChange={d1Handler} />2</td>
                                <td><input type="radio" name="d1" value={3} onChange={d1Handler} />3</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>입맛이 없거나 과식을 함</td>
                                <td><input type="radio" name="d2" value={0} onChange={d2Handler} />0</td>
                                <td><input type="radio" name="d2" value={1} onChange={d2Handler} />1</td>
                                <td><input type="radio" name="d2" value={2} onChange={d2Handler} />2</td>
                                <td><input type="radio" name="d2" value={3} onChange={d2Handler} />3</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>신문을 읽거나 텔레비전 보는 것과 같은 일에 집중하는 것이 어려움</td>
                                <td><input type="radio" name="d3" value={0} onChange={d3Handler} />0</td>
                                <td><input type="radio" name="d3" value={1} onChange={d3Handler} />1</td>
                                <td><input type="radio" name="d3" value={2} onChange={d3Handler} />2</td>
                                <td><input type="radio" name="d3" value={3} onChange={d3Handler} />3</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>기분이 가라앉거나 우울하거나 희망이 없음</td>
                                <td><input type="radio" name="d4" value={0} onChange={d4Handler} />0</td>
                                <td><input type="radio" name="d4" value={1} onChange={d4Handler} />1</td>
                                <td><input type="radio" name="d4" value={2} onChange={d4Handler} />2</td>
                                <td><input type="radio" name="d4" value={3} onChange={d4Handler} />3</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>피곤하다고 느끼거나 기운이 거의 없음</td>
                                <td><input type="radio" name="d5" value={0} onChange={d5Handler} />0</td>
                                <td><input type="radio" name="d5" value={1} onChange={d5Handler} />1</td>
                                <td><input type="radio" name="d5" value={2} onChange={d5Handler} />2</td>
                                <td><input type="radio" name="d5" value={3} onChange={d5Handler} />3</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={2}>합계</td>
                                <td colSpan={4}>{dSum}점</td>
                            </tr>
                        </tfoot>
                    </table>
                    <div className='table-topbar'>
                    <div className='table-title'>불안 증상</div>
                        <div id='anxiety-score' onClick={()=>showAnxietySelfTestInfo()}>?</div>
                        <div className='selftest-info vanish' ref={anxietyInfoRef}>
                            <div>총점 0: 주의가 필요할 정도의 과도한 걱정이나 불안을 보고하지 않았습니다. (정상)</div>
                            <div>총점 1-2: 다소 경미한 수준의 걱정과 불안을 보고하였습니다. (경미한 수준)</div>
                            <div>총점 3-4: 다소 경미한 수준의 걱정과 불안을 보고하였습니다. (경미한 수준)</div>
                            <div>총점 5-9: 주의가 필요한 수준의 과도한 걱정과 불안을 보고하였습니다. (중간수준)</div>
                            <div>총점 10 이상: 일상생활에 지장을 초래할 정도의 과도하고 심한 걱정과 불안을 보고하였습니다. (심한수준)</div>
                        </div>
                    </div>  
                    <table border={2}>
                        <thead>
                            <tr>
                                <th colSpan={2}>지난 2주일 동안 당신은 다음의 문제들로 인해서 얼마나 자주 방해를 받았습니까?</th>
                                <th>0</th>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>초조하거나 불안하거나 조마조마하게 느낀다</td>
                                <td><input type="radio" name="a1" value={0} onChange={a1Handler} />0</td>
                                <td><input type="radio" name="a1" value={1} onChange={a1Handler} />1</td>
                                <td><input type="radio" name="a1" value={2} onChange={a1Handler} />2</td>
                                <td><input type="radio" name="a1" value={3} onChange={a1Handler} />3</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>편하게 있기가 어렵다</td>
                                <td><input type="radio" name="a2" value={0} onChange={a2Handler} />0</td>
                                <td><input type="radio" name="a2" value={1} onChange={a2Handler} />1</td>
                                <td><input type="radio" name="a2" value={2} onChange={a2Handler} />2</td>
                                <td><input type="radio" name="a2" value={3} onChange={a2Handler} />3</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>여러 가지 것들에 대해 걱정을 너무 많이 한다</td>
                                <td><input type="radio" name="a3" value={0} onChange={a3Handler} />0</td>
                                <td><input type="radio" name="a3" value={1} onChange={a3Handler} />1</td>
                                <td><input type="radio" name="a3" value={2} onChange={a3Handler} />2</td>
                                <td><input type="radio" name="a3" value={3} onChange={a3Handler} />3</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>쉽게 짜증이 나거나 쉽게 성을 내게 된다</td>
                                <td><input type="radio" name="a4" value={0} onChange={a4Handler} />0</td>
                                <td><input type="radio" name="a4" value={1} onChange={a4Handler} />1</td>
                                <td><input type="radio" name="a4" value={2} onChange={a4Handler} />2</td>
                                <td><input type="radio" name="a4" value={3} onChange={a4Handler} />3</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>너무 안절부절못해서 가만히 있기가 힘들다</td>
                                <td><input type="radio" name="a5" value={0} onChange={a5Handler} />0</td>
                                <td><input type="radio" name="a5" value={1} onChange={a5Handler} />1</td>
                                <td><input type="radio" name="a5" value={2} onChange={a5Handler} />2</td>
                                <td><input type="radio" name="a5" value={3} onChange={a5Handler} />3</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <td colSpan={2}>합계</td>
                            <td colSpan={4}>{aSum}점</td>
                        </tfoot>
                    </table>
                    <button onClick={()=>{createRoutine()}}>루틴 START</button>
                </div>:''}
                {(isTodo===true)?<div className='todo-container'>
                {todoList}
                </div>:''}
                {(isAllActivity===true)?<div className='allactivity-container'>

                </div>:''}
            </div>
        </>
     );
    
}

export default RoutinePage;