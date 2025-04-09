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
      
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout