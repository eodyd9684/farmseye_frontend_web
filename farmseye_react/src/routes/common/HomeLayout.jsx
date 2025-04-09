import React from 'react'
import styles from './HomeLayout.module.css'

const HomeLayout = () => {

  return (
    <div className={styles.size}>
      <div className={styles.home_container}>
        <img src="public\easter_bunny_2026-wallpaper-2880x1200.jpg" alt="메인 홈 이미지.jpg" />
        <div>
          <h2>Farms Eye</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footer_contact}>
          <img src="/images/Farms Eye Logo.png" />

          <div className={styles.contact_icon}>
            <i class="bi bi-twitter-x" ></i>
            <i class="bi bi-instagram" ></i>
            <i class="bi bi-youtube"></i>
            <i class="bi bi-github"></i>
          </div>
        </div>
        
        <div className={styles.footer_info}>
          <i class="bi bi-info-circle">Info</i>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos quos commodi deserunt ipsum blanditiis facere porro quas, alias pariatur vero.</p>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout