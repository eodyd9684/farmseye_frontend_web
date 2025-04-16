import React, { useEffect, useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import axios from 'axios';
import StockDetail from './StockDetail';
import FarmseyeButton from '../../common_component/FarmseyeButton';
import StockRegistration from './StockRegistration';
import { useNavigate } from 'react-router-dom';
import styles from '../stock/Stock.module.css'

const Stock = () => {
  const nav = useNavigate()
  //개체 저장할 변수
  const [stockInfo, setStockInfo] = useState([]);

  //user 정보 재조회 실행을 위한 변수
    const [userTrigger, setUserTrigger] = useState({});

  //개체 조회
  useEffect(() => {
    axios.get('/api/stock')
    .then(res => {
      console.log(res.data)
      setStockInfo(res.data)
    })
    .catch(error => console.log(error))
  }, [userTrigger])
  
  console.log(stockInfo)

  return (
    <div className={styles.stock_container}>
  <div>
    개체 등록
    <FarmseyeButton 
      title='등록' 
      onClick={() => {nav('/stock/join')}} 
      className={styles.farmseye_button}
    />
  </div>
  <div>
    <table className={styles.stock_table}>
      <thead>
        <tr>
          <th>개체수</th>
          <th>입고수</th>
          <th>출하수</th>
          <th>총무게</th>
          <th>폐사수</th>
          <th>날짜</th>
          <th>작업</th>
        </tr>
      </thead>
      {stockInfo.map((stock, i) => (
        <StockDetail
          key={i}
          stock={stock}
          stockInfo={stockInfo}
          setStockInfo={setStockInfo}
          setUserTrigger={setUserTrigger}
        />
      ))}
    </table>
  </div>
</div>
  )
}

export default Stock