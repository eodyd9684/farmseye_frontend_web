import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const OrganicMaterials = () => {

  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiKey = 'a3d73da2f457326c6b3ef7f84aeb440a51608bd071fdd1c78acceedacbe83c5e'; // 발급 받은 인증키
        const url = `/openapi/${apiKey}/json/Grid_20200929000000000606_1/1/10`;

        const res = await axios.get(url);
        setData(res.data.Grid_20200929000000000606_1.row); // 이건 데이터 구조에 따라 바뀜
      } catch (err) {
        console.error('API 호출 오류:', err);
      }
    };

    fetchApi();
  }, []);


  return (
    <div>
      <h2>유기농업자재 공시현황</h2>
      <table border={5} >
        <thead>
          <tr>
            <td>공시 아이디</td>
            <td>공시 번호</td>
            <td>자재 구분</td>
            <td>자재 명칭</td>
            <td>상표명</td>
            <td>등재일자</td>
            <td>가격</td>
            <td>제조업체명</td>
            <td>공시종료</td>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, i) => {
              return(
              <tr key={i}>
                <td>{JSON.stringify(item.PBLNTF_ID)}</td>
                <td>{JSON.stringify(item.PBLNTF_NO)}</td>
                <td>{JSON.stringify(item.MTRIL_TYPE_NM)}</td>
                <td>{JSON.stringify(item.MTRIL_NM)}</td>
                <td>{JSON.stringify(item.PRODUCT_NM)}</td>
                <td>{JSON.stringify(item.PBLNTF_REGST_DE)}</td>
                <td>{JSON.stringify(item.PRODUCT_PC)}</td>
                <td>{JSON.stringify(item.CMPNY_NM)}</td>
                <td>{JSON.stringify(item.PBLNTF_END_DE)}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}

export default OrganicMaterials

