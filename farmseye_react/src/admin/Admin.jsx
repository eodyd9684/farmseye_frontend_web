import axios from 'axios'
import React, { useState } from 'react'
import FarmseyeButton from '../common_component/FarmseyeButton';
import FarmseyeInput from '../common_component/FarmseyeInput';
import styles from '../admin/AdminLayout.module.css'

const Admin = () => {
  //user 정보를 저장할 변수
  // const [userInfo, setUserInfo] = useState({
  //   id : '',
  //   name : '',
  //   email : ''
  // });

  //userData에 기존/새 비밀번호 확인 하는 변수
  // const [userData, setUserData] = useState({
  //   name: userInfo ? userInfo.name : '',
  //   email: userInfo ? userInfo.email : '',
  //   oldPassword: '',
  //   newPassword: '',
  //   confirmNewPassword: ''
  // })
  const [isShow, setIsshow] = useState(false)
  
  // const [changeInfo, setChangeIngo] = useState()
  const [users, setUsers] = useState([
    {
      id : '1111',
      pw : '1111',
      name : 'kim',
      email : 'eroo',
      tel : '010-1111' 
    },
    {
      id : '2222',
      pw : '22222',
      name : 'lee',
      email : 'ero',
      tel : '010-2222' 
    },
    {
      id : '3333',
      pw : '4444',
      name : 'hong',
      email : 'er',
      tel : '010-3333' 
    }
  ]);

  //회원정보 수정
  const changeData = (e) => {
    setUsers({
      ...users,
      [e.target.name] : e.target.value
    })
  }
  
  //삭제 버튼 클릭 시 실행하는 함수 (delete)
  const deleteUser = () => {
    axios.delete()
    .then(res => {
      alert('삭제하시겠습니까?')
    })
    .catch(error => console.log(error))
  }

  // //수정 버튼 클릭 시 실행하는 API (put)
  const updateUserInfo = () => {
    axios.put()
    .then()
    .catch(error => console.log(error))
  }

  return (
    <>
      <table className={styles.container}>
        <thead>
          <tr>
            <td>No</td>
            <td>아이디</td>
            <td>이름</td>
            <td>이메일</td>
            <td>연락처</td>
          </tr>
        </thead>
        {
          users.map((u, i) => {
            return(
              <tbody className={styles.user}>
                <tr key={i}>
                  <td>{users.length - i}</td>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email} </td>
                  <td>{u.tel} <FarmseyeButton 
                                title='수정' 
                                size='small' 
                                onClick={(e) => {updateUserInfo()}}
                              /> 
                              <FarmseyeButton 
                                title='삭제' 
                                size='small' 
                                onClick={(e) => {deleteUser()}}
                                />
                    </td>
                </tr>
              </tbody>
            )
          })
        }

        {/* isshow */}
      
        <tbody>
          <tr>
            <input type="text" value={users[0].id} />
            <td><FarmseyeInput value={users[0].id}/> </td>
            <td><FarmseyeInput/> </td>
            <td>이름</td>
            <td>이메일</td>
            <td>주소</td>
            <td>전화번호</td>
            <td>회원상태</td>
          </tr>
        </tbody>
      </table>

      
    </>
  )
}

export default Admin