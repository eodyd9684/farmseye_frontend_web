import React, { useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import axios from 'axios'
import FarmseyeButton from '../../common_component/FarmseyeButton'
import { useNavigate } from 'react-router-dom'
import styles from '../stock/Stock.module.css'

const StockRegistration = () => {
  const nav = useNavigate()

  const [stockData, setStockData] = useState({
    warehousing: '',
    stockWeight: '',
    userId : 'user'
  })

  console.log(stockData)
  
  const changeData = (e) => {
    const { name, value } = e.target
    setStockData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  //개체 등록
  const insertStock = () => {
    axios.post('/api/stock/join', stockData)
      .then(res => {
        console.log(res.data)
        setStockData({ warehousing: '', stockWeight: '' }) // 입력값 초기화
        nav('/stock')
      })
      .catch(error => console.log(error))
  }

  return (
    <div className={styles.registrationWrapper}>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>입고 수</label>
        <FarmseyeInput
          name="warehousing"
          value={stockData.warehousing}
          onChange={changeData}
          className={styles.input}
        />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.label}>총 무게</label>
        <FarmseyeInput
          name="stockWeight"
          value={stockData.stockWeight}
          onChange={changeData}
          className={styles.input}
        />
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.cancelButton} onClick={() => nav('/stock')}>
          취소
        </button>
        <button onClick={insertStock}>
          등록
        </button>
      </div>
    </div>
  )
}

export default StockRegistration