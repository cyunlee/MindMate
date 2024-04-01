import { useState, useEffect } from "react";
import '../../styles/KakaoComponent.scss';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Kakao(props: any) {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [ps, setPs] = useState<any>();
  const [publicNum, setPublicNum] = useState<any>(0);
  const [therapyNum, setTherapyNum] = useState<any>(0);
  const [hospitalNum, setHospitalNum] = useState<any>(0);

  // 1) 카카오맵 불러오기
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
      setPs(new window.kakao.maps.services.Places(map));

    });
  }, []);
  
  // 2) 현재 위치 함수
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert("위치 정보를 가져오는데 실패했습니다."),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      }
    );
  }
  
  // 3) 정상적으로 현재위치 가져올 경우 실행
  const getPosSuccess = (pos: GeolocationPosition) => {
    // 현재 위치(위도, 경도) 가져온다.
    var currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude, // 위도
      pos.coords.longitude // 경도
    );
    // 지도를 이동 시킨다.
    map.panTo(currentPos);

    // 기존 마커를 제거하고 새로운 마커를 넣는다.
    marker.setMap(null);
    marker.setPosition(currentPos);
    marker.setMap(map);
  };

  function displayMarker(place: any){
    setMarker(new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x)
    }));

  }

  function publicSearchCB(data: any, status: any, pagination: any ) {
    if(status === window.kakao.maps.services.Status.OK){
      for(let i=0; i<data.length; i++){
        displayMarker(data[i]);
      }
      setPublicNum(data.length);
      console.log('공공기관 >>>>', data);
    }else{
      alert("검색 결과가 없습니다");
      setPublicNum(0);
    }
  }

  function therapySearchCB(data: any, status: any, pagination: any ) {
    if(status === window.kakao.maps.services.Status.OK){
      for(let i=0; i<data.length; i++){
        displayMarker(data[i]);
      }
      setTherapyNum(data.length);
      console.log('심리상담소 >>>>', data);
    }else{
      alert("검색 결과가 없습니다");
      setTherapyNum(0);
    }
  }

  function hospitalSearchCB(data: any, status: any, pagination: any ) {
    if(status === window.kakao.maps.services.Status.OK){
      for(let i=0; i<data.length; i++){
        displayMarker(data[i]);
      }
      setHospitalNum(data.length);
      console.log('정신건강의학과 >>>>', data);
    }else{
      alert("검색 결과가 없습니다");
      setHospitalNum(0);
    }
  }

  //현재 위치 얻어오기


  const searchPublic = () => {
    ps.categorySearch('PO3', publicSearchCB, {useMapBounds:true}); 
  }

  const searchHospital = () => {
    ps.keywordSearch('정신건강의학과', hospitalSearchCB);
  }

  const searchTherapy = () => {
    ps.keywordSearch('심리상담소', therapySearchCB);
  }


  
  const locationBtn = require('../../image/location.png');

  return (
    <div className="map-container">
      <div className="map-search">
        <div className="map-search-title">검색결과</div>
        <div className="btncategory-set">
          <button onClick={()=>{searchTherapy()}}>심리상담 · {therapyNum}</button>
          <button onClick={()=>{searchPublic()}}>공공기관 · {publicNum}</button>
          <button onClick={()=>{searchHospital()}}>병원/의원 · {hospitalNum}</button>
        </div>
        <div className='resultlist'></div>
      </div>
      <img src={locationBtn} alt="현재위치" onClick={()=>{getCurrentPosBtn()}} />
      <div id="map"></div>
    </div> 
  );
}
