import React, { useState } from 'react';
import styles from '../admin/AdminLayout.module.css';
import FarmseyeButton from '../../common_component/FarmseyeButton';
import FarmseyeInput from '../../common_component/FarmseyeInput';
import axios from 'axios';

const AdminDetail = ({ u, users, setUsers, i }) => {
  const [isShow, setIsShow] = useState(false);

  // 삭제 버튼 클릭 시 실행하는 함수 (DELETE)
  const deleteUser = () => {
    axios.delete(`/api/users/${u.userId}`)
      .then(res => {
        alert('삭제되었습니다.');
        setUsers(users.filter(user => user.userId !== u.userId));
      })
      .catch(error => console.log(error));
  };

  // 수정 버튼 클릭 시 실행하는 함수 (수정 모드 활성화)
  const updateUserInfo = () => {
    setIsShow(true);
  };

  return (
    <tr>
      <td>{users.length - i}</td>
      {
        isShow ? (
          <>
            <td>{u.userId}</td>
            <td><FarmseyeInput defaultValue={u.userPw} /></td>
            <td><FarmseyeInput defaultValue={u.userName} /></td>
            <td><FarmseyeInput defaultValue={u.userAge} /></td>
            <td><FarmseyeInput defaultValue={u.userEmail} /></td>
            <td><FarmseyeInput defaultValue={u.userTel} /></td>
            <td><FarmseyeInput defaultValue={u.regDate} /></td>
            <td>{u.isUsing}</td>
            <td>
              <FarmseyeButton title="변경" size="small" onClick={() => setIsShow(false)} />
              <FarmseyeButton title="취소" size="small" onClick={() => setIsShow(false)} />
            </td>
          </>
       ) 
       : 
       (
        <>
          <td>{u.userId}</td>
          <td>{u.userPw}</td>
          <td>{u.userName}</td>
          <td>{u.userAge}</td>
          <td>{u.userEmail}</td>
          <td>{u.userTel}</td>
          <td>{u.regDate}</td>
          <td>{u.isUsing}</td>
          <td className={styles.btn}>
            <FarmseyeButton title="수정" size="small" onClick={updateUserInfo} />
            <FarmseyeButton title="삭제" size="small" onClick={deleteUser} />
          </td>
        </>
      )}
    </tr>
  );
};

export default AdminDetail;
