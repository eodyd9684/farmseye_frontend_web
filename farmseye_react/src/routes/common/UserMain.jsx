import React from 'react'
import styles from './UserMain.module.css'

const UserMain = () => {
  return (
    <div className={styles.container}>
        <div className={styles.user_main_contents}>
          
          <div>
            <img src="public\test1.jpg" />
          </div>

          <div>
            <img src="public\test2.jpg" />
          </div>
          
          <div>
            <img src="public\test3.jpg" />
          </div>

          <div>
            <img src="public\test4.jpg" />
          </div>

          <div>
            <img src="public\test5.jpg" />
          </div>

          <div>
            <img src="public\test6.jpg" />
          </div>

        </div>
    </div>
  )
}

export default UserMain