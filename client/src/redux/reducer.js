import { GET_DOGS, GET_DOG_DETAIL, GET_BY_NAME, FILTER_BY_CREATION, ORDER_BY_NAME, ORDER_BY_WEIGHT, GET_TEMPERAMENTS_LIST, FILTER_BY_TEMPER } from "./action-types";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    dogDetail: {},
}

const reducer = (state = initialState, action) => {
    let aux = [];

    switch(action.type){
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case GET_DOG_DETAIL:
            return {
                ...state,
                dogDetail: action.payload
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

        case ORDER_BY_WEIGHT: 
            if (action.payload === "min") {
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.weightMin < dogB.weightMin) return -1;
                    if(dogA.weightMin > dogB.weightMin) return 1;
                    return 0;
                })
            } else if (action.payload === "max") {
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.weightMax > dogB.weightMax) return -1;
                    if(dogA.weightMax < dogB.weightMax) return 1;
                    return 0;
                })
            } else if (action.payload === "ave"){
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.averageWeight < dogB.averageWeight) return -1;
                    if(dogA.averageWeight > dogB.averageWeight) return 1;
                    return 0;
                })
            } else if (action.payload === "ave-max"){
                aux = state.dogs.sort((dogA, dogB) => {
                    if(dogA.averageWeight > dogB.averageWeight) return -1;
                    if(dogA.averageWeight < dogB.averageWeight) return 1;
                    return 0;
                })
            } else {
                console.log('Error')
            }

            return {
                ...state,
                dogs: aux
            }
        

        default:
                return {...state}
    }
    
}

export default reducer;