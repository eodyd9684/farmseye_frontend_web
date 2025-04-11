import { createSlice } from "@reduxjs/toolkit";

const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return (`${year}.${month}.${date} ${hours}:${minutes}`); // yyyy-mm-dd 형식
}

const todaySlice = createSlice({
  name : 'today',
  initialState : {today : getToday()},
});

export default todaySlice;