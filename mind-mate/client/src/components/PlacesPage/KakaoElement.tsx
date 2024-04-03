import '../../styles/KakaoElementComponent.scss';

function KakaoElement(props: any) {

    const therapyImg = require('../../image/therapy.png');
    const hospitalImg = require('../../image/hospital.png');
    const publicImg = require('../../image/publicoffice.png');

    return ( 
        <> 
            <div className='placelist-container'>
                {props.category === '정신건강의학과' ? (
                    <img src={hospitalImg} alt="병원" className='listlogo'/>
                ) : props.category === '심리상담소' ? (
                    <img src={therapyImg} alt="심리상담소" className='listlogo' />
                ) : (
                    <img src={publicImg} alt="공공기관" className='listlogo' />
                )}
                <div className='placelist-right'>
                    <div className='placename-text'>{props.placeName}</div>
                    <div className='category-text'>{props.category}</div>
                    <div className='placelist-info'>
                        <div className='placelist-info-top'>{props.distance}m | {props.address}</div>
                        <div className='placelist-info-bottom'>{props.phone}</div>
                    </div>
                </div>
            </div>
        </>
     );
}

export default KakaoElement;