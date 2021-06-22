const { v4: uuidv4, validate: uuidValidate  } = require('uuid');
const axios = require('axios').default;
const { Op } = require("sequelize");
const {Videogame, Genre} = require('../../db');
const {BASE_URL,BASE_VIDEOGAMES} = require('../../../constants');
const {RAWG_API_KEY} = process.env;


async function addVideogame(req,res,next){
    
    const videogame = req.body;
    console.log(videogame)

    const genres = videogame.genres.slice(0,-1).split(",")

    if(!videogame) return res.sendStatus({
        error : 500,
        message : 'Usuario debe enviar un videogame.'
    });

    try {
        let gameCreated = await Videogame.findOrCreate({
                where: {name: videogame.name},
                defaults:{
                    id: uuidv4(),
                    name: videogame.name,
                    description: videogame.description,
                    released: videogame.released,
                    rating: videogame.rating,
                    platforms: videogame.platforms.slice(0,-1)
                }});
        
        genres.forEach(async (G)=>{
            let genresGame = await Genre.findOne({where: {name: G}})
            gameCreated[0].addGenre(genresGame)
        })    
        
        res.json({ respuesta: 'Videogame agregado con éxito'})
    } catch (error) {
        res.send(error)
    }
}   


module.exports = {
    addVideogame,
}