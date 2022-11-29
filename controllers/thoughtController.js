/*getThought,
 getThoughts,
 createThought,
 updateThought,
 removeThought,
 createReaction,
 removeReaction*/

 const { Thought, Reaction, User } = require('../models');

 module.exports = {

    getThoughts(req, res) {
        Thought.find()
          .then((Thoughts) => res.json(Thoughts))
          .catch((err) => res.status(500).json(err));
      },

      //Get thought by id
      getThought(req, res) {
        Thought.findOne({ _id: req.params.ThoughtId })
          .then((Thought) =>
            !Thought
              ? res.status(404).json({ message: 'No Thought with that ID' })
              : res.json(Thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      createThought(req, res) {
        Thought.create(req.body)
          .then((Thought) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $addToSet: { Thoughts: Thought._id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the Thought 🎉')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.ThoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((Thought) =>
            !Thought
              ? res.status(404).json({ message: 'No Thought with this id!' })
              : res.json(Thought)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      removeThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.ThoughtId })
          .then((Thought) =>
            !Thought
              ? res.status(404).json({ message: 'No Thought with this id!' })
              : User.findOneAndUpdate(
                  { Thoughts: req.params.ThoughtId },
                  { $pull: { Thoughts: req.params.ThoughtId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created but no user with this id!',
                })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.ThoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((Thought) =>
            !Thought
              ? res.status(404).json({ message: 'No Thought with this id!' })
              : res.json(Thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeReaction(req, res) {
        Application.findOneAndUpdate(
          { _id: req.params.applicationId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((application) =>
            !application
              ? res.status(404).json({ message: 'No application with this id!' })
              : res.json(application)
          )
          .catch((err) => res.status(500).json(err));
      },
 }