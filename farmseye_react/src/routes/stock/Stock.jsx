import React, { useEffect, useState } from 'react'
import FarmseyeInput from '../../common_component/FarmseyeInput'
import axios from 'axios';
import StockDetail from './StockDetail';
import FarmseyeButton from '../../common_component/FarmseyeButton';
import StockRegistration from './StockRegistration';
import { useNavigate } from 'react-router-dom';
import styles from '../stock/Stock.module.css'
import { axiosInstance } from '../../redux/axiosInstance';

const Stock = () => {
  const nav = useNavigate()
  //개체 저장할 변수
  const [stockInfo, setStockInfo] = useState([]);

  //user 정보 재조회 실행을 위한 변수
  const [userTrigger, setUserTrigger] = useState({});
  
  // 페이징 상태
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 현재 페이지에 맞는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockInfo.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(stockInfo.length / itemsPerPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  //개체 조회
  useEffect(() => {
    axiosInstance.get(`/stock`)
    .then(res => {
      setStockInfo(res.data)
      setCurrentPage(1); // 갱신시 1페이지로 초기화
    })
    .catch(error => console.log(error))
  }, [userTrigger])
  

  return (
  <div className={styles.stock_container}>
    <div className={styles.size}>
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
          {currentItems.map((stock, i) => (
            <StockDetail
              key={stock.stockNum}
              stock={stock}
              stockInfo={stockInfo}
              setStockInfo={setStockInfo}
              setUserTrigger={setUserTrigger}
            />
          ))}
        </table>
      </div>
      {/* ✅ 페이징 UI */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
  )
}

export default Stock