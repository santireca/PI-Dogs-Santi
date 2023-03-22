import React from "react";
import { Link } from "react-router-dom";
import styles from '../DogCard/dogCard.module.css'

const DogCard = ({ id, image, name, temperament, weightMin, weightMax, averageWeight }) => {
    return (
        <div className={styles.dogCard}>
            <h5>{id}</h5>
            <img src={image} alt={name} height='200px' />
            <Link to={`/detail/${id}`}>
                <h3>{name}</h3>
            </Link>
            <h5>{temperament}</h5>
            <h3>Min weight: {weightMin} - Max weight: {weightMax}</h3>
            <h3>Average weight: {averageWeight}</h3>
        </div>
    )
}

export default DogCard;