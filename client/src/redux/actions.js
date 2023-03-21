import axios from 'axios';
import { GET_DOGS, DOG_DETAIL, GET_BY_NAME, FILTER_BY_CREATION, ORDER_BY_NAME, ORDER_BY_WEIGHT, FILTER_BY_TEMPER, GET_TEMPERAMENTS_LIST } from './action-types';

export const getAllDogs = () => {
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/dogs')
        return dispatch({ type: GET_DOGS, payload: json.data })
    }
}

export const getdogDetail=(id)=>{
    return async function(dispatch){
        let json= await axios.get(`http://localhost:3001/dogs/${id}`)
        return dispatch({
            type: DOG_DETAIL, payload: json.data
        })
    }
}

export const getDogsByName = (payload) => {
    return async function(dispatch){
        try {
            let json = await axios.get('http://localhost:3001/dogs?name=' + payload);
            return dispatch({
                type: GET_BY_NAME,
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const filteredByCreation = (payload) => {
    return {
        type: FILTER_BY_CREATION,
        payload
    }
}

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export const orderByWeight = (payload) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload
    }
}

export const getTemperamentsList = () => {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/temperaments');
        let listOfTemperaments = json.data.map(el => el.name)
        return dispatch({
            type: GET_TEMPERAMENTS_LIST,
            payload: listOfTemperaments
        });
    }
}

export const filterByTemper= (payload)=> {
    return {
        type: FILTER_BY_TEMPER,
        payload
    }
}