// 외부파일에서 선언한 변수 및 함수를 사용하기 위해서는
// export(내보내기)와 import(가져오기)를 적절히 사용해야함.

import axios from "axios"


// 첫 번째 방식 (export default)
// export default는 파일당 하나만 사용 가능
// export default로 내보낸 데이터는 사용할때, 이름을 변경해서 받을 수 있다. 



// 두 번째 방식
// 변수나 함수 앞에 export 키워드만 붙여서 내보내기 가능
// export default와 달리 필요한 만큼 데이터를 보낼 수 있다.
// export로 내보내진 데이터는 사용 시 반드시 이름 동일하게만 사용할 수 있다.
//export로 내보내진 데이터는 import시 중괄호에 데이터 이름을 가져간다.

/**
 * 회원가입
 * userList
 * {
 * userId : '',
    userPw : '',
    userName : '',
    userEmail : '', //완성된 이메일
    email1 : '',
    email2 : '@gmail.com',
    userAge : '',
    userTel : '',
    tel1 : '',
    tel2 : '',
    tel3 : '',
    userAddr : ''
  }
 *  
 */
export const regUser = (userList) => {
  const responcs = axios.post('/api/users',userList)
  return responcs;
}