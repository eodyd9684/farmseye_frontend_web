import axios from "axios";

//axios 객체를 생성
//객체를 생성 후 해당 axios 객체를 사용하면 동일한 설정 정보를 가지고 요청을 보낼 수 있음
//axios.create() : 프로젝트에 사용할 공용 axios 객체를 생성할 때 사용하는 함수
export const axiosInstance = axios.create({
  baseURL : 'http://localhost:8080',  //백엔드 주소
  withCredentials : true //필요시 쿠키 인증도 함께 처리하기 위한 설정
});

//요청시 실행할 인터셉터
//모든 요청 진행 전 토큰을 헤더에 담는 코드
axiosInstance.interceptors.request.use( 
  (config) => {
    const token = localStorage.getItem('accessToken');

    //token이 있으면 요청 헤더에 토큰 담아 보내기
    if(token){
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {Promise.reject(error)} 
);