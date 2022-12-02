const router = require('express').Router();

// /api/thoughts
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//GET route for all thoughts
router.route('/')
    .get(getAllThoughts);

// POST route for individual thought
router.route('/userId')
    .post(createThought);

//GET/PUT/DELETE routes for individual thoughts
router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


// POST for reactions
router.route('/:thoughtId/reactions')
    .post(createReaction);

// DELETE for reactions
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;