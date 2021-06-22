const axios = require("axios").default;
const { BASE_URL, BASE_PLATFORMS } = require("../../../constants");
const {RAWG_API_KEY} = process.env
const {Genre} = require('../../db');


async function getInfo(req,res,next) {

  try{
    console.log("Llegó la consulta de getInfo")
    const consultaApiPlatforms = await axios
        .get(`${BASE_URL}${BASE_PLATFORMS}?key=${RAWG_API_KEY}`, {
          responseType: "json",
        })
      
    const platforms = consultaApiPlatforms.data.results;
    const genre = await Genre.findAll()


    res.json({
        platforms,
        genre
    })

  } catch(err) {
       (err) => next(err);
  }
}

module.exports = {
  getInfo,
};
