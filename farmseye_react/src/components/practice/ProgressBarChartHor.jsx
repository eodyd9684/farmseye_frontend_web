import React from 'react';
import styles from './ProgressBarChartHor.module.css';

const ProgressBarChartHor = ({danger, max, current }) => {
  const percentage = ((current / danger) * 100).toFixed(1);

  return (
    <div className={styles.container}>
      {/* 전체 배경 바 */}
      <div className={styles.backgroundBar}>
        {/* 채워진 부분 */}
        <div 
          className={styles.progressBar} 
          style={{ 
            width: `${percentage}%`, // width로 변경
            backgroundColor: current >= danger ? '#FB4141': (current >= max ? '#FFC145' : '#16C47F')
          }}
        />
      </div>

      {/* 수치 표시 */}
      <div className={styles.label}>
        <p>{current} / {danger} ppm</p> {percentage}%
      </div>
    </div>
  );
  };
  
export default ProgressBarChartHor;
