import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FarmseyeInput from '../../common_component/FarmseyeInput';
import FarmseyeButton from '../../common_component/FarmseyeButton';


const QuarantineFacility = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  


  useEffect(() => {
    const fetchApi = async () => {
      try {
        const apiKey = 'a3d73da2f457326c6b3ef7f84aeb440a51608bd071fdd1c78acceedacbe83c5e';
        const url = `/openapi/${apiKey}/json/Grid_20220621000000000618_1/1/500`; // 데이터 충분히 받기

        const res = await axios.get(url);
        const allData = res.data.Grid_20220621000000000618_1.row;

        //sort(a, b) => 원본 배열 정렬해주는 함수 a=배열안 객체 한 개 b=새로 배치할 배열 안 객체 한 개
        //localeCompare(b, 'ko-KR') => 한글 '가나다' 순 정렬시 사용함으로 문자열 정렬 기준으로 비교하는 함수
        const sortedData = allData.sort((a, b) => {
          return a.ADDR.localeCompare(b.ADDR, 'ko-KR');
        });

        setData(sortedData);
        setFilteredData(allData); // 초기 데이터도 설정
      } catch (err) {
        console.error('API 호출 오류:', err);
      }
    };

    fetchApi();
  }, []);

  const handleSearch = () => {
    const results = data.filter(item =>
      item.ADDR?.includes(region) || item.SIGUNGU_NM?.includes(region)
    );
    setFilteredData(results);
  };

  return (
    <div>
      <h2>거점소독시설안내</h2>

      <FarmseyeInput
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        placeholder="예: 수원시, 영암군 등"
      />

      <FarmseyeButton title='검색' onClick={handleSearch}></FarmseyeButton>

      <table border={5}>
        <thead>
          <tr>
            <td>No</td>
            <td>운영시간</td>
            <td>담당자 전화번호</td>
            <td>경도</td>
            <td>위도</td>
            <td>소독장소명</td>
            <td>주소</td>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((item, i) => (
            <tr key={i} >
              <td>{filteredData.length - i}</td>
              <td>{item.OPER_HR}</td>
              <td>{item.PIC_TELNO}</td>
              <td>{item.LOT}</td>
              <td>{item.LAT}</td>
              <td>{item.PSTN_DSNF_PLC_NM}</td>
              <td>{item.ADDR}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default QuarantineFacility;
