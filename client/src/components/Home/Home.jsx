import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { getAllDogs, filteredByCreation, orderByName, orderByWeight, getTemperamentsList, filterByTemper } from "../../redux/actions";
import DogCard from '../DogCard/DogCard';
import Paginated from "../Paginated/Paginated";
import SearchBar from "../SearchBar/SearchBar";

const Home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const [ order, setOrder ] = useState('');
    const [temperament, setTemperament]= useState('all')
    const [ orderWeight, setOrderWeight ] = useState('');
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ dogsPerPage, setDogsPerPage ] = useState(8);
    const indexOfLastDog = currentPage *  dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const temperaments = useSelector((state) => state.temperaments).sort(
        function (a, b) {
            if (a < b) return -1;
            else return 1;
        }
    );

    useEffect( () => {
        dispatch(getAllDogs());
        dispatch(getTemperamentsList());
    }, [dispatch])

    const handlerClick = (event) => {
        event.preventDefault();
        dispatch(getAllDogs())
    }

    const handleFilteredByCreation = (event) => {
        event.preventDefault();
        dispatch(filteredByCreation(event.target.value))
    }

    const handleSortByName = (event) => {
        event.preventDefault();
        dispatch(orderByName(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${event.target.value}`)
    }

    const handleSortByWeight = (event) => {
        event.preventDefault();
        dispatch(orderByWeight(event.target.value));
        setCurrentPage(1);
        setOrderWeight(`Ordered ${event.target.value}`)
    }
    
    const handleFilterByTemper= (event) => {
        setTemperament(event.target.value)
        dispatch(filterByTemper(event.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${event.target.value}`);
    }

    return(
        <div>
            <Link to='/dog'>Create dog</Link>
            <h1>DOGS</h1>
            <button onClick={handlerClick}>Reload dogs</button>
            <div>
                <select onChange={handleSortByName}>
                    <option value='up' >A-Z</option>
                    <option value='down' >Z-A</option>
                </select>

                <select onChange={handleSortByWeight}>
                    <option value='min' >Min - Max</option>
                    <option value='max' >Max - Min</option>
                </select>
                
                <select value={ temperament } onChange={ event => {handleFilterByTemper(event)} }>
                    <option value="all">All Temperaments</option>
                        {temperaments.map((temp) => {
                            return (
                    <option value={temp} key={temp}>
                        {temp}
                    </option>
                        );
                    })}
                </select> 

                <select onChange = {handleFilteredByCreation}>
                    <option value="all" >All</option>
                    <option value="createInDb" >Created</option>
                    <option value="api" >Existent</option>
                </select>

                <SearchBar/>

                <Paginated dogsPerPage = {dogsPerPage} allDogs = {allDogs.length} paginated = {paginated} />

                {
                    currentDogs && currentDogs.map(dog => {
                        return (
                            <DogCard name = {dog.name} image = {dog.image} temperament = {dog.temperament} weight = {dog.weight.metric} />
                        )
                    })
                }
            </div>
        </div>
    )

}

export default Home;