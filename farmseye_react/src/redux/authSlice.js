import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

//토큰이 없거나 만료기간이 지났으면 null을, 그렇지 않으면 로컬스토리지에 저장된 토큰을 반환하는 함수
const getToken = () => {
  const token = localStorage.getItem('accessToken')

  //token이 없으면 null 리턴 후 함수 종료
  if(token === null) return null;

  //token의 payload 부분을 해석해서 객체로 리턴 : 복호화
  const decodedToken = jwtDecode(token);

  //현재 날짜 및 시간(현재 날짜 및 시간을 가져오면 밀리세컨드 단위로 가져옴)
  const currentTime = Date.now() / 1000;

  //token의 만료시간이 지났으면...
  if(decodedToken.exp < currentTime){
    return null
  }

  return token;

}

const authSlice = createSlice({
  
  name : 'auth',
  initialState : {token : getToken()},
  reducers : {
    loginReducer : (state, action) => {
      state.token = action.payload;
      localStorage.setItem('accessToken', action.payload)  //토큰을 localStorage에 넣겠다
    },
    logoutReducer : (state) => {
      state.token = null;
      localStorage.removeItem('accessToken')
      sessionStorage.removeItem('userId')
    }
  }
});

export const {loginReducer, logoutReducer} = authSlice.actions;
export default authSlice;