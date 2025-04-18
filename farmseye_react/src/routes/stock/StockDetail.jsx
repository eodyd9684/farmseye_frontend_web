import axios from 'axios'
import React, { useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import FarmseyeButton from '../../common_component/FarmseyeButton'
import styles from '../stock/Stock.module.css'

const StockDetail = ({stock, setStockInfo, stockInfo, setUserTrigger}) => {

  const [isShow, setIsShow] = useState(false)

  //stockInfo를 저장 하는 변수
  const [updateInfo, setUpdateInfo] = useState({...stock})

  //개체 수정
  const updateStock = () => {
    axios.put(`/api/stock/${stock.stockNum}`, updateInfo)
    .then(res => {
      console.log(res.data)
      setIsShow(false)
      setUserTrigger({})
    }).catch(error => console.log(error))
  }

  const changeInfo = (e) => {
    setUpdateInfo({
      ...updateInfo,
      [e.target.name] : e.target.value
    })
  }

  //개체 삭제
  const deleteStock = () => {
    axios.delete(`/api/stock/${stock.stockNum}`)
    .then(res => {
      alert('삭제 되었습니다.')
      setUserTrigger({})
    })
    .catch()
  }

  return (
    <>
  {
    isShow ? 
    <tbody>
      <tr>
        <td className={styles.stock_cell}>{updateInfo.individualNum}</td>
        <td className={styles.stock_cell}>
          <FarmseyeInput
            name='warehousing'
            value={updateInfo.warehousing} 
            onChange={changeInfo}
            className={styles.stock_input}
          />
        </td>
        <td className={styles.stock_cell}>
          <FarmseyeInput
            name='shipment'
            value={updateInfo.shipment} 
            onChange={changeInfo}
          />
        </td>
        <td className={styles.stock_cell}>
          <FarmseyeInput
            name='stockWeight'
            value={updateInfo.stockWeight} 
            onChange={changeInfo}
          />
        </td>
        <td className={styles.stock_cell}>
          <FarmseyeInput 
            name='deathStock'
            value={updateInfo.deathStock}
            onChange={changeInfo}
          />
        </td>
        <td className={styles.stock_cell}>{updateInfo.regDate}</td>
        <td className={styles.set_btn}>
          <FarmseyeButton 
            title='확인' 
            size='small' 
            onClick={updateStock} 
          />
          <FarmseyeButton 
            title='취소' 
            size='small' 
            onClick={() => setIsShow(false)} 
          />
        </td>
      </tr>
    </tbody>
    :
    <tbody>
      <tr>
        <td className={styles.stock_cell}>{stock.individualNum}</td>
        <td className={styles.stock_cell}>{stock.warehousing}</td>
        <td className={styles.stock_cell}>{stock.shipment}</td>
        <td className={styles.stock_cell}>{stock.stockWeight}</td>
        <td className={styles.stock_cell}>{stock.deathStock}</td>
        <td className={styles.stock_cell}>{stock.regDate}</td>
        <td className={styles.set_btn}>
          <FarmseyeButton 
            title='수정' 
            size='small' 
            onClick={() => setIsShow(true)} 
          />
          <FarmseyeButton 
            title='삭제' 
            size='small' 
            onClick={deleteStock} 
          />
        </td>
      </tr>
    </tbody>
  }
</>
  )
}

export default StockDetail