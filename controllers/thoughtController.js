const {User, Thought} = require('../models');

// /api/thoughts
const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
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
    getThoughtById({params}, res){
      Thought.findOne({_id: params.id})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({ message: 'No User found with this id.' });
          return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    // create thought
    createThought({body}, res){
      Thought.create(body)
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
    },
    // update thought (by id)
    updateThought({params, body}, res){
      Thought.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({ message: 'No thoughts found with this id.' });
          return;
          }
          res.json(dbThoughtData);
      })
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
    },
    // delete thought (by id)
    deleteThought({params}, res){
      Thought.findOneAndDelete({_id: params.id})
        .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({ message: 'No thoughts found with this id.' });
          return;
          }
          res.json(dbThoughtData);
      })
      .catch(err => {
          console.log(err);
          res.sendStatus(400);
      });
    },
    // create reaction (by id)
    createReaction({params}, res){
      Thought.findOneAndUpdate(
        {_id: params.thoughtId}, 
        {$push: {reactions: body}}, 
        {new: true, runValidators: true})
      .populate({path: 'reactions', select: '-__v'})
      .select('-__v')
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({message: 'No thoughts with this ID.'});
              return;
          }
          res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err))
    },
    // delete reaction (by id)
    deleteReaction({params}, res){
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'Nope!'});
            return;
          }
         res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;