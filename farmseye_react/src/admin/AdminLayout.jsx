import axios from 'axios'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Admin from './Admin'

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
      <Admin/>
      {/* <div>
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
      </div> */}
      
      <button type='button' onClick={() => {}}>수정</button>
      <button type='button' onClick={() => {}}>삭제</button>
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout