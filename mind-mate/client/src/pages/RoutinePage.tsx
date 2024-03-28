import { useState } from "react";
import TopBar from "../components/TopBar";
import '../styles/RoutinePage.scss'

function RoutinePage() {

    const [isTest, setIsTest] = useState<boolean>(true);
    const [isTodo, setIsTodo] = useState<boolean>(false);
    const [isAllActivity, setIsAllActivity] = useState<boolean>(false);

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

    return ( 
        <>
            <TopBar/>
            <div className='routine-container'>
                <div className='routine-topbar'>
                    <button onClick={handleIsTest}>자가진단</button>
                    <button onClick={handleIsTodo}>오늘할일</button>
                    <button onClick={handleIsAllActivity}>전체활동</button>
                </div>
                {(isTest===true)?<div>Test</div>:''}
                {(isTodo===true)?<div>Todo</div>:''}
                {(isAllActivity===true)?<div>AllActivity</div>:''}
            </div>
        </>
     );
}

export default RoutinePage;