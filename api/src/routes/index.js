const { Router } = require('express');
const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db');

// // // Importar todos los routers;
// // // Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// // // Configurar los routers
// // // Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const urlApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const infoApi = await urlApi.data.map(element => {
        return {
            id: element.id,
            image: element.image.url,
            name: element.name,
            temperament: element.temperament,
            weight: element.weight,
            origin: element.origin,
        }
        
    })
    return infoApi;
}

const getDbInfo = async () => {
    let dbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
            attributes: [],
            },
        },
    });

    const dbTemp = dbDogs.map((element) => {
        return {
            id: element.id,
            image: element.img,
            name: element.name,
            temperament: element.temperaments.map((temp)=> temp.name).join(', '),
            life_span: element.life_span,
            weight: element.weight,
            origin: element.origin,
            createInDb:true
        };
    });

    return dbTemp;
}

const getAllDogs = async () =>{
    const infoApi = await getApiInfo();
    const infoDb = await getDbInfo();
    const infoTotal = infoApi.concat(infoDb);
    return infoTotal;
}

// // router.get('/dogs', async (req, res) =>{
// //     const { name } = req.query;

// //     const allDogs = await getAllDogs();

// //     if(name){

// //         let dogName = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()));

// //         dogName.length 
// //             ? res.status(200).json(dogName) 
// //             : res.status(400).send('We could not find the dog you are looking for')

// //     } else {
// //         res.status(200).send(allDogs)
// //     }
// // })

// // router.get('/temperaments', async (req, res) => {
// //     const temperamentApi = await axios.get('https://api.thedogapi.com/v1/breeds');
// //     try {
// //         let everyTemperament = temperamentApi.data
// //             .map((dog) => (dog.temperament ? dog.temperament : "No info"))
// //             .map((dog) => dog?.split(", "));
// //         let eachTemperament = [...new Set(everyTemperament.flat())];
// //         eachTemperament.forEach((temp) => {
// //             if (temp) {
// //             Temperament.findOrCreate({
// //                 where: { name: temp },
// //             });
// //             }
// //         });
// //         eachTemperament = await Temperament.findAll();
// //         res.status(200).json(eachTemperament);
// //         } catch (error) {
// //         res.status(404).send(error);
// //         }
// // })

// // router.post('/dog', async (req, res) => {
// //     let {
// //         name,
// //         height,
// //         weight,
// //         years,
// //         image,
// //         life_span,
// //         temperament,
// //         createInDb,
// //     } = req.body

// //     let dogCreated = await Dog.create({
// //         name,
// //         height,
// //         weight,
// //         years,
// //         image,
// //         life_span,
// //         createInDb,
// //     });

// //     let temperamentDb = await Temperament.findAll({where: { name: temperament }})
// //     dogCreated.addTemperament(temperamentDb);
    
// //     res.send('Dog created successfully')
// // })

// // router.get('/dogs/:id', async (req, res) => {
// //     const { id } = req.params;
// //     const allDogs = await getAllDogs();
// //     if(id){
// //         let dogId = allDogs.filter(dog => dog.id == id)

// //         dogId.length ? res.status(200).json(dogId) : res.status(404).send('We could not find the dog')
// //     }
// // })

// module.exports = {
//     router,
//     getAllDogs
// };



// const { Router } = require('express');
// const axios = require('axios') 
// const {Dog, Temperaments} = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


// const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// const getInfoAPI = async () => {
//     const response = await axios.get("https://api.thedogapi.com/v1/breeds/?api_key={live_eR5MI1lqAuwPyn2s9rxzH0ZA4OUXrHkuB526sNg6t8s2V2K7GCuNzVrxjNvoCZtV}");
//     const data = await response.data.map((dog) => {
//     return {
//         id: dog.id,
//         image: dog.image.url,
//         name: dog.name,
//         temperament: dog.temperament,
//         weight: dog.weight,
//         origin: dog.origin,
//     };
//     });

//     return data;
// };

// const getDBInfo = async () => {
//     let DogDB = await Dog.findAll({
//     include: {
//         model: Temperament,
//         attributes: ["name"],
//         through: {
//         attributes: [],
//         },
//     },
//     });

//     const tempDB = DogDB.map((dog) => {
//     return {
//         id: dog.id,
//         image: dog.img,
//         name: dog.name,
//         temperament: dog.temperaments.map((temper)=> temper.name).join(', '),
//         life_span: dog.life_span,
//         weight: dog.weight,
//         origin: dog.origin,
//         temperamentCC: dog.temperament,
//         created:true
//     };
//     });

//     return tempDB
// }



// const getAllDogs = async () => {
//     const apiInfo = await getApiInfo();
//     const dbInfo = await getDBInfo();
//     const infoTotal = apiInfo.concat(dbInfo);
//     return infoTotal;
// };

module.exports = {
    router, 
    getAllDogs, 
} 

