const {Thought, User} = require('../models');

// /api/thoughts
const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .populate({
            path: 'reactions',
            select: '-__v'
          })
          .select('-__v')
          .sort({ _id: -1 })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    // get one thought by id
    getThoughtById(req, res){
      Thought.findOne()
    },
    // create thought
    createThought(req, res){
      Thought.create()
    },
    // update thought (by id)
    updateThought(req, res){

    },
    // delete thought (by id)
    deleteThought(req, res){

    },
    // create reaction (by id)
    createReaction(req, res){

    },
    // delete reaction (by id)
    deleteReaction(req, res){

    }
};

module.exports = thoughtController;