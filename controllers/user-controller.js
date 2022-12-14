const {User, Thought} = require('../models');

// /api/users
const userController = {
    // /api/users

    // GET all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // GET one user by id
    getUser({params}, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id.' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // CREATE one user
    addUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    // UPDATE one user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id.' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },
    // DELETE one user by id
    deleteUser({params}, res) {
        User.findOneAndDelete({userId: params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id.' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // /api/users/:userid/friends/:friendId
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true }
          )
            .then((dbUserData) => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
              }
              res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    },
    // /api/users/:userid/friends/:friendId
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
          )
            .then((dbUserData) => {
              if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id.' });
                return;
              }
              res.json(dbUserData);
            })
            .catch((err) => res.status(400).json(err));
    }
}

module.exports = userController;