import React from 'react'
import styles from './TestButton.module.css'

const TestButton = ({title = '버튼', size = 'normal' , ...props}) => {
  return (
    <>
      <button
        className={[styles.btn,styles[size]].join(' ')}
        type='button'
        {...props}
      >
        {title}
      </button>
    </>
  )
}

export default TestButton