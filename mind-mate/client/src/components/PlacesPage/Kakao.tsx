import { useState, useEffect } from "react";
import { useRef } from "react";
import '../../styles/KakaoComponent.scss';
import KakaoElement from "./KakaoElement";

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

  const [publicDatas, setPublicDatas] = useState<any>([]);
  const [therapyDatas, setTherapyDatas] = useState<any>([]);
  const [hospitalDatas, setHospitalDatas] = useState<any>([]);

  const [isPublicList, setIsPublicList] = useState<boolean>(false);
  const [istherapyList, setIsTherapyList] = useState<boolean>(false);
  const [isHospitalList, setIsHospitalList] = useState<boolean>(false);

  const publicRef = useRef<HTMLDivElement>(null);
  const hospitalRef = useRef<HTMLDivElement>(null);
  const therapyRef = useRef<HTMLDivElement>(null);

  const publicBtnRef = useRef<HTMLButtonElement>(null);
  const therapyBtnRef = useRef<HTMLButtonElement>(null);
  const hospitalBtnRef = useRef<HTMLButtonElement>(null);


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
  

  const getCurrentLocation = async () => {
    console.log("getCurrentLocation 함수 실행");
    return new Promise((res, rej)=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position: GeolocationPosition) {
          console.log(position);
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const coordinate = new window.kakao.maps.LatLng(lat, lon);
          res(coordinate);
          map.panTo(coordinate);

          marker.setMap(null);
          marker.setPosition(coordinate);
          marker.setMap(map);
        });
      }else {
        rej(new Error('현재 위치를 불러올 수 없습니다'));
      }
    })
  }
   
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
      setPublicDatas(data);
      console.log('publicDatas', publicDatas);
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
      setTherapyDatas(data);
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
      setHospitalDatas(data);
    }else{
      alert("검색 결과가 없습니다");
      setHospitalNum(0);
    }
  }

  //현재 위치 얻어오기

  const searchPublic = async () => {
    const currentLocation = await getCurrentLocation();
    let options = {
      location: currentLocation,
      radius: 1000,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    }
    ps.categorySearch('PO3', publicSearchCB, options); 
  }

  const searchHospital = async () => {
    const currentLocation = await getCurrentLocation();
    let options = {
      location: currentLocation,
      radius: 1000,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    }
    ps.keywordSearch('정신건강의학과', hospitalSearchCB, options);
  }

  const searchTherapy = async () => {
    const currentLocation = await getCurrentLocation();
    let options = {
      location: currentLocation,
      radius: 1000,
      sort: window.kakao.maps.services.SortBy.DISTANCE,
    }
    ps.keywordSearch('심리상담소', therapySearchCB, options);
  }

  const locationBtn = require('../../image/location.png');

  useEffect(()=>{
    if(istherapyList===true){
      therapyRef.current?.classList.remove('vanish');
      publicRef.current?.classList.add('vanish');
      hospitalRef.current?.classList.add('vanish');

    }else if(isPublicList===true){
      publicRef.current?.classList.remove('vanish');
      therapyRef.current?.classList.add('vanish');
      hospitalRef.current?.classList.add('vanish');

    }else if(isHospitalList===true){
      hospitalRef.current?.classList.remove('vanish');
      publicRef.current?.classList.add('vanish');
      therapyRef.current?.classList.add('vanish');

    }
  }, [istherapyList, isPublicList, isHospitalList])

  return (
    <div className="map-container">
      <div className="map-search">
        <div className="map-search-title">검색결과</div>
        <div className="btncategory-set">
          <button className='categorybtn colors' ref={therapyBtnRef} onClick={()=>{
            searchTherapy();
            setIsTherapyList(true);
            setIsPublicList(false);
            setIsHospitalList(false);
            }}>심리상담 · {therapyNum}</button>
          <button className='categorybtn colors' ref={publicBtnRef} onClick={()=>{
            searchPublic()
            setIsTherapyList(false);
            setIsPublicList(true);
            setIsHospitalList(false);
            }}>공공기관 · {publicNum}</button>
          <button className='categorybtn colors' ref={hospitalBtnRef} onClick={()=>{
            searchHospital()
            setIsTherapyList(false);
            setIsPublicList(false);
            setIsHospitalList(true);
            }}>병원/의원 · {hospitalNum}</button>
        </div>

        {/* 정신건강의학과 리스트 */}
        <div className='hospital-resultlist vanish' ref={hospitalRef}>
          {hospitalDatas.map((hospitalData: any, index: any)=>(
            <KakaoElement key={index}
                          placeName={hospitalData.place_name}
                          address={hospitalData.road_address_name}
                          distance={hospitalData.distance}
                          phone={hospitalData.phone}  
                          category={'정신건강의학과'}
            />
          )
          )}
        </div>

        {/* 공공기관 리스트 */}
        <div className='public-resultlist vanish' ref={publicRef}>
          {publicDatas.map((publicData: any, index: any)=>(
            <KakaoElement key={index}
                          placeName={publicData.place_name}
                          address={publicData.road_address_name}
                          distance={publicData.distance}
                          phone={publicData.phone}  
                          category={'공공기관'}
            />
          )
          )}
        </div>

        {/* 심리상담소 리스트 */}
        <div className='therapy-resultlist vanish' ref={therapyRef}>
          {therapyDatas.map((therapyData: any, index: any)=>(
            <KakaoElement key={index}
                          placeName={therapyData.place_name}
                          address={therapyData.road_address_name}
                          distance={therapyData.distance}
                          phone={therapyData.phone}
                          category={'심리상담소'}  
            />
          )
          )}
        </div>
      </div>
      <img className='location-button' src={locationBtn} alt="현재위치" onClick={()=>getCurrentLocation()}/>
      <div id="map"></div>
    </div> 
  );
}
