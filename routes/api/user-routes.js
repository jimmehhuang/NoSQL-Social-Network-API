const router = require('express').Router();

// /api/users
const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// GET/POST route for all users
router.route('/')
    .get(getAllUsers)
    .post(addUser);

// GET/PUT/DELETE routes for individual users
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// POST/DELETE routes for friends
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);


module.exports = router;