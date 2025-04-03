import React, { useState } from 'react'
import styles from '../admin/AdminLayout.module.css'
import FarmseyeButton from '../common_component/FarmseyeButton';
import FarmseyeInput from '../common_component/FarmseyeInput';

const AdminDetail = ({u, users, setUsers, i}) => {
  const [isShow, setIsshow] = useState(false);

  //회원정보 수정
    const changeData = (e) => {
      // setUsers({
      //   ...users,
      //   [e.target.name] : e.target.value
      // })

      // const copyUsers = [...users]
      // const findUser = copyUsers.find((user) => {return user.id === users.id})
      // findUser.pw = newInfo
      // setUsers(copyUsers)
      
    }
    
    //삭제 버튼 클릭 시 실행하는 함수 (delete)
    const deleteUser = () => {
      // axios.delete()
      // .then(res => {
      //   alert('삭제하시겠습니까?')
      // })
      // .catch(error => console.log(error))
    }
  
    // //수정 버튼 클릭 시 실행하는 API (put)
    const updateUserInfo = () => {
      // axios.put()
      // .then()
      // .catch(error => console.log(error))
      setIsshow(true)
    }
 
  
  return (
    isShow ?
    <tr>
      <td>{users.length - i}</td>
      <td>{u.id}</td>
      <td><FarmseyeInput value={u.pw}/> </td>
      <td>{u.name}</td>
      <td>{u.age}</td>
      <td><FarmseyeInput value={u.email}/></td>
      <td><FarmseyeInput value={u.tel}/> </td>
      <td><FarmseyeInput value={u.regDate}/></td>
      <td>{u.isUsing}</td>
      <FarmseyeButton title='변경' size='small' onClick={e => {}} />
      <FarmseyeButton title='취소' size='small' onClick={e => {}}/>
    </tr>
    :
    <tbody className={styles.user}>
      <tr>
        <td>{users.length - i}</td>
        <td>{u.id}</td>
        <td>{u.pw}</td>
        <td>{u.name}</td>
        <td>{u.age}</td>
        <td>{u.email} </td>
        <td>{u.tel} </td>
        <td>{u.regDate}</td>
        <td>{u.isUsing} </td>
        <td className={styles.btn}>
        <FarmseyeButton 
          title='수정' 
          size='small' 
          onClick={(e) => {updateUserInfo()}}
        /> 
        <FarmseyeButton 
          title='삭제' 
          size='small' 
          onClick={(e) => {deleteUser()}}
        />
        </td>
      </tr>
    </tbody>
   
  )
}

export default AdminDetail