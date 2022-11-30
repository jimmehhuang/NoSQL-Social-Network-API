const {User, Thought} = require('../models');

const userController= {
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
        .catch(err => {
            res.json(err);
        });
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
    deleteUser(req, res) {

    },
    // 
    addFriend(req, res) {

    },
    deleteFriend(res, res) {

    }
}

module.exports = userController;