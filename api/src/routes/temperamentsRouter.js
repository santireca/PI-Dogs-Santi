const {Router}= require("express")
const { getAllTemperaments } = require('../controllers/temperamentsController');
const temperamentsRouter = Router()

temperamentsRouter.get("/", async (req, res) => {
try {
    const temperaments = await getAllTemperaments();
    res.status(200).json(temperaments);
} catch (error) {
    res.status(404).send(error= error.message);
}  
});


module.exports= temperamentsRouter
