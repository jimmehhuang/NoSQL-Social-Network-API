const router = require('express').Router();

//*** need controller ***
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require();

//GET and POST routes for all thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought);

//GET/PUT/DELETE routes for individual thoughts
router.route('/:id')
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