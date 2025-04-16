
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Edit.module.css'; // FarmsEye 스타일 적용을 위한 CSS 파일
import { useParams } from 'react-router-dom';

const EditUserInfo = () => {
  const {userId} = useParams();

  // 사용자 정보 상태 설정
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userPw: '',
    userTel: '',
    userEmail: '',
    userAddr: ''
  });

  // 상태 설정: 비밀번호 변경 여부
  const [changePw, setChangePw] = useState(false);
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  
  // 상태 설정: 이메일/전화번호 중복 여부
  const [emailError, setEmailError] = useState('');
  const [telError, setTelError] = useState('');


  ////////////////////////////////////////////////////////////////////////////////////

  // 사용자 정보 로딩
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("토큰이 없습니다.");
      return;
    }
  
    axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log('내 정보:', res.data);
      setUserInfo(res.data);
    })
    .catch(err => {
      console.error("응답 코드:", err.response?.status);
      console.error("응답 메시지:", err.response?.data);
    });
  }, []);



  ////////////////////////////////////////////////////////////////////////////



  // 이메일 중복 확인
  const checkEmailDuplicate = (email) => {
    axios.post('/api/users/check', { email })
      .then(res => {
        setEmailError(res.data.duplicate ? '이미 사용 중인 이메일입니다.' : '');
      });
  };

  // 전화번호 중복 확인
  const checkTelDuplicate = (tel) => {
    axios.post('/api/users/check', { tel })
      .then(res => {
        setTelError(res.data.duplicate ? '이미 사용 중인 연락처입니다.' : '');
      });
  };

    //input태그의 값이 변경될 때마다 실행하는 함수
    const changeUserInfo = (e) => {
      setUserInfo({
        ...userInfo,
        [e.target.name] : e.target.value
      })
    }

  // 회원 정보 수정 제출
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (changePw && newPw !== confirmPw) {
      alert('새 비밀번호와 일치하지 않습니다.');
      return;
    }

    const payload = {
      ...userInfo,
      userPw: changePw ? newPw : undefined // 비밀번호 변경 요청 시에만 전송
    };

    try {
      await axios.put(`/api/user/${userId}`, payload);
      alert('회원 정보가 수정되었습니다.');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.edit_container}>
      <h2 className={styles.title}>회원 정보 수정</h2>
      <form className={styles.edit_form} onSubmit={handleSubmit}>
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
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} required />
            </label>
            <label>새 비밀번호 확인
              <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} required />
            </label>
          </>
        )}

        <label>연락처
          <input type="text" value={userInfo.userTel} onChange={(e) => {
            const value = e.target.value;
            setUserInfo({ ...userInfo, userTel: value });
            checkTelDuplicate(value);
          }} required />
          {telError && <p className={styles.error_msg}>{telError}</p>}
        </label>

        <label>이메일
          <input type="email" value={userInfo.userEmail} onChange={(e) => {
            const value = e.target.value;
            setUserInfo({ ...userInfo, userEmail: value });
            checkEmailDuplicate(value);
          }} required />
          {emailError && <p className={styles.error_msg}>{emailError}</p>}
        </label>

        <label>주소
          <input type="text" value={userInfo.userAddr} onChange={(e) => setUserInfo({ ...userInfo, userAddr: e.target.value })} required />
        </label>

        <button type="submit" className={styles.submit_btn}>수정 완료</button>

        
        <div className={styles.bottomLink}>
          <a href="delete">탈퇴하기</a>
        </div>
      </form>
    </div>
  );
};

export default EditUserInfo;
