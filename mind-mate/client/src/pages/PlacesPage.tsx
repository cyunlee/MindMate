import Kakao from "../components/PlacesPage/Kakao";
import TopBar from "../components/TopBar";
import { useState } from "react";

import '../styles/PlacesPage.scss';

function PlacesPage() {

    const [keywordVal, setKeywordVal] = useState<string>();


    return ( 
        <>
            <TopBar/>
            <Kakao keyword={keywordVal}/>
            <div className="keyword-search-container">
                <button value="심리상담소" onClick={()=>{setKeywordVal("심리상담소")}}>심리상담소</button>
                <button value="정신건강의학과" onClick={()=>{setKeywordVal("정신건강의학과")}}>정신건강의학과</button>
            </div>
        </>
     );
}

export default PlacesPage;