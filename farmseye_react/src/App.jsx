import { data, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'

import MainLayout from './components/MainLayout'
import Header from './components/Header'


function App() {

  return (
    <div className='container'>
      <Routes>
        <Route path='/main' element={ <MainLayout/> }>
          <Route path='' element={ <div>로그인 페이지</div> }/>
        </Route>

        {/* <Route path="/" element={ <UserLayout/> } >
          <Route path="" element={ <div>메인 유저 페이지</div> } />
        </Route>

        <Route path="/admin" element={ <AdminLayout/> } >
          <Route path="" element={ <div>관리자 페이지</div> } />
        </Route> */}

      </Routes>
          <AdminLayout/>
    </div>
  )
}

export default App
