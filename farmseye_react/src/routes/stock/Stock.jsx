import React from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'

const Stock = () => {

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <td>개체수 : <FarmseyeInput/> </td>
              <td>입추 : <FarmseyeInput/> </td>
              <td>출하 : <FarmseyeInput/> </td>
            </tr>
          </thead>
        </table>
      </div>
    </>
  )
}

export default Stock