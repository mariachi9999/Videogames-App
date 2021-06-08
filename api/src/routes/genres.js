const { Router } = require('express');
const { addGenre, getGenres } = require('../controllers/genre');


const router = Router();

router.post('/', addGenre)
router.get('/', getGenres)

module.exports = router;