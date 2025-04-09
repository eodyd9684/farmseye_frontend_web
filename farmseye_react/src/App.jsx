import { data, Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './routes/common/UserLayout'
import AdminLayout from './routes/admin/AdminLayout'

import MainLayout from './routes/common/MainLayout'
import Header from './routes/common/Header'
import EnvironmentDetail from './routes/enviroment/EnvironmentDetail'
import TempWeekChart from './routes/enviroment/TempWeekChart'
import UserMain from './routes/common/UserMain'
import HomeLayout from './routes/common/HomeLayout'
import WeatherDetail from './routes/weather/WeatherDetail'
import OrganicMaterials from './components/practice/OrganicMaterials'
import DiseaseOutbreak from './components/practice/DiseaseOutbreak'
import SlaughterPerformance from './components/practice/SlaughterPerformance'
import QuarantineFacility from './components/practice/QuarantineFacility'
import Test from './components/test'
import Admin from './routes/admin/Admin'


function App() {

  return (
    <div className='container'>
      {/* <SafetyData /> */}
      <Header />

      

      <div className='route-body'>
        <Routes className='route-body'>
          <Route path="/" element={ <MainLayout/> } >
            <Route path="" element={ <HomeLayout /> } />
          </Route>
  
          <Route path='/main' element={ <UserLayout/> }>
            <Route path='' element={ <UserMain /> }/>
            <Route path='enviroment' element={ <EnvironmentDetail/> } />
            <Route path='tempWeekChart' element={ <TempWeekChart/> } />
            <Route path='week-weather' element={ <WeatherDetail /> }/>
          </Route>
  
          {/* 회원 정보 수정 및 관리, 회원별 데이터 확인 페이지 */}
          <Route path="/admin" element={ <AdminLayout /> } > 
            <Route path="" element={ <Admin /> } />
          </Route>
  
  
        </Routes>
      </div>

      {/* OPEN API 추가 */}

      {/* 유기농업자재 공시현황 Open Api */}
      {/* <OrganicMaterials /> */}
      {/* 가축질병 발생정보 Open Api */}
      {/* <DiseaseOutbreak /> */}
      {/* 닭 품종별 도축실적 Open Api */}
      {/* <SlaughterPerformance /> */}
      {/* 거점소독시설안내 Open Api */}
      {/* <QuarantineFacility /> */}

      {/* <Test /> */}


    </div>
  )
}

export default App
