import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginReducer } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../redux/axiosInstance';
import styles from './Login.module.css'


const Login = () => {
  //로그인 성공 시 진행되어야 하는 코드를 authSlice에 reducer로 등록했고 이를 사용을 위한 useDispatch() 선언
  const dispatch = useDispatch();
  //로그인 성공시 메인페이지로 이동하기 위한 useNavigate() 선언
  const nav = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    userId : '',
    userPw : '',
    isUsing : '',
  });

  // 각 입력 필드의 에러 메시지 저장 상태
  const [errors, setErrors] = useState({});

  //로그인 요청 함수
  const login = () => {
    axiosInstance.post('/user/login', loginInfo)
    .then(res => {
      const token = res.headers['authorization'];


      alert('로그인 성공');
      dispatch(loginReducer(token));
      nav('/');     
    })
    .catch(e => {
      if (e.response && e.response.status === 401) {
        alert('로그인 실패');
      } else {
        console.log(e);
      }
    });
  }

  const handleLoginInfo = (field) => (e) => {
    setLoginInfo({
      ...loginInfo,
      [field] : e.target.value
    })

    if (errors[field]) {
      setErrors({ ...errors, [field]: '' }); // 에러가 있다면 제거
    }
  };

    // 폼 제출 시 실행되는 함수
    const handleSubmit = (e) => {
      e.preventDefault(); // 기본 제출 동작 차단
  
      const newErrors = {};
      if (!loginInfo.userId.trim()) newErrors.userId = '아이디를 입력해주세요.';
      if (!loginInfo.userPw.trim()) newErrors.userPw = '비밀번호를 입력해주세요.';
  
      // 에러가 존재하면 표시하고 종료
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      // 정상 입력 시 로그인 로직 (이 부분에 API 연동 가능)
      login(e);
    };


  return (
    <div>
      <div className={styles.container}>
        <h1 className={styles.logo}>FarmsEye</h1>
        <div className={styles.tabContainer}>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={`${styles.inputBox} ${errors.userId && styles.error}`}>
          <i class="bi bi-person"></i>
          <input
            type="text"
            placeholder="아이디"
            value={loginInfo.userId}
            onChange={handleLoginInfo('userId')}
          />
        </div>
        {errors.userId && <p className={styles.errorMsg}>{errors.userId}</p>}

        <div className={`${styles.inputBox} ${errors.userPw && styles.error}`}>
          <i class="bi bi-lock"></i>
          <input
            type="password"
            placeholder="비밀번호"
            value={loginInfo.userPw}
            onChange={handleLoginInfo('userPw')}
          />
        </div>
        {errors.userPw && <p className={styles.errorMsg}>{errors.userPw}</p>}

        <button type="submit" className={styles.loginButton} onClick={e => handleSubmit(e)}>
          로그인
        </button>
      </form>

      <div className={styles.bottomLink}>
        <a href="join" >회원가입</a>
      </div>
    </div>
    </div>
  )
}

export default Login