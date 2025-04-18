
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Edit.module.css'; 
import { axiosInstance } from '../../redux/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '../../redux/authSlice';

const EditUserInfo = () => {
  //탈퇴 시 로그아웃 기능
  const dispatch = useDispatch();

  const nav = useNavigate();
  // 사용자 정보 상태 설정
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userPw: '',
    confirmPw: '',
    userTel: '',
    userEmail: '',
    userAddr: ''
  });

  // 모든 회원 정보를 담는 함수
  const [userList, setUserList] = useState({});

  // 상태 설정: 비밀번호 변경 여부
  const [changePw, setChangePw] = useState(false);
  
  // 에러 메세지
  const [errorMsg, setErrorMsg] = useState({});

  // 현재 사용자 정보 로딩
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
  
    axiosInstance
      .get('/users/isUsable')
      .then(res => {
        const data = res.data;
        console.log('내 정보:', data);

        setUserInfo({
          userId: data.userId ?? '',
          userPw: '',
          confirmPw : '',
          userTel: data.userTel ?? '',
          userEmail: data.userEmail ?? '',
          userAddr: data.userAddr ?? ''
        });
        
      })
      .catch(err => {
        console.error("응답 코드:", err.response?.status);
        console.error("응답 메시지:", err.response?.data);
      });
  }, []);


  // 회원 정보창 변경
  const handleUserInfo = (field) => (e) => {
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

  // 에러 해제
  if (errorMsg[field]) {
    setErrorMsg({ ...errorMsg, [field]: '' });
  }

    setUserInfo({
      ...userInfo,
      [e.target.name] : value
    });
  }

  ////////////////////////////////////////////////////////////////////////////

  //회원가입 전 회원 중복 검사를 위한 회원 목록 조회
  useEffect(() => {
    axios.get('/api/users/check')
    .then(res => {
      console.log(res.data)
      setUserList(res.data)
    })
    .catch(error => console.log(error))
  }, []);

  ////////////////////////////////////////////////////////////////////////////


  //수정 전 유효성 검사
  const joinValiData = () => {
    let result = 0;

    setErrorMsg((state) => {
      return{
        userPw: '',
        userEmail: '',
        userAddr: '',
        userTel: '',
      }
    })

    //비밀번호 정규식
    //영어는 소문자나 대문자 + 숫자는 포함
    const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

    //비밀번호 변경창이 오픈되었을 때만 정규식을 진행하겠다
    if (changePw && !regex_pw.test(userInfo.userPw)) {
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

    if (!regex_tel.test(userInfo.userTel)) {
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


  //회원 정보 수정 제출
  const handleSubmit = (e) => {

    console.log(userInfo);

    if (changePw && userInfo.userPw !== userInfo.confirmPw) {
      setErrorMsg(prev => ({
        ...prev,
        confirmPw: '새 비밀번호와 일치하지 않습니다.'
      }));
      return;
    }

    // 공란 확인
    const newErrors = {};
    if (!userInfo.userEmail.trim()) newErrors.userEmail = '이메일 : 필수 정보입니다.';
    if (!userInfo.userTel.trim()) newErrors.userTel = '전화번호 : 필수 정보입니다.';

    if (Object.keys(newErrors).length > 0) {
      setErrorMsg(newErrors);
      return;
    }

    const result = joinValiData();

    //중복 검사 확인
    const isEmailDuplicate = userList.some(user => user.userEmail === userInfo.userEmail && user.userId !== userInfo.userId);
    const isTelDuplicate = userList.some(user => user.userTel === userInfo.userTel && user.userId !== userInfo.userId);

    

    const duplicateErrors = {};
    if (isEmailDuplicate) duplicateErrors.userEmail = '이미 존재하는 이메일입니다.';
    if (isTelDuplicate) duplicateErrors.userTel = '이미 존재하는 전화번호입니다.';
    
    if (Object.keys(duplicateErrors).length > 0) {
      setErrorMsg(prev => ({ ...prev, ...duplicateErrors }));
      return;
    }

    if(result === 0){
      axiosInstance
      .put('/users', userInfo)
      .then(res => {
        alert('수정 완료')
        nav('/')
      })
      .catch()
    }
  }

  //회원 탈퇴 기능
  const handleDeactivate = () => {
    const confirmDelete = window.confirm('정말 탈퇴하시겠습니까? 탈퇴 시 복구가 불가능합니다.');
  
    if (!confirmDelete) return;
  
    axiosInstance
      .delete('/users/deactivate')
      .then(res => {
        //탈퇴 시 로그아웃
        dispatch(logoutReducer());
        alert('회원 탈퇴가 완료되었습니다.');
        localStorage.removeItem('accessToken');
        nav('/');
      })
      .catch(err => {
        console.error('탈퇴 실패:', err.response?.data || err.message);
        alert('탈퇴에 실패했습니다. 다시 시도해 주세요.');
      });
  };

  return (
    <div className={styles.edit_container}>
      <h2 className={styles.title}>회원 정보 수정</h2>
      <div className={styles.edit_form}>
        <label>아이디
          <input type="text" name='userId' value={userInfo.userId} disabled />
        </label>

        <label>비밀번호
          <button type="button" onClick={() => setChangePw(!changePw)}>
            {changePw ? '비밀번호 변경 취소' : '비밀번호 변경'}
          </button>
        </label>

        {changePw && (
          <>
            <label>새 비밀번호
              <input type="password" name='userPw' value={userInfo.userPw} onChange={handleUserInfo('userPw')} />
              {errorMsg.userPw && <p className={styles.error_msg}>{errorMsg.userPw}</p>}
            </label>
            <label>새 비밀번호 확인
              <input type="password" name='confirmPw' value={userInfo.confirmPw} onChange={handleUserInfo('confirmPw')} />
              {errorMsg.confirmPw && <p className={styles.error_msg}>{errorMsg.confirmPw}</p>}
            </label>
          </>
        )}

        <label>연락처
          <input type="text" name='userTel' value={userInfo.userTel} onChange={handleUserInfo('userTel')} />
          {errorMsg.userTel && <p className={styles.error_msg}>{errorMsg.userTel}</p>}
        </label>

        <label>이메일
          <input type="email" name='userEmail' value={userInfo.userEmail} onChange={handleUserInfo('userEmail')} />
          {errorMsg.userEmail && <p className={styles.error_msg}>{errorMsg.userEmail}</p>}
        </label>

        <label>주소
          <input type="text" name='userAddr' value={userInfo.userAddr} onChange={handleUserInfo('userAddr')} />
        </label>

        <button type="button" className={styles.submit_btn} onClick={handleSubmit}>수정 완료</button>

        
        <div className={styles.bottomLink}>
          <ul>
            <li className={styles.delete_li} onClick={handleDeactivate}>
              탈퇴하기
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditUserInfo;
