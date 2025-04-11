import React from 'react'
import styles from './Legend.module.css'

const Legend = () => {

  return (
    <div className={styles.container}>
      <div className={styles.green}>
        <div></div>
        <p>좋음</p>
      </div>

      <div className={styles.orange}>
        <div></div>
        <p>나쁨</p>
      </div>

      <div className={styles.red}>
        <div></div>
        <p>위험</p>
      </div>
    </div>
  )
}

export default Legend