const axios = require("axios");
const { Temperament } = require("../db");

const getAllTemperaments = async()=>{
    const allData = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
);
    try {
    let everyTemperament = allData.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
    if (el) {
        Temperament.findOrCreate({
        where: { name: el },
        });
    }
    });
    eachTemperament = await Temperament.findAll();
    return eachTemperament;
} catch (error) {
    throw new Error(error = error.message);
}
}

module.exports = {
    getAllTemperaments,
};

