import React from "react";
import styles from "../Paginated/paginated.module.css"

const Paginated = ({dogsPerPage, dogs, pagination}) => {

    const pageNumber = [];

    for (let i=0; i <= Math.floor(dogs/dogsPerPage); i++){
        pageNumber.push(i+1)
    }

    return (
        <nav className={styles.nav}>
            <ul className={styles.pagination}>
                { pageNumber && pageNumber.map(number => (
                    <li onClick={() => pagination(number)} key={number} className={styles['page-number']}>
                        <a >{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginated;