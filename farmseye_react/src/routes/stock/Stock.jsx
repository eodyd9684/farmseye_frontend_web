import React, { useEffect, useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import axios from 'axios';
import StockDetail from './StockDetail';

const Stock = () => {
  //개체 저장할 변수
  const [stockInfo, setStockInfo] = useState([]);

  //개체 조회
  useEffect(() => {
    axios.get('/api/stock')
    .then(res => {
      console.log(res.data)
      setStockInfo(res.data)
    })
    .catch(error => console.log(error))
  }, [])
  
  console.log(stockInfo)

  return (
    <>
      <div>
        <table border={1}>
          <thead>
            <tr>
              <td>개체수</td>
              <td>입고수</td>
              <td>출하수</td>
              <td>총무게</td>
              <td>폐사수</td>
              <td>날짜</td>
            </tr>
          </thead>
          {
            stockInfo.map((stock, i) => {
              return (
                <StockDetail
                  key={i}
                  stock={stock}
                  stockInfo={stockInfo}
                  setStockInfo={setStockInfo}
                />
                
              )
            })
          }
        </table>
      </div>
    </>
  )
}

export default Stock