const { Router } = require('express');
const { getVideogames, addVideogame } = require('../controllers/videogame');

const router = Router();

router.get('/', getVideogames)
router.post('/', addVideogame)

module.exports = router;