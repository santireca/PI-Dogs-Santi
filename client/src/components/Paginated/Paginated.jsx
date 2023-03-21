import React from "react";
import styles from '../Paginated/paginated.module.css'

const Paginated = ({ dogsPerPage, allDogs, paginated }) => {
    const pageNumber = [];

    for (let i = 0; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i + 1)
    }

    return (
        <nav>
            <ul className={styles.pagination}>
                { pageNumber && pageNumber.map(number => (
                    <li key={number} className={styles['page-number']}>
                        <a onClick={() => paginated(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Paginated;