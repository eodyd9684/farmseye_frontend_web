import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FarmseyeInput from '../common_component/FarmseyeInput';
import FarmseyeButton from '../common_component/FarmseyeButton';
import { regUser } from '../apis/userApi';

const UserJoin = () => {
  //id 입력이 잘못되었을 때 나타나는 에러 메세지
  const [errorMsg, setErrorMsg] = useState({
    userId: '',
    userPw: '',
    userTel: ''
  });

  //입력한 값을 저장할 변수
  const [userList, setUserList] = useState({
    userId : '',
    userPw : '',
    userName : '',
    userEmail : '', //완성된 이메일
    email1 : '',
    email2 : '@gmail.com',
    userAge : '',
    userTel : '',
    tel1 : '',
    tel2 : '',
    tel3 : '',
    userAddr : ''
  })

  //회원가입 전 유효성 검사
  const joinValiData = () => {
    let result = 0;

    setErrorMsg((state) => {
      return{
        userId : '',
        userPw : ''
      }
    })

    // //4~16글자의 영문자로만 이루어진 정규식
    const regex_id = /^[A-Za-z]{4,16}$/;

    if (!regex_id.test(userList.userId)) {
      result = 1;

      setErrorMsg((state) => {
        return {
          ...state,
          userId: "잘못된 아이디 입니다.",
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
          userPw: "잘못된 비밀번호 입니다.",
        };
      });
    }

    //   //전화번호 정규식
    const regex_tel =
      /^(01[0-9])-([0-9]{3,4})-([0-9]{4})$|^(0[2-9]{1})-([0-9]{3,4})-([0-9]{4})$/;

    if (!regex_tel.test(userList.userTel)) {
      result = 1;

      setErrorMsg((state) => {
        return {
          ...state,
          userTel: "잘못된 전화번호 입니다.",
        };
      });
    }
    return result;
  }

  //등록 버튼 클릭시 회원가입 실행
  const insertUser = () => {
    const result = joinValiData()

    if(result === 0){
      regUser(userList) 
      .then(res => {
        //회원가입 됐을 때
        if (res.data === true){
          alert('회원가입 성공')
        }
        //회원가입 실패 -> 아이디 중복일 경우
        else{
          setErrorMsg({
            ...errorMsg,
            userId : "중복된 아이디 입니다"
          })
        }
      })
      .catch(error => {console.log(error)})
    }
  }

  //email1, email2 값이 변경 될때만 실행
  useEffect(() => {
    setUserList({
      ...userList,
      userEmail : userList.email1 + userList.email2,
    })
  }, [userList.email1, userList.email2])

  //tel1, tel2, tel3 값이 변경 될때만 실행
  useEffect(() => {
    setUserList({
      ...userList,
      userTel : [userList.tel1, userList.tel2, userList.tel3].join('-')
    })
  }, [userList.tel1, userList.tel2, userList.tel3])

  //키보드로 데이터를 입력할 때마다 실행되는 함수
  const changeUserList = (e) => {
    //이메일 수정했다면
    setUserList({
      ...userList,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
      <h3>회원가입</h3>
        <div>아이디 : 
          <FarmseyeInput 
            type='text' 
            name='userId' 
            value={userList.userId} 
            onChange={(e) => {
              changeUserList(e)
           }} 
          />
          {errorMsg.userId && <p>{errorMsg.userId}</p>}
        </div>
        <div>비밀번호 :  
          <FarmseyeInput 
            type='password' 
            name='userPw' 
            value={userList.userPw} 
            onChange={(e) => {
              changeUserList(e)
            }}
          /> 
        </div>
        <div>이름 : 
          <FarmseyeInput 
            type='text' 
            name='userName' 
            value={userList.userName} 
            onChange={(e) => {
              changeUserList(e)
            }}
          /> 
        </div>
        <div>나이 : 
          <FarmseyeInput
            type='text'
            name='userAge'
            value={userList.userAge}
            onChange={(e) => {
              changeUserList(e)
            }}
          /> 
        </div>
        <div>주소 : 
          <FarmseyeInput
            type='text'
            name='userAddr'
            value={userList.userAddr}
            onChange={(e) => {
              changeUserList(e)
            }}
          /> 
        </div>
        <div>이메일 : 
          <FarmseyeInput
            type='text'
            name='email1'
            value={userList.email1}
            onChange={(e) => {
              changeUserList(e)
            }}
          />
          <select
            name='email2'
            value={userList.email2}
            onChange={(e) => {
              changeUserList(e)
            }}
          >
            <option value='@gmail.com'>@gmail.com</option>
            <option value='@naver.com'>@naver.com</option>
            <option value='@nate.com'>@nate.com</option>
          </select>
        </div>
        <div>연락처 : 
          <FarmseyeInput
            type='text'
            name='tel1'
            value={userList.tel1}
            onChange={(e) => {
              changeUserList(e)
            }}
          />
          <FarmseyeInput
            type='text'
            name='tel2'
            value={userList.tel2}
            onChange={(e) => {
              changeUserList(e)
            }}
          />
          <FarmseyeInput
            type='text'
            name='tel3'
            value={userList.tel3}
            onChange={(e) => {
              changeUserList(e)
            }}
          />
            {errorMsg.userTel && <p>{errorMsg.userTel}</p>}
        </div>
        <FarmseyeButton 
          type='button'
          title='회원가입'
          click={(e) => {
            insertUser()
          }}
        />
    </>
  )
}

export default UserJoin