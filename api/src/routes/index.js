const { Router } = require('express');
const { getVideogames, addVideogame , getVideogameDetail, searchVideogames} = require('../controllers/videogame');
const { addGenre, getGenres } = require('../controllers/genre');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/home', getVideogames);
router.get('/videogames', searchVideogames); 
router.get('/videogames/:id', getVideogameDetail);
router.post('/videogame', addVideogame);
router.get('/genres', getGenres);




module.exports = router;
