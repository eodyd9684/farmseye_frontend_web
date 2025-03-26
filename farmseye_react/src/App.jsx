import { data, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import TemperatureTest from './components/TemperatureTest'

function App() {

  return (
    <div className='container'>
      <TemperatureTest/>

      {/* <Routes>

        <Route path="/" element={ <UserLayout/> } >
          <Route path="" element={ <div>메인 유저 페이지</div> } />
        </Route>

        <Route path="/admin" element={ <AdminLayout/> } >
          <Route path="" element={ <div>관리자 페이지</div> } />
        </Route>

      </Routes> */}

    </div>
  )
}

export default App
