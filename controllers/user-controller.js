const { thought, user} = require('../models');

const userController = {

  // Get  all users
  getAllUser(req, res) {
    user.find({})
      .select('-__v')
      .then((data) => res.json(data))
      .catch((err) => { 
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Get single user by id
  getUserById({params}, res) {
    user.findOne({_id: params.userId})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // Post - add new user
  addUser({body}, res) {
    user.create(body)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  // Put - update user by id
  updateUser({params,body}, res) {
    user.findOneAndUpdate({_id: params.userId}, body, 
      {
        new: true,
        runValidators: true
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({
            message: 'No user found with this id'
          });
          return;
        }
        res.json(data);
      })
      .catch(err => res.json(err));
  },

  // Delete - Delete user by id
  deleteUser({params}, res) {
    user.findOneAndDelete({
        _id: params.userId
      })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  // Post - Add New Friend
  addFriend({params}, res) {
    user.findOneAndUpdate({_id: params.userId}, 
      {$push: {friends: params.friendId}}, 
      {
        new: true,
        runValidators: true
      })
      .then((data) => {
        if (!data) {
          res.send(404).json({
            message: "No user found with this id"
          });
          return;
        }
        return res.json(data);
      })
      .catch((err) => res.json(err));
  },

  // Delete - Delete Friend
  deleteFriend({params}, res) {
    user.findOneAndUpdate({_id: params.userId}, {
        $pull: {friends: params.friendId}}, 
        {new: true})
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};

module.exports = userController;