import React from "react";
import { Link } from "react-router-dom";
import styles from '../LandingPage/landingPage.module.css'

const LandingPage = () => {
    return (
        <div className={styles.landingPage}>
            <div className={styles.welcome}>
                <h2 className={styles.h2}>Man's best</h2>
                <h1 className={styles.h1}>friend</h1>
                <Link to='/home'>
                    <button className={styles.landingButton}>Explore</button>
                </Link>
            </div>
            {/* <img src="https://www.thedogandfriends.com/assets/img/index/img-hero_dog.png" alt="" className={styles.landingImage}/> */}
        </div>
    )
}

export default LandingPage;