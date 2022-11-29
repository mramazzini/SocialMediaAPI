const router = require('express').Router();
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// example data for post route
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
//   }

// /api/users/:userId
router.route('/:userId').get(getUser).put(updateUser).delete(removeUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
