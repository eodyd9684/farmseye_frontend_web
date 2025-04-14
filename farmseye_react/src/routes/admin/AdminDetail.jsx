import React, { useEffect, useState } from 'react';
import styles from '../admin/AdminLayout.module.css';
import FarmseyeButton from '../../common_component/FarmseyeButton';
import FarmseyeInput from '../../common_component/FarmseyeInput';
import axios from 'axios';

const AdminDetail = ({ u, userInfo, setUserInfo, i, setUserTrigger}) => {
  const [isShow, setIsShow] = useState(false);
  
  //userInfo를 저장하는 변수
  const [userData, setUserData] = useState({ ...u });

  const changeInfo = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  //버튼 클릭 시 삭제하는 함수
  const deleteUser = () => {
    axios.delete(`/api/user/${u.userId}`)
      .then(res => {
        alert('삭제되었습니다.');
        setUserInfo(userInfo.filter(user => user.userId !== u.userId));
      })
      .catch(error => console.log(error));
  };
  //버튼 클릭 시 수정하는 함수
  const saveUserInfo = () => {
    axios.put(`/api/user/${u.userId}`, userData)
      .then(res => {
        alert('수정되었습니다.');
        const updatedList = userInfo.map(user =>
          user.userId === u.userId ? userData : user
        );
        setUserInfo(updatedList);
        setIsShow(false);
        setUserTrigger({})
      })
      .catch(error => console.log(error));
    };

  return (
    <tr>
      <td>{userInfo.length - i}</td>
      {isShow ? (
        <>
          <td>{userData.userId}</td>
          <td><FarmseyeInput defaultValue={userData.userPw} onChange={e => changeInfo('userPw', e.target.value)} /></td>
          <td>{userData.userName}</td>
          <td>{userData.userAge}</td>
          <td><FarmseyeInput defaultValue={userData.userEmail} onChange={e => changeInfo('userEmail', e.target.value)} /></td>
          <td><FarmseyeInput defaultValue={userData.userTel} onChange={e => changeInfo('userTel', e.target.value)} /></td>
          <td>{userData.regDate}</td>
          <td>{userData.isUsing}</td>
          <td>
            <FarmseyeButton title="변경" size="small" onClick={saveUserInfo} />
            <FarmseyeButton title="취소" size="small" onClick={() => setIsShow(false)} />
          </td>
        </>
      ) : (
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
            <FarmseyeButton title="수정" size="small" onClick={() => setIsShow(true)} />
            <FarmseyeButton title="삭제" size="small" onClick={deleteUser} />
          </td>
        </>
      )}
    </tr>
  );
};

export default AdminDetail;
