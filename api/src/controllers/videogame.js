const {Videogame} = require('../db')

function getVideogames(req,res,next){
    Videogame.findAll()
        .then(videogames => res.json(videogames))
        .catch(err=>next(err))
};


function addVideogame(req,res,next){
    const videogame = req.body;

    // // videogame.id = 

    // const userCreated = await User.findOrCreate({
    //   where : {
    //     name: authorName,
    //     email: authorEmail
    //   }
    // });
  

    if(!videogame) return res.sendStatus({
        error : 500,
        message : 'Usuario debe enviar un videogame.'
    })
    Videogame.create(videogame)
        .then(videogameCreated => res.json(videogameCreated ))
        .catch(err=>next(err))
};


module.exports = {
    getVideogames,
    addVideogame
}