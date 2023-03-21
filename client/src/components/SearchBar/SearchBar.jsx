import React from "react";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { getDogsByName } from "../../redux/actions";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [ name, setName ] = useState('')

    const handleInputChange = (event) => {
        event.preventDefault();
        setName(event.target.value);
    }   

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getDogsByName(name))
    }

    return (
        <div>
            <input type='text' placeholder='Search...' onChange={handleInputChange} />
            <button type='submit' onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default SearchBar;