const {Dog, Temperament} = require('../db')
const { getAllDogs } = require('../routes/index')

const getDogs =()=>{
    const allDogs = getAllDogs();
    return allDogs
}


const findDogs = async (name)=>{
    const allDogs = await getAllDogs();
    const results = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
    if(!results.length) throw Error (`Dog ${name} doesnt exist`)
    return results
}

const getDogByID= async(id)=>{
    const allDogs= await getAllDogs()
    const dog= await allDogs.find(dog=>dog.id === Number(id))

    if(!dog) throw Error(`Dog ${id} doesnt exist`)
    return dog
}

const createNewDog= async (weight, height, name, life_span, image, temperament)=> {
    if (!weight || !height || !name || !life_span || !image || !temperament){
    throw new Error("Missing information. Please, complete all the required data.")
    }
    else{
        let newDog= await Dog.create({
            weight,
            height,
            name,
            life_span,
            image,
        })
        let temper= await Temperament.findAll({
            where: {
                name: temperament
            }
        })
        await newDog.addTemperament(temper);
    }
};

module.exports={
    getDogs,
    findDogs,
    getDogByID,
    createNewDog
}