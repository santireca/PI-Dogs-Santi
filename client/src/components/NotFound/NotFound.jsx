import React from "react";
import { Link } from "react-router-dom";
import styles from '../NotFound/notFound.module.css'

const NotFound = () => {
    

    return (
        <div className={styles.main}>
            <div className={styles.message}>
                <h2>Hey buddy!</h2>
                <h3>Are you lost? Don't worry</h3>
                <div className={styles.takeHome}>
                    <h1>Let me take you </h1>
                    <Link to='/home'>
                        <div>
                            <h1 className={styles.home}>HOME</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;