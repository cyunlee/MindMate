import React, { useState, useEffect, useRef} from 'react';
import TopBar from '../components/TopBar';
import '../styles/CommunityPage.scss';

function CommunityPage() {

    const pen = require('../image/pen.png');
    const filter = require('../image/menu.png');
    const study = require('../image/study.png');
    const money = require('../image/money.png')
    const work = require('../image/work.png');
    const love = require('../image/love.png');
    const friends = require('../image/friends.png');
    const general = require('../image/general.png');
    const people = require('../image/people.png');

    return ( 
        <>
            <TopBar/>
            <div className='community-container'>
                <div className='category-container'>
                    <div className='category all'>전체</div>
                    <div className='category study'><img id='study-img' src={study} alt="학업/진로" />학업·진로</div>
                    <div className='category money'><img id='money-img' src={money} alt="금전/사업" />금전·사업</div>
                    <div className='category work'><img id='work-img' src={work} alt="직장" />직장</div>
                    <div className='category love'><img id='love-img' src={love} alt="연애" />연애</div>
                    <div className='category people'><img id='friend-img' src={friends} alt="대인관계" />대인관계</div>
                    <div className='category general'><img id='general-img' src={general} alt="일반고민" />일반 고민</div>
                </div>
                <div className='board-container'>
                    <div className='title-container'>
                        <div className='title-content'>
                            <div id='community-content'>커뮤니티|Q&A</div>
                            <div id='community-quote'>마음속 고민을 작성하고 답변을 받는 공간입니다</div>
                        </div>
                        <img src={people} alt="사람들" />
                    </div>
                    <div className='btn-container'>
                        <div className='btn-set'>
                            <div className='write-post'><img className='write-img' alt='글작성' src={pen}/>글작성</div>
                            <div className='filter-post'><img className='filter-img' alt='필터' src={filter}/>최신순</div>
                        </div>
                    </div>
                    <div className='board-line'></div>
                    <div className='article-container'></div>
                </div>


            </div>
            
            
        </>
     );
}

export default CommunityPage;