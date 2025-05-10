import React, { useEffect, useState } from 'react'
import styles from './HomeLayout.module.css'

const HomeLayout = () => {
  const images = [
    "/images/banner1.jpg",
    "/images/banner2.png",
    "/images/banner3.png",
    "/images/banner4.jpg",
    "/images/banner5.png"
  ];
  

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 5000); // 30초마다 슬라이드 전환

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.size}>
      <div className={styles.home_container}>
        
        <img
          src={images[current]}
          alt={`슬라이드 이미지 ${current + 1}`}
          className={styles.slider_image}
        />

        <div>
          <h2>Farms Eye</h2>
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

        {/* 인디케이터 점 */}
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${current === index ? styles.active : ''}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>

      </div>

      <div className={styles.footer}>
        <div className={styles.footer_contact}>
          <img src="/images/logo.png" />

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