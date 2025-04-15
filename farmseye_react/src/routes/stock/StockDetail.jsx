import axios from 'axios'
import React, { useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import FarmseyeButton from '../../common_component/FarmseyeButton'

const StockDetail = ({stock, setStockInfo, stockInfo}) => {

  const [isShow, setIsShow] = useState(false)

  const [updateInfo, setUpdateInfo] = useState({...stock})

  //개체 수정
  axios.put(`/api/stock/${stock.stockNum}`, stock)
  .then(res => {
    console.log(res.data)
  }).catch(error => console.log(error))

  const changeInfo = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name] : e.target.value
    })
  }

  return (
    <>
          {
            isShow ? 
            <tbody>
              <tr>
                <td>
                  <FarmseyeInput
                  value={updateInfo.individualNum} 
                  onChange={() => {changeInfo}}/>
                </td>
                <td>
                  <FarmseyeInput
                  value={updateInfo.warehousing} 
                  onChange={() => {changeInfo}}/>
                </td>
                <td>
                  <FarmseyeInput
                  value={updateInfo.shipment} 
                  onChange={() => {changeInfo}}/>
                </td>
                <td>
                  <FarmseyeInput
                  value={updateInfo.stockWeight} 
                  onChange={() => {changeInfo}}/>
                </td>
                <td>
                  <FarmseyeInput 
                  value={updateInfo.deathStock}
                  onChange={() => {changeInfo}}/>
                </td>
                <td>
                  <FarmseyeButton title='확인' size='small' onClick={() => {}} />
                  <FarmseyeButton title='취소' size='small' onClick={() => {}} />
                </td>
              </tr>
            </tbody>
            :
            <tbody>
              <tr>
                <td>{stock.individualNum}</td>
                <td>{stock.warehousing}</td>
                <td>{stock.shipment}</td>
                <td>{stock.stockWeight}</td>
                <td>{stock.deathStock}</td>
                <td>{stock.regDate}</td>
                <td>
                  <FarmseyeButton title='수정' size='small'/> 
                  <FarmseyeButton title='삭제' size='small'/> 
                </td>
              </tr>
            </tbody>
          }
    </>
  )
}

export default StockDetail