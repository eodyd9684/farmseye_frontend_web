import React from "react";
import styles from './MainLayout.module.css'

const MainLayout = () => {
  return (
    <>
      <div>MainLayout</div>
      <div className={styles.main_container}>
        <div className={styles.first_container}>
          <div>
            a
          </div>
          <div>
            b
          </div>
          <div>
            c
          </div>
        </div>
        <div className={styles.second_container}>
          <div>
            d
          </div>
          <div>
            e
          </div>
          <div>
            f
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
