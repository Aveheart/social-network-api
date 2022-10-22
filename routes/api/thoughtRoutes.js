const router = require('express').Router();

// these are all in thought controller
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction
 
} = require('../../controllers/thought.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

  // /api.thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)

//  /api.thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)


module.exports = router;