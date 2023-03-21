const {Router}= require("express")
const {getDogs, findDogs, getDogByID, createNewDog}=require('../controllers/dogsController')

const dogsRouter = Router()

// dogsRouter.get("/", async (req, res)=>{
//     const {name} = req.query
//     let dogs
//         if(name){
//             dogs= await findDogs(name)
//             if(dogs.error) return res.status(404).json(dogs)
//             return res.status(200).json(dogs)
//         }else{
//             dogs= await getDogs()
//             return res.status(200).json(dogs)
//         }
// })

dogsRouter.get("/", async(req, res)=>{
    const{name}=req.query
    let dogs
    try {
        if(name){
            dogs= await findDogs(name)
            return res.status(200).json(dogs)
                }else{
            dogs= await getDogs()
            return res.status(200).json(dogs)
                }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


dogsRouter.get("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const dog = await getDogByID(id)
        res.status(200).json(dog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


dogsRouter.post("/", async (req, res)=> {
    let { weight, height, name, life_span, image, temperament, from_DB }= req.body;
    try {
        await createNewDog(weight, height, name, life_span, image, temperament)
        res.status(200).send("New dog successfully created")
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}) 

module.exports= dogsRouter