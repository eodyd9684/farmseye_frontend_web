import React from 'react';
import styles from './ProgressBarChart.module.css';

const VerticalProgressBar = ({danger, max, current }) => {
  const percentage = ((current / max) * 100).toFixed(1);
  
  return (
    <div className={styles.container}>
      {/* 전체 배경 바 */}
      <div className={styles.backgroundBar}>
        {/* 채워진 부분 */}
        <div 
          className={styles.progressBar} 
          style={{ 
            height: `${percentage}%`, // height로 변경
            backgroundColor: current >= danger ? '#EA4228': (current >= max ? '#F5CD19' : '#52c41a')
          }}
        />
      </div>
      
      {/* 수치 표시 */}
      <div className={styles.label}>
        <p>{current} / {max} ppm</p> {percentage}%
      </div>
    </div>
  );
};

export default VerticalProgressBar;
