import { data, Route, Routes } from "react-router-dom";
import "./App.css";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./admin/AdminLayout";

import MainLayout from "./components/MainLayout";
import Header from "./components/Header";
import EnvironmentDetail from "./enviroment_componentes/EnvironmentDetail";
import TempWeekChart from "./enviroment_componentes/TempWeekChart";

function App() {
  return (
    <div className="container">
      {/* <EnvironmentDetail /> */}
      <TempWeekChart />

      <Routes>
        <Route path="/main" element={<MainLayout />}>
          <Route path="" element={<div>로그인 페이지</div>} />
        </Route>

        {/* <Route path="/" element={ <UserLayout/> } >
          <Route path="" element={ <div>메인 유저 페이지</div> } />
        </Route>

        <Route path="/admin" element={ <AdminLayout/> } >
          <Route path="" element={ <div>관리자 페이지</div> } />
        </Route> */}
      </Routes>
      <AdminLayout />
      {/* <UserJoin/> */}
    </div>
  );
}

export default App;
