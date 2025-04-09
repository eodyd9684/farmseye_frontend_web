import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput';
import FarmseyeButton from '../../common_component/FarmseyeButton';

const SlaughterPerformance = () => {
  const [data, setData] = useState([]);

  const [ymData, setYmData] = useState('');

  
  

    const fetchApi = async () => {
      try {
        const apiKey = 'a3d73da2f457326c6b3ef7f84aeb440a51608bd071fdd1c78acceedacbe83c5e'; // 발급 받은 인증키
        const url = `/openapi/${apiKey}/json/Grid_20161216000000000426_1/1/10?YM=${ymData}`;
        

        const res = await axios.get(url);
        setData(res.data.Grid_20161216000000000426_1.row); // 이건 데이터 구조에 따라 바뀜
      } catch (err) {
        console.error('API 호출 오류:', err);
      }
    };



  return (

    
    <div>
      <h2>닭 품종별 도축실적</h2>
      
      <span>검색할 날짜 입력 : </span>
      <FarmseyeInput 
        value={ymData} 
        onChange={(e) => {setYmData(e.target.value)}} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') fetchApi();
        }}
        placeHolder={'예시) 202412 / 2024년 12월'} 
      />

      <FarmseyeButton 
        title='검색' 
        onClick={ e => fetchApi()} 
      />
      
      <table border={5}>
        <thead>
          <tr>
            <td>년/월</td>
            <td>세부 축종 명</td>
            <td>세부 축종 코드</td>
            <td>당월</td>
            <td>당월(누계)</td>
          </tr>
        </thead>

        <tbody>
          {
            data.map((item, i) => {
              return(
              <tr key={i}>
                <td>{JSON.stringify(item.YM)}</td>
                <td>{JSON.stringify(item.DETAIL_LVSTCKSPC_NM)}</td>
                <td>{JSON.stringify(item.DETAIL_LVSTCKSPC_CODE)}</td>
                <td>{JSON.stringify(item.THSMON)}</td>
                <td>{JSON.stringify(item.THSMON_ACMTL)}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
}

export default SlaughterPerformance