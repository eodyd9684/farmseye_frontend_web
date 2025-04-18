import React from "react";
import { Outlet } from "react-router-dom";

const StockLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default StockLayout;
