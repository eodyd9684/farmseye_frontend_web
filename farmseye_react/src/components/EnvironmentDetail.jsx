import React from 'react'
import styles from './EnvironmentDetail.module.css'

const EnvironmentDetail = () => {



  return (
    <div className={styles.container}>
      <div className={styles.data_container}>

        <div className={styles.weather}>
          <div>
            <div>현재 날씨 아이콘</div>
            <div>날씨 상태</div>
            <div>요일</div>
            <div>온도</div>
          </div>

          
          <div>
            <div>
              <span>날씨 아이콘</span>
              <span>요일</span>
              <span>예상온도</span>
            </div>

            <div>
              <span>날씨 아이콘</span>
              <span>요일</span>
              <span>예상온도</span>
            </div>

            <div>
              <span>날씨 아이콘</span>
              <span>요일</span>
              <span>예상온도</span>
            </div>

            <div>
              <span>날씨 아이콘</span>
              <span>요일</span>
              <span>예상온도</span>
            </div>

            <div>
              <span>날씨 아이콘</span>
              <span>요일</span>
              <span>예상온도</span>
            </div>

            <div>
              <span>날씨 아이콘</span>
              <span>요일</span>
              <span>예상온도</span>
            </div>
          </div>
        </div>

        <div>요일별 온도</div>

        <div>요일별 습도</div>
      </div>
    </div>
  )
}

export default EnvironmentDetail