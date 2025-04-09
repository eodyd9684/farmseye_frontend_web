import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './UserLayout.module.css'
import Header from './Header'

const UserLayout = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default UserLayout