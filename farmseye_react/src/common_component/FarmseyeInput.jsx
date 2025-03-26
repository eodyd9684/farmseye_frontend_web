import React from 'react'
import styles from './FarmseyeInput.module.css'

const FarmseyeInput = ({type='text', size='', ...props}) => {
  return (
    <>
      <input className={size === '' 
                          ? styles.input 
                          : [styles.input, styles.wide].join(' ')}
                          type={type}
                          {...props}/>
    </>
  )
}

export default FarmseyeInput