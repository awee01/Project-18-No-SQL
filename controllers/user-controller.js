const { thought, user } = require('../models');
// const { populate } = require("../models/User");

const userController = {

    // Get - gets all users
    getAllUsers(req, res) {
    user.find({})
        // .populate({
        //  path: "thoughts",
        //  select: "-__v",
        //   })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Get - get specific user by id
    getUserById({ params }, res) {
    user.findOne({ _id: params.userId })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this ID" });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Post - add a new user
    addUser({ body }, res) {
    user.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },

    // Put - updates a specific user
    updateUser({ params, body }, res) {
    user.findOneAndUpdate({ _id: params.userId }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Delete - remove
    deleteUser({ params }, res) {
    user.findOneAndDelete({ _id: params.userId })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Post - add friend
    addFriend({ params }, res) {
    user.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: "No user found with this ID" });
                return;
                }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    // Delete - remove friend
    deleteFriend({ params }, res) {
        user.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true, runValidators: true }
        )
        .then((dbUserData) => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this ID" });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    }
};

module.exports = userController;