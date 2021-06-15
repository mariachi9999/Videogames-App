const axios = require("axios").default;
const { BASE_URL, BASE_PLATFORMS } = require("../../constants");
const {RAWG_API_KEY} = process.env



async function getPlatforms(req,res,next) {

  try{

    const consultaApiPlatforms = await axios
        .get(`${BASE_URL}${BASE_PLATFORMS}?key=${RAWG_API_KEY}`, {
          responseType: "json",
        })
      
    const platforms = consultaApiPlatforms.data.results;

    res.json({data : platforms})

  } catch(err) {
       (err) => next(err);
  }
}

module.exports = {
  getPlatforms,
};
