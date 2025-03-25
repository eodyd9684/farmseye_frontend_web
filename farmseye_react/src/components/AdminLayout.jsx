import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
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

export default AdminLayout