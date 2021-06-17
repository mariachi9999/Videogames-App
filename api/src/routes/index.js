const { Router } = require('express');
const { getVideogames, addVideogame , getVideogameDetail} = require('../controllers/videogame');
const { getGenres } = require('../controllers/genre');
const {getInfo} = require('../controllers/info');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('', getInfo);
router.get('/videogames', getVideogames); 
// router.get('/videogames', getVideogames);
router.get('/videogames/:id', getVideogameDetail);
router.post('/videogame', addVideogame);
router.get('/genres', getGenres);




module.exports = router;
