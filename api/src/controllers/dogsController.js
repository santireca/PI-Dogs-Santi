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

const getDogByID = async (id, origin) => {
	try {
		if (origin === 'db') {
			let dogDB = await Dog.findOne({
				where: {
					id: id,
				},
				include: {
					model: Temperament,
					attributes: ['name'],
					through: { attributes: [] },
				},
			});

			if (dogDB) {
				return {
					id: inst.id,
					weight: inst.weight,
					height: inst.height,
					name: inst.name,
					life_span: inst.life_span,
					image: inst.image,
					temperament: inst.temperament
						? inst.temperament.map((el) => el.name).join(', ')
						: ['Happy'],
					createInDb: true,
				};
			}
		} else {

			let result = await axios(
				`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`,
			);

            let perrito = result.data.find(el=> el.id === Number(id) );

				let weightMin = parseInt(perrito.weight.metric.slice(0, 2).trim());

				let weightMax = parseInt(perrito.weight.metric.slice(4).trim());

				let averageWeight = weightMax + weightMin;

				if (weightMin && weightMax) {
					averageWeight = averageWeight / 2;
				} else if (weightMin && !weightMax) {
					weightMax = weightMin;
					averageWeight = weightMin;
				} else if (!weightMin && weightMax) {
					weightMin = weightMax;
					averageWeight = weightMax;
				} else if (inst.name === 'Smooth Fox Terrier') {
					weightMin = 6;
					weightMax = 9;
					averageWeight = (weightMax + weightMin) / 2;
				} else {
					weightMin = 20;
					weightMax = 30;
					averageWeight = (weightMax + weightMin) / 2;
				}

				let dogDetail = {
					id: perrito.id,
					name: perrito.name,
					height: perrito.height.metric,
					life_span: perrito.life_span,
					image: perrito.image ? perrito.image.url : " ",
					temperament: perrito.temperament,
					weightMin: weightMin,
					weightMax: weightMax,
					averageWeight: averageWeight,
				};

				return dogDetail;
			}
		
	} catch (error) {
		return { error: `The dog with id ${id} does not exist` };
	}}

// const getDogByID= async(id)=>{
//     const allDogs= await getAllDogs()
//     const dog= await allDogs.find(dog=>dog.id === Number(id))

//     if(!dog) throw Error(`Dog ${id} doesnt exist`)
//     return dog
// }

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