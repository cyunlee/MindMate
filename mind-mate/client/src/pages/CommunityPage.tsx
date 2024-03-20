import React, { useState, useEffect, useRef, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import '../styles/CommunityPage.scss';
import Post from '../components/CommunityPage/Post';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

    const prevall = require('../image/prev-all.png');
    const prevarrow = require('../image/prev-arrow.png');
    const nextall = require('../image/next-all.png');
    const nextarrow = require('../image/next-arrow.png');

    const navigate = useNavigate();
    const currentPath = window.location.pathname;

    const [allPostDatas, setAllPostDatas] = useState([]);
    const [postDatas, setPostDatas] = useState([]);

    const [isLogin, setIsLogin] = useState<boolean>(false);

    const accessToken = localStorage.getItem('accessToken');

    const checkLogin = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/api/verify',
                headers: {
                    Authorization: accessToken
                }
            })
            if(res.data.isError===true){
                setIsLogin(false);
            }else if(res.data.isError===false){
                setIsLogin(true);
            }
        }catch(error) {
            console.log('error : ', error);
        }
    }

    const getAllPost = async () => {
        try {
            const res = await axios({
                method: 'get',
                url: '/api/getallpost'
            })

            setAllPostDatas(res.data.allPosts);

        }catch(error){
            console.log('error : ', error);
        }
    }

    const getPost = async (category:any) => {
        try {
            const res = await axios({
                method: 'get',
                url: '/api/getpost',
                params: {
                    category: category
                }
            })
            console.log(res)
            setPostDatas(res.data.Posts);
            
        }catch(error){
            console.log('error : ', error);
        }
    }

    const [category, setCategory] = useState('');
    // const [categoryVal, setCategoryVal] = useState('all');
    const categoryVal = useParams();
    const cstring = categoryVal.categoryVal

    const onclick =(url:string) => {
        navigate(url)
        if(url==="/community/study") setCategory("학업·진로");
        if(url==="/community/money") setCategory("금전·사업");
        if(url==="/community/work") setCategory("직장");
        if(url==="/community/love") setCategory("연애");
        if(url==="/community/people") setCategory("대인관계");
        if(url==="/community/general") setCategory("일반고민");
        
        console.log(category);
    }

    useLayoutEffect(()=>{
        if(currentPath === '/community/all') {
            setCategory('전체');
            // setCategoryVal('all');
            getAllPost()
        }
        getPost(category);
        checkLogin()
    }, [currentPath, cstring])


    return ( 
        <>
            <TopBar/>
            <div className='community-container'>
                <div className='category-container'>
                <div className={`category all ${category === '전체' ? 'color' : ''}`}  onClick={()=>{onclick('/community/all')}}>전체</div>
                    <div className={`category study ${category === '학업·진로' ? 'color' : ''}`}  onClick={()=>{onclick('/community/study')}}><img id='study-img' src={study} alt="학업/진로" />학업·진로</div>
                    <div className={`category money ${category === '금전·사업' ? 'color' : ''}`}  onClick={()=>{onclick('/community/money')}}><img id='money-img' src={money} alt="금전/사업" />금전·사업</div>
                    <div className={`category work ${category === '직장' ? 'color' : ''}`}  onClick={()=>{onclick('/community/work')}}><img id='work-img' src={work} alt="직장" />직장</div>
                    <div className={`category love ${category === '연애' ? 'color' : ''}`}  onClick={()=>{onclick('/community/love')}}><img id='love-img' src={love} alt="연애" />연애</div>
                    <div className={`category people ${category === '대인관계' ? 'color' : ''}`}  onClick={()=>{onclick('/community/people')}}><img id='friend-img' src={friends} alt="대인관계" />대인관계</div>
                    <div className={`category general ${category==='일반고민' ? 'color' : ''}`} onClick={()=>{onclick('/community/general')} }><img id='general-img' src={general} alt="일반고민" />일반고민</div>
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
                            {isLogin===true ? <div className='write-post' onClick={()=>navigate('/writepost')}><img className='write-img' alt='글작성' src={pen}/>글작성</div> : ''}
                            <div className='filter-post'><img className='filter-img' alt='필터' src={filter}/>최신순</div>
                        </div>
                    </div>
                    <div className='board-line'></div>
                    <div className='article-container all'>
                        { allPostDatas.length>0 && cstring ==='all' ?  
                            ( allPostDatas.slice(0).reverse().map((postData:any, index) =>(
                                    <Post key={index}
                                        title={postData.title}
                                        nickname={postData.nickname}
                                        createdAt={postData.createdAt}
                                        category={postData.postType}
                                    />
                                ))
                            ) : ''
                        }

                        { (cstring==='study'||cstring==='money'||cstring==='work'||cstring==='love'||cstring==='people'||cstring==='general') ?  
                            ( postDatas.slice(0).reverse().map((postData:any, index) =>(
                                    <Post key={index}
                                        title={postData.title}
                                        nickname={postData.nickname}
                                        createdAt={postData.createdAt}
                                        category={postData.postType}
                                    />
                                ))
                            ) : ''
                        }    
                    </div>
                    <div className='post-search'>
                        <select name="" id="">
                            <option value="title">제목</option>
                            <option value="content">내용</option>
                            <option value="writer">작성자</option>
                        </select>
                        <input type="text" />
                        <button>검색</button>
                    </div>
                    <div className='page-change'>
                        <div className='prev-btn-set'>
                            <img src={prevall} alt="전체이전" />
                            <img src={prevarrow} alt="바로이전" />
                        </div>
                        <div className='numberset'>
                            <div>1</div>
                            <div>2</div>
                            <div>3</div>
                            <div>4</div>
                            <div>5</div>
                            <div>6</div>
                            <div>7</div>
                            <div>8</div>
                            <div>9</div>
                            <div>10</div>
                        </div>
                        <div className='next-btn-set'>
                            <img src={nextarrow} alt="바로다음" />
                            <img src={nextall} alt="전체다음" />
                        </div>
                    </div>
                </div>


            </div>
            
            
        </>
     );
}

export default CommunityPage;