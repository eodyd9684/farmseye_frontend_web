import React, { useState } from "react";
import styles from './Header.module.css'
import { useNavigate } from "react-router-dom";
import FarmseyeButton from "../../common_component/FarmseyeButton";
import { useDispatch, useSelector } from "react-redux";
import { logoutReducer } from "../../redux/authSlice";

const Header = () => {
    //store에 저장된 token 가져오기
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

  const nav = useNavigate();

  // 메뉴 항목에 마우스를 올렸을때, 내렸을때 상태 확인 변수
  const [activeMenu, setActiveMenu] = useState(null);

  //마우스 올렸을 때, 변수 값을 바꾸는 함수
  const handleMouseEnter = (menu) => {
    setActiveMenu(menu);
  };

  //마우스 빠져 나갈 때, 변수 값을 바꾸는 함수
  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  //로그아웃 눌렀을 때 뜨는 확인창
  const onLogoutClick = () => {
    if(confirm('로그아웃 하시겠습니까?')){
      dispatch(logoutReducer());
      alert('로그아웃 되었습니다')
      nav('/')
    }
    else{
      return
    }
  }

  return (
      <div className={styles.header}>

        <div className={styles.home_logo} onClick={e => nav('/main')}>
          <img src="/images/farmsEye.png" alt="프로젝트 이미지" height='100%' />
          {/* <p>Farms Eye</p> */}
        </div>



        <div className={styles.content_list}>
          
        {
          token === null
          ?
            <ul 
              className={styles.menu} 
              onMouseEnter={() => handleMouseEnter('메인페이지')} 
              onMouseLeave={handleMouseLeave}
            >
              <li>메인페이지</li>
              {activeMenu === '메인페이지' && (
                <div className={styles.dropdown}>
                  <li onClick={e => nav('/')}>FarmsEye</li>
                  <li onClick={e => nav('/')}>회사연혁</li>
                  <li onClick={e => nav('/')}>공지사항</li>
                </div>
              )}
            </ul>
          :
          <>
            <ul 
              className={styles.menu} 
              onMouseEnter={() => handleMouseEnter('축사 내부')} 
              onMouseLeave={handleMouseLeave}
            >
              <li>축사 내부</li>
              {activeMenu === '축사 내부' && (
                <div className={styles.dropdown}>
                  <li onClick={e => nav('/main/enviroment')} >축사 내부</li>
                  <li onClick={e => nav('/main/tempWeekChart')}>주간 온도 상세</li>
                  <li>주간 습도 상세</li>
                </div>
              )}
            </ul>
  
            <ul 
              className={styles.menu} 
              onMouseEnter={() => handleMouseEnter('개체 관리')} 
              onMouseLeave={handleMouseLeave}
            >
              <li>개체 관리</li>
              {activeMenu === '개체 관리' && (
                <div className={styles.dropdown}>
                  <li>상세 1</li>
                  <li>상세 2</li>
                </div>
              )}
            </ul>
  
            <ul 
              className={styles.menu} 
              onMouseEnter={() => handleMouseEnter('날씨 / 재난')} 
              onMouseLeave={handleMouseLeave}
            >
              <li>날씨</li>
              {activeMenu === '날씨 / 재난' && (
                <div className={styles.dropdown}>
                  <li onClick={(e) => {nav('/main/week-weather')}}>주간 날씨</li>
                  <li>상세 2</li>
                </div>
              )}
            </ul>
  
            <ul 
              className={styles.menu} 
              onMouseEnter={() => handleMouseEnter('내부 CCTV')} 
              onMouseLeave={handleMouseLeave}
            >
              <li>내부 CCTV</li>
              {activeMenu === '내부 CCTV' && (
                <div className={styles.dropdown}>
                  <li>상세 1</li>
                  <li>상세 2</li>
                </div>
              )}
            </ul>
          </>

        }
          

          

        </div>

        <div className={styles.user_login_join}>
          {
            token === null 
            ?
              <>
                <FarmseyeButton title="로그인" size="header_login" onClick={() => {nav('user/login')}}/>
                <FarmseyeButton title="회원가입" size="header_logout" onClick={() => {nav('user/join')}}/>
              </>
            :
              <>
                <FarmseyeButton title="로그아웃" size="header_logout" onClick={() => {onLogoutClick()}}/>
                <FarmseyeButton title="개인정보수정" size="header_logout" onClick={() => {nav('user/update')}}/>
              </>
          }

          
        </div>


      </div>
  );
};

export default Header;
