const { v4: uuidv4, validate: uuidValidate  } = require('uuid');
const {Videogame, Genre} = require('../db');
const {BASE_URL,BASE_VIDEOGAMES} = require('../../constants');
const {RAWG_API_KEY} = process.env;
const axios = require('axios').default;
const { Op } = require("sequelize");


async function addVideogame(req,res,next){
    
    const videogame = req.body;

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

async function getVideogames(req,res,next) {

 
    const search = req.query.name; 
    console.log(search)

    if(search){
            console.log("Entro a searchVideogames")
            try{
                const results = []
        
                const videogamesDB = await Videogame.findAll(
                    {where: 
                        {name: {[Op.iLike]:`%${search}%`}}
                    },
                    {include : [Genre] })
                    
                const dataDB = videogamesDB && videogamesDB.map(g=>({
                        name: g.dataValues.name,
                        genres: g.dataValues.genres,  
                        image: `https://i.ebayimg.com/images/g/rcUAAOSwll1WulW3/s-l500.jpg`,
                        rating: g.dataValues.rating,
                        platforms: g.dataValues.platforms,
                        id: g.dataValues.id,
                        source: 'local'
                    }))
                    
                dataDB.forEach(g=>results.push(g));
        
                // console.log(videogamesAPI.data.count)
                // console.log(videogamesAPI.data.next)
                
                let apiRawg = `${BASE_URL}${BASE_VIDEOGAMES}?key=${RAWG_API_KEY}&search=${search}`
                
                for (let i=1; i<=7 && apiRawg; i++){
                    
                    const videogamesAPI = await axios
                        .get(apiRawg, {
                            responseType: "json"
                        })

                    apiRawg = videogamesAPI.data.next;
                        
                    const dataAPI = videogamesAPI.data.results && videogamesAPI.data.results.map(g=>({
                            name: g.name,
                            image: g.background_image,
                            genres: g.genres && g.genres.map(genre=>genre.name),
                            rating: g.rating,
                            platforms: g.platforms && g.platforms.map(platform=>platform.platform.name),
                            id: g.id,
                            source: 'api'
                        }))
                        
                    const filteredDataAPI = dataAPI.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) )
                        
                    filteredDataAPI.forEach(g=>results.push(g));
                }

                if(results.length ===0){
                    results.push({
                        name: "Videogames no encontrados",
                        image: "",
                        genres: "",
                        rating: "",
                        platforms: "",
                        id: "",
                        source: ""})
                }

                return res.json(results)
                
                } catch (e) {
                    next(e)
                }
    }
    
    console.log("Entro a getVideogames")

    const videogamesPpal = [];
    
    try{
        let apiRawg = `${BASE_URL}${BASE_VIDEOGAMES}?key=${RAWG_API_KEY}`
        for (let i=1; i<=5; i++){
            let resp = await axios
            .get(apiRawg, {
                responseType: "json"
            })
            apiRawg = resp.data.next;
            resp.data.results.forEach(g=>{
                videogamesPpal.push({
                    name: g.name,
                    image: g.background_image,
                    genres: g.genres.map(genre=>genre.name),
                    rating: g.rating,
                    platforms: g.platforms.map(platform=>platform.platform.name),
                    id: g.id,
                    source: 'api'
                })
            })
        }
        

        let videogamesAPI = await Videogame.findAll({ include: [Genre] })
        videogamesAPI.forEach(g=> videogamesPpal.push({
                name: g.dataValues.name,
                genres: g.dataValues.genres.map(genre=>genre.name),  
                image: `https://i.ebayimg.com/images/g/rcUAAOSwll1WulW3/s-l500.jpg`,
                rating: g.dataValues.rating,
                platforms: g.dataValues.platforms,
                id: g.dataValues.id,
                source: 'local'
        }))
        
        res.json({data: videogamesPpal})

    } catch (e) {
        next(e)
    }

}

async function getVideogameDetail(req,res,next){

    try{
    const {id} = req.params;
    var videogame = undefined;
    
    if(uuidValidate(id)){
        videogame = await Videogame.findByPk(id,{
            include : Genre
          });
        var {id:videogame_id, name, description, released, rating, platforms: platformsToFix, background_image, genres:genresToFix} = videogame.dataValues
        var genres = genresToFix.map(g=>({
            id: g.dataValues.id,
            name: g.dataValues.name
        }));
        var platforms = platformsToFix.split(',').map(p=>({platform:{name:p}}))
        background_image = `https://i.ebayimg.com/images/g/rcUAAOSwll1WulW3/s-l500.jpg`
    } else {
        videogame = await axios
        .get(`${BASE_URL}${BASE_VIDEOGAMES}/${id.toString()}?key=${RAWG_API_KEY}`, {
            responseType: "json"
        })
        var {id:videogame_id, name, description_raw: description, released, rating, platforms, background_image, genres} = videogame.data
    }

    res.json({data: {
        id: videogame_id,
        name : name,
        description : description,
        released : released,
        rating: rating,
        platforms : platforms.map(p=>p.platform.name),
        image : background_image,
        genres: genres.map(p=>p.name)
    }})
    } catch (e) {
        next(e)
    }
}




module.exports = {
    addVideogame,
    getVideogames,
    getVideogameDetail,
    // searchVideogames
}