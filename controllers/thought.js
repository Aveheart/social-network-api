const { Thought, User } = require('../models');

module.exports = {


  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },


  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },


  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thought => {
        User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        )
          .then((User) =>
            !User
              ? res.status(404).json({ message: 'No User with this id!' })
              : res.json(User)
          )
          .catch((err) => res.status(500).json(err));
      })
      .catch(err => res.status(400).json(err));
  },


  // Delete a thought
  deleteThought(req, res) {
  Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : User.deleteMany({ _id: { $in: thought.users } })
    )
    .then(() => res.json({ message: 'Thought and User deleted!' }))
    .catch((err) => res.status(500).json(err));
},


// Update a thought
updateThought(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $set: req.body },
    { runValidators: true, new: true }
  )
    .then((thought) =>
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
},
};

// todo: add a reaction

// todo: remove a reaction