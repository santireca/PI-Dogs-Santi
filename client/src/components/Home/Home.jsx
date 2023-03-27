import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import {filterByOrigin, getAllBreeds, orderByName, orderByWeight, filterByTemper, getAllTemperaments} from "../../redux/actions"
import DogCard from '../DogCard/DogCard';
import Paginated from '../Paginated/Paginated';
import SearchBar from '../SearchBar/SearchBar'
import styles from "../Home/home.module.css";
import { Link } from 'react-router-dom';


//This function has the complete logic of /home path

const AllDogs = () => {

  //I create all the consts I need to use in this function

    const dispatch= useDispatch();
    const dogs= useSelector(state => state.dogs);
    const [order, setOrder]= useState('')
    const [temperament, setTemperament]= useState('all')

    const [currentPage, setCurrentPage]= useState(1) //I start always on page 1
    const [dogsPerPage, setDogsPerPage] = useState(8) //this number 8 is the amount of dogs I want to show per page
    const numOfLastDog= currentPage * dogsPerPage;
    const numOfFirstDog= numOfLastDog - dogsPerPage;
    const currentDogs = dogs.slice(numOfFirstDog, numOfLastDog)

    //I create all the functions
    
    const pagination= (page) => {setCurrentPage(page)}

    const temperaments = useSelector(state => [...state.temperaments].sort(
        function (a, b) {
        if (a < b) return -1;
        else return 1;
        }))

  // const temperaments = useSelector((state) => state.temperaments).sort(
  //   function (a, b) {
  //       if (a < b) return -1;
  //       else return 1;
  //   })


  const handleOrder1= (event) => {
    dispatch(orderByName(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleOrder2 = (event) =>{
    dispatch(orderByWeight(event.target.value))
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }


  const handleFilterByOrigin= (event) => {
    dispatch(filterByOrigin(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handleFilterByTemper= (event) => {
    setTemperament(event.target.value)
    dispatch(filterByTemper(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  const handlerClick = (event) => {
    event.preventDefault();
    dispatch(getAllBreeds())
}



  // I have to fill my dogs state with the info form my Back. I use the action I created to do this

  useEffect(()=> {
    dispatch(getAllBreeds())
    dispatch(getAllTemperaments())
  }, [dispatch]);


  //All the logic done, I return what I want to be rendered
  //Orders: by name (OK), by weight (DONE, BUT NOT WORKING!)
  //Filter by DB (DONE, BUT NOT WORKING!)
  //Filter by temperament-PENDING
  //Pagination numbers-OK
  //Dogs card as individual units-OK

  // return (
  //   <div>
  //     <div className={style.filters}>
  //       <div>Filter dogs' sourcing</div>
  //       <select onChange={event => {handleFilterByOrigin(event)}}>
  //         <option value="All">All</option>
  //         <option value="api">Existent</option>
  //         <option value="from_DB">Created</option>
  //       </select>

  //       <div>Filter dogs by temperament</div>
  //       <select value={temperament} onChange={event => {handleFilterByTemper(event)}}>
  //         <option value="all">All Temperaments</option>
  //             {temperaments.map((temp) => {
  //               return (
  //                 <option value={temp} key={temp}>
  //                   {temp}
  //                 </option>
  //               );
  //             })}
  //       </select> 

  //       <div>Alphabetical Ordering</div>
  //       <select defaultValue="name" onChange={event =>{handleOrder1(event)}}>
  //         <option value="name" disabled selected></option>
  //         <option value="a-z">A to Z</option>
  //         <option value="z-a">Z to A</option>
  //       </select>

  //       <div>Weight Ordering</div>
  //       <select defaultValue="weight" onChange={event =>{handleOrder2(event)}}>
  //         <option value="weight" disabled selected></option>
  //         <option value="min">Lighter to heavier</option>
  //         <option value="max">Heavier to lighter</option>
  //       </select>
  //       <div>Average weight</div>
  //       <select defaultValue="aver" onChange={event =>{handleOrder2(event)}}>
  //         <option value="aver" disabled selected></option>
  //         <option value="ave">Lighter to heavier</option>
  //         <option value="ave-max">Heavier to lighter</option>
  //       </select>
  //     </div>


  //       <Paginated
  //       dogsPerPage= {dogsPerPage}
  //       dogs= {dogs.length}
  //       pagination= {pagination} />

  //     <div className={style.container}>
  //     {
  //       currentDogs?.map(dog=> {
  //         return (
  //         <DogCard
  //         id= {dog.id}
  //         key= {dog.id}
  //         image= {dog.image}
  //         name= {dog.name}
  //         temperament= {dog.temperament}
  //         weightMin= {dog.weightMin}
  //         weightMax= {dog.weightMax}
  //         averageWeight= {dog.averageWeight}
  //         />
  //         )
  //       })
  //     }
  //     </div>    
  //   </div>
  // )

  return(
    <div>
        <div className={styles.navBar}>
            <Link to='/dog' className={styles.dogCreate}>Create</Link>
            <Link to='/home' className={styles.home}>Home</Link>
        </div>

        <div>
            <div className={styles.filters}>
                <div>
                    <button className={styles.reloadDogs} onClick={handlerClick}>Reload dogs</button>
                </div>

                
                    <div className={styles.sortByName}>
                        <div>Name:</div>
                        <select className={styles.sortByNameSelect} defaultValue='name' onChange={handleOrder1}>
                            <option className={styles.sortByNameOption} value="name" disabled selected></option>
                            <option className={styles.sortByNameOption} value='a-z' >A - Z</option>
                            <option className={styles.sortByNameOption} value='z-a' >Z - A</option>
                        </select>
                    </div>
                        
                    <div className={styles.sortByWeight}>
                        <div>Weight:</div>
                        <select  className={styles.sortByWeightSelect} defaultValue="weight" onChange={event =>{handleOrder2(event)}}>
                            <option className={styles.sortByWeightOption} value="weight" disabled selected></option>
                            <option className={styles.sortByWeightOption} value="min">Lighter to heavier</option>
                            <option className={styles.sortByWeightOption} value="max">Heavier to lighter</option>
                        </select>
                    </div>

                    <div className={styles.sortByAverageWeight}>
                        <div>Avg. weight:</div>
                        <select className={styles.sortByAverageWeightSelect} defaultValue="aver" onChange={event =>{handleOrder2(event)}}>
                            <option className={styles.sortByAverageWeightOption} value="aver" disabled selected></option>
                            <option className={styles.sortByAverageWeightOption} value="ave">Lighter to heavier</option>
                            <option className={styles.sortByAverageWeightOption} value="ave-max">Heavier to lighter</option>
                        </select>
                    </div>
                        
                    <div className={styles.filterByTemperament}>
                        <div>Temperament:</div>
                        <select className={styles.filterByTemperamentSelect} value ={ temperament } onChange={ event => {handleFilterByTemper(event)} }>
                            <option className={styles.filterByTemperamentOption} value ={ temperament } disabled selected></option>
                            <option className={styles.filterByTemperamentOption} value="all">All</option>
                                {temperaments.map((temp) => {
                                    return (
                            <option className={styles.filterByTemperamentOption} value={temp} key={temp}>
                                {temp}
                            </option>
                                );
                            })}
                        </select> 
                    </div>

                    <div className={styles.filterByCreation}>
                        <div>Creation:</div>
                        <select className={styles.filterByTemperamentSelect} defaultValue = 'creation' onChange = {handleFilterByOrigin}>
                            <option className={styles.filterByCreationOption} value="creation" disabled selected></option>
                            <option className={styles.filterByCreationOption} value="All" >All</option>
                            <option className={styles.filterByCreationOption} value="from_DB" >Created</option>
                            <option className={styles.filterByCreationOption} value="api" >Existent</option>
                        </select>
                    </div>

                    <div>
                        <SearchBar/>
                    </div>
                
            </div>
            

            <Paginated dogsPerPage= {dogsPerPage} dogs= {dogs.length} pagination = {pagination} />
                <div className={styles.dogCards}>
                {
                    currentDogs && currentDogs.map(dog => {
                        return (
                        <DogCard id = {dog.id} key = {dog.id} name = {dog.name} image = {dog.image} temperament = {dog.temperament} weightMin= {dog.weightMin} weightMax= {dog.weightMax} averageWeight= {dog.averageWeight} />
                        )
                    })
                }
                </div>
            </div>
    </div>
)
}

export default AllDogs