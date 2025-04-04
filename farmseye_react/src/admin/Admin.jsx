import axios from 'axios';
import React, { useState } from 'react';
import FarmseyeButton from '../common_component/FarmseyeButton';
import FarmseyeInput from '../common_component/FarmseyeInput';
import styles from '../admin/AdminLayout.module.css';
import AdminDetail from './AdminDetail';

const Admin = () => {
  // 사용자 리스트
  const [users, setUsers] = useState([
    {
      userId: '1111',
      userPw: '1111',
      userName: 'kim',
      userAge: '20',
      userEmail: 'eroo',
      userTel: '010-1111',
      regDate: '2025-04-02',
      isUsing: 'Y',
    },
    {
      userId: '2222',
      userPw: '22222',
      userName: 'lee',
      userAge: '25',
      userEmail: 'ero',
      userTel: '010-2222',
      regDate: '2025-04-02',
      isUsing: 'Y',
    },
    {
      userId: '3333',
      userPw: '4444',
      userName: 'hong',
      userAge: '30',
      userEmail: 'er',
      userTel: '010-3333',
      regDate: '2025-04-02',
      isUsing: 'Y',
    },
  ]);

  // 검색 데이터
  const [searchData, setSearchData] = useState({
    searchKeyword: 'userId', // 기본 검색 키워드 (userId)
    searchValue: '', // 검색창 입력값
  });

  // 필터링된 사용자 리스트
  const [filteredUsers, setFilteredUsers] = useState(users);

  // 검색창 입력 변경 시 실행되는 함수
  const changeSearchData = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  // 검색 버튼 클릭 시 실행되는 함수
  const searchList = () => {
    const { searchKeyword, searchValue } = searchData;
    const keyword = searchKeyword ?? ''; // 키워드 기본값
    const value = searchValue?.toString().toLowerCase() ?? ''; // 입력값 기본값

    const results = users.filter((user) =>
      user[keyword]?.toString().toLowerCase().includes(value)
    );

    setFilteredUsers(results);
  };

  return (
    <div className={styles.container}>
      <select name="searchKeyword" value={searchData.searchKeyword} onChange={changeSearchData}>
        <option value="userId">아이디</option>
        <option value="userName">이름</option>
        <option value="userTel">연락처</option>
      </select>
      <div>
        <FarmseyeInput name="searchValue" value={searchData.searchValue} onChange={changeSearchData} />
        <FarmseyeButton title="검색" size="small" onClick={searchList} />
      </div>

      <table border={1} className={styles.tableContainer}>
        <thead>
          <tr>
            <td>No</td>
            <td>아이디</td>
            <td>비밀번호</td>
            <td>이름</td>
            <td>나이</td>
            <td>이메일</td>
            <td>연락처</td>
            <td>회원가입일</td>
            <td>상태</td>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map((u, i) => (
            <AdminDetail key={i} users={filteredUsers} i={i} u={u} setUsers={setUsers} />
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Admin;
