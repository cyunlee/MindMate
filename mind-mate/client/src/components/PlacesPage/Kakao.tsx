import { useEffect, useState } from "react";

declare global {
    interface Window {
      kakao: any;
    }
  }
  
  export default function Kakao(props: any) {
      const [map, setMap] = useState<any>();
      const [markers, setMarkers] = useState<any>([]);
      const [ps, setPs] = useState<any>();
      const [infowindow, setInfowindow] = useState({zindex:1});
          
      useEffect(() => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        
        //지도 생성
        setMap(new window.kakao.maps.Map(container, options));
        //장소 검색 객체 생성
        setPs(new window.kakao.maps.services.Places());
        //검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우 생성
        setInfowindow(new window.kakao.maps.InfoWindow({zindex:1}));
        
      });
    }, []);
    
    return(
    <>
      <div id="map" style={{ width: "100%", height: "100vh"}}>
      </div>
    </>
    )
  }


