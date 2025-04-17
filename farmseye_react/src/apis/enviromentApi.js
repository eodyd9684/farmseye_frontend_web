import axios from "axios";
import { axiosInstance } from "../redux/axiosInstance";

/**
 * 내부 환경 데이터 조회
 */
  export const selectEnvList = () => {
    const responcs = axiosInstance.get(`/farms`)
    return responcs;
  }
  