import axios from "axios";

/**
 * 내부 환경 데이터 조회
 */
  export const selectEnvList = () => {
    const responcs = axios.get(`/api/farms`)
    return responcs;
  }