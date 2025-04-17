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
import Test from './components/LineChartComponent'
import Admin from './routes/admin/Admin'
import Stock from './routes/stock/Stock'
import Login from './routes/user/Login'
import Join from './routes/user/Join'
import UserMainTest from './routes/common/UserMainTest'
import Edit from './routes/user/Edit'
import HumiWeekChart from './routes/enviroment/HumiWeekChart'
import IllumiWeekChart from './routes/enviroment/IllumiWeekChart'
import StockRegistration from './routes/stock/StockRegistration'
import ProtectedAdminRoute from './routes/user/ProtectedAdminRoute'


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
            <Route path='' element={ <UserMainTest /> }/>
            <Route path='enviroment' element={ <EnvironmentDetail/> } />
            <Route path='tempWeekChart' element={ <TempWeekChart/> } />
            <Route path='humiWeekChart' element={ <HumiWeekChart/> } />
            <Route path='illumiWeekChart' element={ <IllumiWeekChart/> } />
          </Route>
  
          {/* 회원 정보 수정 및 관리, 회원별 데이터 확인 페이지 */}
          <Route path="/admin" element={ <ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute> } > 
            <Route path="" element={ <ProtectedAdminRoute><Admin /></ProtectedAdminRoute> } />
          </Route>
          

          {/* 회원 가입 및 회원 관리 */}
          <Route path="/user" element={ '' } > 
            <Route path="join" element={ <Join /> } />
            <Route path="update" element={ <Edit /> } />
            <Route path="login" element={ <Login /> } />
          </Route>
  
          {/* 개체 관리*/}
          <Route path='/stock' element={''}>
            <Route path='' element={<Stock/>}/>
            <Route path='join' element={<StockRegistration/>}/>
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
