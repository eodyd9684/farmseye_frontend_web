import React, { useEffect, useState } from 'react';
import AdminDetail from './AdminDetail';
import FarmseyeInput from '../../common_component/FarmseyeInput';
import FarmseyeButton from '../../common_component/FarmseyeButton';
import styles from '../admin/AdminLayout.module.css';
import axios from 'axios';

const Admin = () => {
  //user 정보 받는 변수
  const [userInfo, setUserInfo] = useState([]);

  //필터링된 사용자 리스트
  const [filteredUsers, setFilteredUsers] = useState([]);

  //user 정보 재조회 실행을 위한 변수
  const [userTrigger, setUserTrigger] = useState({});
  
  //검색 데이터
  const [searchData, setSearchData] = useState({
    searchKeyword: 'userId', //기본 검색 키워드 (userId)
    searchValue: '' //검색창 입력값
  });

  // 페이징 관련
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axios.get('/api/users')
      .then((res) => {
        setUserInfo(res.data);
        setFilteredUsers(res.data);
      }).catch();
  }, [userTrigger]);

  //검색창 입력 변경 시 실행되는 함수
  const changeSearchData = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  //검색 버튼 클릭 시 실행되는 함수
  const searchList = () => {
    const { searchKeyword, searchValue } = searchData;
    const keyword = searchKeyword ?? '';
    const value = (searchValue ?? '').toLowerCase().replace(/-/g, '');

    if (!keyword || !value) {
      setFilteredUsers(userInfo); //전체 출력
      setCurrentPage(1);
      return;
    }

    const results = userInfo.filter((user) => {
      const rawUserValue = user[keyword];
      if (!rawUserValue) return false;

      let userValue = rawUserValue.toString().toLowerCase();
      //연락처 비교 시 하이픈 제거
      if (keyword === 'userTel') {
        userValue = userValue.replace(/-/g, '');
      }

      return userValue.includes(value);
    });

    setFilteredUsers(results);
    setCurrentPage(1);
  };

  // 페이징 계산
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const currentItems = filteredUsers.slice(startIdx, endIdx);

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  return (
    <div className={styles.container}>
      <div className={styles.size}>
        <div style={{ marginBottom: '1rem' }}>
          <select name="searchKeyword" value={searchData.searchKeyword} onChange={changeSearchData}>
            <option value="userId">아이디</option>
            <option value="userName">이름</option>
            <option value="userTel">연락처</option>
          </select>
          <FarmseyeInput name="searchValue" value={searchData.searchValue} onChange={changeSearchData} />
          <FarmseyeButton title="검색" size="small" onClick={searchList} />
        </div>
  
        <table border={1} className={styles.tableContainer}>
          <thead>
            <tr>
              <td>No</td>
              <td>아이디</td>
              <td>이름</td>
              <td>나이</td>
              <td>이메일</td>
              <td>연락처</td>
              <td>회원가입일</td>
              <td>상태</td>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((u, i) => (
              <AdminDetail
                key={i}
                i={startIdx + i + 1}
                u={u}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                setUserTrigger={setUserTrigger}
              />
            ))}
          </tbody>
        </table>
  
        {/* 페이징 버튼 */}
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              style={{
                margin: '0 5px',
                backgroundColor: currentPage === i + 1 ? 'cornflowerblue' : '#e0e0e0',
                color: currentPage === i + 1 ? '#fff' : '#333',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
