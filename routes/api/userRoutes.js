const router = require('express').Router;

const {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require();

// GET route for all users
router.route('/users')
    .get(getAllUsers)
    .post(addUser);

// GET/PUT/DELETE routes for individual users
router.route('/:userId')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

// routes for friends
router.route('/:userId/friends/:friendId')
    .get(addFriend)
    .delete(deleteFriend)


module.exports = router;