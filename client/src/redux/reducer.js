import { GET_DOGS,DOG_DETAIL, GET_BY_NAME, FILTER_BY_CREATION, ORDER_BY_NAME, ORDER_BY_WEIGHT, GET_TEMPERAMENTS_LIST, FILTER_BY_TEMPER } from "./action-types";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: []
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case DOG_DETAIL: 
            return{
                ...state,
                dogsDetail: action.payload
            }

        case GET_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            }

        case FILTER_BY_CREATION:
            
            const createdFilter = action.payload === 'createInDb' ? state.allDogs.filter((dog) => dog.createInDb) : state.allDogs.filter((dog) => !dog.createInDb)
            return {
                ...state,
                dogs: action.payload === 'all' ? state.allDogs : createdFilter
            }

        case ORDER_BY_NAME:
            let sortedByName = action.payload === 'up' ?
            state.dogs.sort( function (a, b) {
                if(a.name > b.name) {
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort( function (a, b) {
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedByName
            }

        case ORDER_BY_WEIGHT:
            let sortedByWeight = action.payload === 'min' ?
            state.dogs.sort( function (a, b) {
                if(a.weight.metric > b.weight.metric) {
                    return 1;
                }
                if(b.weight.metric > a.weight.metric){
                    return -1;
                }
                return 0;
            }) :
            state.dogs.sort( function (a, b) {
                if(a.weight.metric > b.weight.metric) {
                    return -1;
                }
                if(b.weight.metric > a.weight.metric){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedByWeight
            }

        case GET_TEMPERAMENTS_LIST:
            return {
                ...state,
                temperaments: action.payload,
            };

        case FILTER_BY_TEMPER:
            let dogsWithChosenTemps= action.payload  === "all" ? state.allDogs :
            state.allDogs?.filter(dog=> {
                if(!dog.temperament) return undefined;
                return dog.temperament.split(", ").includes(action.payload)
            })
            return {
                ...state,
                dogs: dogsWithChosenTemps
            }

        default:
                return {...state}
    }
    
}

export default reducer;