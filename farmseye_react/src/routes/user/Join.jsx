import React, { useEffect, useState } from 'react'
import styles from './Join.module.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const nav = useNavigate();

  //회원 정보를 저장할 state 변수
  const [userIdList, setUserIdList] = useState({});
  
  const [userList, setUserList] = useState({
    userId: '',
    userPw: '',
    userEmail: '',
    userName: '',
    userAddr: '',
    userTel: '',
  });

  const [errorMsg, setErrorMsg] = useState({});

  const handleChange = (field) => (e) => {
    let value = e.target.value;

  // 전화번호일 경우 하이픈 자동 삽입 처리
    if (field === 'userTel') {
      value = value.replace(/[^0-9]/g, ''); // 숫자 외 제거

    // 길이 제한 (11자리까지만 허용)
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.startsWith('02')) {
      // 서울 번호
      if (value.length > 2 && value.length <= 5) {
        value = value.replace(/(\d{2})(\d{0,3})/, '$1-$2');
      } else if (value.length > 5) {
        value = value.replace(/(\d{2})(\d{3,4})(\d{0,4})/, '$1-$2-$3');
      }
    } else {
      // 휴대전화 및 일반 지역번호
      if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
      } else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{3,4})(\d{0,4})/, '$1-$2-$3');
      }
    }

    // 마지막에 '-'가 붙는 경우 제거
    value = value.replace(/-$/, '');
  }

  setUserList({ ...userList, [field]: value });

  // 에러 해제
  if (errorMsg[field]) {
    setErrorMsg({ ...errorMsg, [field]: '' });
  }
};

  //회원가입 전 회원 중복 검사를 위한 회원 목록 조회
  useEffect(() => {
    axios.get('/api/users/check')
    .then(res => {
      console.log(res.data)
      setUserIdList(res.data)
    })
    .catch(error => console.log(error))
  }, []);



  //회원가입 전 유효성 검사
    const joinValiData = () => {
      let result = 0;
  
      setErrorMsg((state) => {
        return{
          userId: '',
          userPw: '',
          userEmail: '',
          userName: '',
          userAddr: '',
          userTel: '',
        }
      })
  
      //4~16글자의 영문자와 숫자로만 이루어진 정규식
      const regex_id = /^[A-Za-z0-9]{4,16}$/;
  
      if (!regex_id.test(userList.userId)) {
        result = 1;
  
        setErrorMsg((state) => {
          return {
            ...state,
            userId : "잘못된 아이디 입니다.",
          };
        });
      }
  
      //비밀번호 정규식
      //영어는 소문자나 대문자 + 숫자는 포함
      const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
  
      if (!regex_pw.test(userList.userPw)) {
        result = 1;
  
        setErrorMsg((state) => {
          return {
            ...state,
            userPw : "잘못된 비밀번호 입니다.",
          };
        });
      }
  
      //전화번호 정규식
      const regex_tel =
        /^(01[0-9])-([0-9]{3,4})-([0-9]{4})$|^(0[2-9]{1})-([0-9]{3,4})-([0-9]{4})$/;
  
      if (!regex_tel.test(userList.userTel)) {
        result = 1;
  
        setErrorMsg((state) => {
          return {
            ...state,
            userTel : "잘못된 전화번호 입니다.",
          };
        });
      }
      return result;
    }

  //등록 버튼 클릭시 회원가입 실행
  const insertUser = (e) => {
    e.preventDefault();

    const result = joinValiData();


    const newErrors = {};
    if (!userList.userId.trim()) newErrors.userId = '아이디 : 필수 정보입니다.';
    if (!userList.userPw.trim()) newErrors.userPw = '비밀번호 : 필수 정보입니다.';
    if (!userList.userEmail.trim()) newErrors.userEmail = '이메일 : 필수 정보입니다.';
    if (!userList.userName.trim()) newErrors.userName = '이름 : 필수 정보입니다.';
    if (!userList.userAddr.trim()) newErrors.userAddr = '주소 : 필수 정보입니다.';
    if (!userList.userTel.trim()) newErrors.userTel = '전화번호 : 필수 정보입니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrorMsg(newErrors);
      return;
    }

   //중복 검사 확인
  const isIdDuplicate = userIdList.some(user => user.userId === userList.userId);
  const isEmailDuplicate = userIdList.some(user => user.userEmail === userList.userEmail);
  const isTelDuplicate = userIdList.some(user => user.userTel === userList.userTel);

  const duplicateErrors = {};
  if (isIdDuplicate) duplicateErrors.userId = '이미 존재하는 아이디입니다.';
  if (isEmailDuplicate) duplicateErrors.userEmail = '이미 존재하는 이메일입니다.';
  if (isTelDuplicate) duplicateErrors.userTel = '이미 존재하는 전화번호입니다.';

  if (Object.keys(duplicateErrors).length > 0) {
    setErrorMsg(prev => ({ ...prev, ...duplicateErrors }));
    return;
  }

  if (result === 0) {
    axios.post('/api/users/join', userList)
      .then(res => {
        if (res.status === 200) {
          alert('회원가입 성공!!');
          nav('/');
        }
      })
      .catch(error => console.log(error));
    }
  }



  return (
    <div>
      <div className={styles.container}>
      <h1 className={styles.logo}>FarmsEye</h1>
      <div className={styles.form} >
        {/* 아이디 / 비밀번호 / 이메일 */}
        <div className={styles.inputGroup}>
          <div className={`${styles.inputLine} ${errorMsg.userId && styles.error}`}>
            <i class="bi bi-person"></i>
            <input
              type="text"
              placeholder="아이디"
              value={userList.userId}
              onChange={handleChange('userId')}
            />
            {/* <span className={styles.suffix}>@gmail.com</span> */}
          </div>
          {errorMsg.userId && <p className={styles.errorMsg}>{errorMsg.userId}</p>}

          <div className={`${styles.inputLine} ${errorMsg.userPw && styles.error}`}>
            <i class="bi bi-lock"></i>
            <input
              type="password"
              placeholder="비밀번호 (영어 대/소문자 + 숫자 포함)"
              value={userList.userPw}
              onChange={handleChange('userPw')}
            />
          </div>
          {errorMsg.userPw && <p className={styles.errorMsg}>{errorMsg.userPw}</p>}

          <div className={`${styles.inputLine} ${errorMsg.userEmail && styles.error}`}>
            <i class="bi bi-envelope"></i>
            <input
              type="email"
              placeholder="이메일 (비밀번호 찾기 등 본인 확인용)"
              value={userList.userEmail}
              onChange={handleChange('userEmail')}
            />
          </div>
          {errorMsg.userEmail && <p className={styles.errorMsg}>{errorMsg.userEmail}</p>}

        </div>

        {/* 이름 / 주소 / 전화번호 */}
        <div className={styles.inputGroup}>
          <div className={`${styles.inputLine} ${errorMsg.userName && styles.error}`}>
            <i class="bi bi-person"></i>
            <input
              type="text"
              placeholder="이름"
              value={userList.userName}
              onChange={handleChange('userName')}
            />
          </div>
          {errorMsg.userName && <p className={styles.errorMsg}>{errorMsg.userName}</p>}

          <div className={`${styles.inputLine} ${errorMsg.userAddr && styles.error}`}>
            <i class="bi bi-house-door"></i>
            <input
              type="text"
              placeholder="주소"
              value={userList.userAddr}
              onChange={handleChange('userAddr')}
            />
          </div>
          {errorMsg.userAddr && <p className={styles.errorMsg}>{errorMsg.userAddr}</p>}

          <div className={`${styles.inputLine} ${errorMsg.userTel && styles.error}`}>
            <i class="bi bi-telephone"></i>
            <input
              type="tel"
              placeholder="전화번호 입력 ( - 없이)"
              value={userList.userTel}
              onChange={handleChange('userTel')}
            />
          </div>
          {errorMsg.userTel && <p className={styles.errorMsg}>{errorMsg.userTel}</p>}
        </div>

        <button type="button" className={styles.submitButton} onClick={(e) => {insertUser(e)}}>
          가입요청
        </button>
      </div>
    </div>
    </div>
  )
}

export default Join