import React from 'react'
import styles from './FarmseyeButton.module.css'

//팀 프로젝트에 사용할 버튼 컴포넌트

const FarmseyeButton = ({title = '버튼', size = 'normal', ...props}) => {
  return (
    <>
      <button className={[styles.btn, styles[size]].join(' ')} 
              type='button'
              {...props}
      >{title}</button>
    </>
  )
}

export default FarmseyeButton