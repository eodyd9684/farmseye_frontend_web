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
    <>
      <div>
        입고 수
        <FarmseyeInput 
          name="warehousing" 
          value={stockData.warehousing} 
          onChange={(e) => {changeData(e)}} 
        />
      </div>
      <div>
        총 무게
        <FarmseyeInput 
          name="stockWeight" 
          value={stockData.stockWeight} 
          onChange={(e) => {changeData(e)}} 
        />
      </div>
      <div>
        <FarmseyeButton title='등록' size='small' onClick={() => {insertStock()}}/>
        <FarmseyeButton title='취소' size='small' onClick={() => {nav('/stock')}} />
      </div>
    </>
  )
}

export default StockRegistration