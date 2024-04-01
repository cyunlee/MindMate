import Kakao from "../components/PlacesPage/Kakao";
import TopBar from "../components/TopBar";
import { useState } from "react";

import '../styles/PlacesPage.scss';

function PlacesPage() {

    const [keywordVal, setKeywordVal] = useState<string>();


    return ( 
        <>
            <TopBar/>
            <Kakao />
        </>
     );
}

export default PlacesPage;