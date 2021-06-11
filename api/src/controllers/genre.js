const { Genre } = require("../db");
const axios = require("axios").default;
const { BASE_URL, BASE_GENRES } = require("../../constants");
const {RAWG_API_KEY} = process.env


function addGenre(req, res, next) {
  const genre = req.body;
  console.log(genre);

  if (!genre)
    return res.sendStatus({
      error: 500,
      message: "Usuario debe enviar un genre.",
    });
  Genre.findOrCreate({
    where: {
      name: genre.name,
    },
    defaults:{
      id: uuidv4(),
      name: genre.name}
    })
    .then((resp) => res.json(resp))
    .catch((err) => next(err))
}


async function getGenres(req,res,next) {

  try{

    const consultaApiGenres = await axios
        .get(`${BASE_URL}${BASE_GENRES}?key=${RAWG_API_KEY}`, {
          responseType: "json",
        })
      
    const genresApi = consultaApiGenres.data.results;

    genresApi.map(async (g) => 
         await Genre.findOrCreate({
          where: {name: g.name},
          defaults: {
            id: g.id,
            name: g.name
          }}) 
    )

    res.json({Respuesta : "Generos cargados"})

  } catch(err) {
       (err) => next(err);
  }
}

module.exports = {
  addGenre,
  getGenres,
};
