import axios from 'axios'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {

  //유저 정보 데이터를 저장할 state변수
  const [user, setUser] = useState({
    id : '',
    pw : '',
    name : '',
    email : '',
    tel : ''
  })

  //임시 데이터
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
      name : 'kim',
      email : 'ero',
      tel : '010-2222' 
    },
    {
      id : '3333',
      pw : '4444',
      name : 'kim',
      email : 'ero',
      tel : '010-3333' 
    }

  ]);
  //정보를 조회
  axios.get().then().catch()

  //등록 버튼 클릭 시 실행하는 함수
  const insertBtn = () => {
    axios.post().then().catch()
  }

  //삭제 버튼 클릭 시 실행 함수
  const deleteBtn = () => {
    axios.delete().then().catch()
  }

  //수정 버튼 클릭 시 실행 함수
  const updateBtn = () => {
    axios.put().then().catch()
  }

  return (
    <div>
      <div>
        헤더 컴포넌트
      </div>
      <div>
        {
          users.map((u, i) => {
            return(
            <div key={i}>
              <div>{u.id} </div>
              <div>{u.name}</div>
              <div>{u.email}</div>
              <div>{u.tel}</div>
            </div>
            )
          })
        }
      </div>
      {/* isshow */}
      <div>아이디 : <input type="text" /></div>
      <div>이름 : <input type='text'/></div>
      <div>이메일 : <input type='text'/> </div>
      <div>전화번호 : <input/> </div>

      <button type='button' onClick={() => {}}>수정</button>
      <button type='button' onClick={() => {}}>삭제</button>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout