const { thought, user } = require('../models');

const thougthController = {

    // get all thoughts
    getAllThoughts(req, res) {thought.find({})
        .select('-__v')
        .then((data) => res.json(data))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
            });
    },

    // Get Single thought by id
    getThoughtById({ params }, res) {thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .then((data) => res.json(data))
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
            });
    },

    // Post  Create new thought
    addThought({ body }, res) {thought.create(body)
        .then(({_id}) => {
            return user.findOneAndUpdate(
                { _id: data.thoughtId },
                { $push: { thought: _id }},
                { new: true }
                );
            })
            .then(data => {
                if (!data) {
                    res.status(404).json({ message: 'No user found with this id' });
                    return;
                }
            res.json(data);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // Put Update thought by id
    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then((data) => {
                if (!data) {
                    res.status(404).json({ message: 'No thought found with this id' });
                    return;
                }
                res.json(data);
            })
            .catch((err) => res.json(err));
    },

    // Delete  Remove thought by id
    deleteThought({ params }, res) {
        thought.findOneAndDelete({ _id: params.thoughtId })
          .then((data) => {
            if (!data) {
              return res
                .status(404)
                .json({ message: "No thought was found with this id" });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true, runValidators: true }
            );
          })
          .then((data) => {
            if (!data) {
              return res
                .status(404)
                .json({ message: "No user found with this id!" });
            }
            res.json(data);
          })
          .catch((err) => res.json(err));
      },

    // Post  Add reaction
    addReaction({params, body}, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then((data) => {
                if(!data) {
                    res.status(404).json({message: 'No thought found with this id'});
                    return;
                }
                res.json(data);
            })
            .catch((err) => res.json(err));
    },

    // Delete  Remove reaction by id
    deleteReaction({ params }, res) {
        thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId }}},
            { new: true }
        )
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    }
};

module.exports = thougthController;