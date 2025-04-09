import axios from 'axios';
import React, { useEffect, useState } from 'react'

const DiseaseOutbreak = () => {

  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiKey = 'a3d73da2f457326c6b3ef7f84aeb440a51608bd071fdd1c78acceedacbe83c5e'; // 발급 받은 인증키
        const url = `/openapi/${apiKey}/json/Grid_20151204000000000316_1/1/10`;
        

        const res = await axios.get(url);
        setData(res.data.Grid_20151204000000000316_1.row); // 이건 데이터 구조에 따라 바뀜
      } catch (err) {
        console.error('API 호출 오류:', err);
      }
    };

    fetchApi();
  }, []);

  return (

    <div>
      <h2>가축질병 발생정보</h2>
      <table border={5}>
        <thead>
          <tr>
            <td>전염병발생번호</td>
            <td>가축전염병명</td>
            <td>농장명</td>
            <td>농장소재지</td>
            <td>발생일자</td>
            <td>축종</td>
            <td>발생두수</td>
            <td>진단기관</td>
            <td>종식일</td>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, i) => {
              return(
              <tr key={i}>
                <td>{JSON.stringify(item.ICTSD_OCCRRNC_NO)}</td>
                <td>{JSON.stringify(item.LKNTS_NM)}</td>
                <td>{JSON.stringify(item.FARM_NM)}</td>
                <td>{JSON.stringify(item.FARM_LOCPLC)}</td>
                <td>{JSON.stringify(item.OCCRRNC_DE)}</td>
                <td>{JSON.stringify(item.LVSTCKSPC_NM)}</td>
                <td>{JSON.stringify(item.OCCRRNC_LVSTCKCNT)}</td>
                <td>{JSON.stringify(item.DGNSS_ENGN_NM)}</td>
                <td>{JSON.stringify(item.CESSATION_DE)}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>

  )
}

export default DiseaseOutbreak