import React from "react";
import styles from './MainLayout.module.css'
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>

      <div>
        <Outlet />
      </div>

    </div>
  );
};

export default MainLayout;
