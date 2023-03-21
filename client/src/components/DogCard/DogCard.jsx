import React from "react";
import { Link } from "react-router-dom";

const DogCard = ({ id, image, name, temperament, weight }) => {
    return (
        <div>
            <img src={image} alt={name} height='200px' />
            <Link to={`/detail/${id}`}>
                <h3>{name}</h3>
            </Link>
            <h5>{temperament}</h5>
            <h5>{weight}</h5>
        </div>
    )
}

export default DogCard;