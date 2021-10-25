const { thought, user } = require("../models");

const thoughtController = {

    getAllThoughts(req, res) {
    thought.find({})
        .select('-__v')

        // .populate({
        //     path: "reactions",
        //     select: "-__v",
        //   })
        //   .populate({
        //     path: "thoughts",
        //     select: "-__v",
        //   })
          
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    getThoughtById({ params }, res) {
    thought.findOne({ _id: params.thoughtId })

        .select('-__v')
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought with this ID" });
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

   
    addThought({ body }, res) {
    thought.create(body)

        .then(({data}) => {
            return user.findOneAndUpdate(
                { _id: data.thoughtId },
                { $push: { thought: data._id }},
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    updateThought({ params, body }, res) {
        thought.findOneAndUpdate({ _id: params.thoughtId }, body, { new: true })

          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought with this ID" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
      },

 
    deleteThought({ params }, res) {
    thought.findOneAndDelete({ _id: params.thoughtId })

        .then((dbThoughtData) => {
            if (!dbThoughtData) {
              res.status(404).json({ message: "No thought with this ID" });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    addReaction({params, body}, res) {
    thought.findOneAndUpdate(

        { _id: params.thoughtId },
        { $push: { reactions: body } },
        // { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },


    deleteReaction({ params }, res) {
    thought.findOneAndUpdate(
        
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId }}},
        { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
    }
};

module.exports = thoughtController;