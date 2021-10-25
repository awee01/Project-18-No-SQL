const router = require("express").Router();

const {
  getAllUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
}  = require("../../controllers/user-controller");

router
    .route('/')
    .get(getAllUser)
    .post(addUser);

router
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/:userId/friends/:friendId')
    .post(addFriend);

router
    .route('/:userId/friends/:friendId')
    .delete(deleteFriend);

module.exports = router;