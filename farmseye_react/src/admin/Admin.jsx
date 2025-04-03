import axios from 'axios'
import React, { useState } from 'react'
import FarmseyeButton from '../common_component/FarmseyeButton';
import FarmseyeInput from '../common_component/FarmseyeInput';
import styles from '../admin/AdminLayout.module.css'
import AdminDetail from './AdminDetail';

const Admin = () => {
  //user 정보를 저장할 변수
  // const [userInfo, setUserInfo] = useState({
  //   id : '',
  //   name : '',
  //   email : ''
  // });
  
  // const [changeInfo, setChangeIngo] = useState()
  const [users, setUsers] = useState([
    {
      id : '1111',
      pw : '1111',
      name : 'kim',
      age : '20',
      email : 'eroo',
      tel : '010-1111',
      regDate : '2025-04-02',
      isUsing : 'Y' 
    },
    {
      id : '2222',
      pw : '22222',
      name : 'lee',
      age : '25',
      email : 'ero',
      tel : '010-2222',
      regDate : '2025-04-02',
      isUsing : 'Y' 
    },
    {
      id : '3333',
      pw : '4444',
      name : 'hong',
      age : '30',
      email : 'er',
      tel : '010-3333',
      regDate : '2025-04-02',
      isUsing : 'Y' 
    }
  ]);

  //검색 데이터를 관리하는 변수
  const [searchData, setSearchData] = useState({
    searchKeyword : 'id', //기본 검색 키워드
    searchValue : ''      // 검색창에 입력된 값
  })

  // 필터링된 결과를 저장하는 변수
  const [filteredUsers, setFilteredUsers] = useState([]);

  //검색창 내용 변경 시 실행되는 함수
  const changeSearchData = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name] : e.target.value
    })
  }

  //검색 버튼 클릭 시 실행 함수
  const searchList = () => {
    // axios.get(`/api/users?searchId=${searchData.searchId}&searchName=${searchData.searchName}&searchTel=${searchData.searchTel}`)
    // .then(res => setUsers(res.data))
    // .catch(error => console.log(error))
    
    //const [searchKeyword, searchValue] = searchData;

    // 필터링 로직: 사용자가 선택한 키워드와 입력값을 기준으로 데이터 필터링
    // const results = users.filter((user) =>
    //   user[searchKeyword]?.toString().toLowerCase().includes(searchValue.toLowerCase())
    // );

    // setFilteredUsers(results);
    // for(let i = 0 ; i < users.length; i++){
    //   if(searchData.searchKeyword === users[i].id){
    //     setResult(...result, users[i])
    //   }
    // }
    // return result;
  }

  console.log(searchData)
  return (
    <div className={styles.container}>
      <select name="searchKeyword" value={searchData.searchKeyword} onChange={e => {changeSearchData(e)}}>
        <option value="id">아이디</option>
        <option value="name">이름</option>
        <option value="tel">연락처</option>
      </select>
      <div>
        <FarmseyeInput 
          name={searchData.searchId}
          value={searchData[searchData.searchId]} 
          onChange={e => changeSearchData(e)}
          pleacholder={`검색할 ${searchData.searchId === 'id' ? '아이디' : searchData.searchId === 'name' ? '이름' : '연락처'}`}/> 
        <FarmseyeButton title='검색' size='small' onClick={e => searchData()}/>
      </div>
      <table className={styles.tableContainer}>
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
        
        {
          users.map((u, i) => {
            return(
                  
                  <AdminDetail key={i} users={users} i={i} u={u} setUsers={setUsers}/>

            )
          })
        }
        
      </table>
      
    </div>
  )
}

export default Admin