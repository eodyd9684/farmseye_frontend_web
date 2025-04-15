import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div>
      <div>
        헤더 컴포넌트
      </div>

      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default UserLayout