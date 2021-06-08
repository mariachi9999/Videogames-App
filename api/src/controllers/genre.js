const {Genre} = require('../db')
const axios = require('axios').default
const {BASE_URL, BASE_GENRES, RAWG_API_KEY} = require('../../constants')

function addGenre(req,res,next){
    const genre = req.body;
    console.log(genre)

    if(!genre) return res.sendStatus({
        error : 500,
        message : 'Usuario debe enviar un genre.'
    })
    Genre.findOrCreate({
        where: {
            name: genre.name
        }
    })
        .then(genreCreated => res.json(genreCreated ))
        .catch(err=>next(err))
};


function getGenres(){
    axios.get(`${BASE_URL}${BASE_GENRES}?key=1e34baea7ff64f96b77376c140694bba`,{responseType: 'json'})
    .then(resp => {
        console.log(resp.data.results);
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });

};

module.exports = {
    addGenre,
    getGenres
}