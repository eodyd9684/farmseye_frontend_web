import axios from 'axios'
import React, { useState } from 'react'
import FarmseyeButton from '../common_component/FarmseyeButton';
import FarmseyeInput from '../common_component/FarmseyeInput';
import styles from '../admin/AdminLayout.module.css'
import AdminDetail from './AdminDetail';

const Admin = () => {
  //user 정보를 저장할 변수
  // const [userInfo, setUserInfo] = useState({
  //   id : '',
  //   name : '',
  //   email : ''
  // });

  
  
  
  
  // const [changeInfo, setChangeIngo] = useState()
  const [users, setUsers] = useState([
    {
      id : '1111',
      pw : '1111',
      name : 'kim',
      age : '20',
      email : 'eroo',
      tel : '010-1111',
      regDate : '2025-04-02',
      isUsing : 'Y' 
    },
    {
      id : '2222',
      pw : '22222',
      name : 'lee',
      age : '25',
      email : 'ero',
      tel : '010-2222',
      regDate : '2025-04-02',
      isUsing : 'Y' 
    },
    {
      id : '3333',
      pw : '4444',
      name : 'hong',
      age : '30',
      email : 'er',
      tel : '010-3333',
      regDate : '2025-04-02',
      isUsing : 'Y' 
    }
  ]);

  


  return (
    <div className={styles.container}>
      <table className={styles.tableContainer}>
        <thead>
          <tr>
            <td>No</td>
            <td>아이디</td>
            <td>비밀번호</td>
            <td>이름</td>
            <td>나이</td>
            <td>이메일</td>
            <td>연락처</td>
            <td>회원가입일</td>
            <td>상태</td>
          </tr>
        </thead>
        
        {
          users.map((u, i) => {
            return(
                  
                  <AdminDetail key={i} users={users} i={i} u={u} setUsers={setUsers}/>

            )
          })
        }
        
      </table>
      
    </div>
  )
}

export default Admin