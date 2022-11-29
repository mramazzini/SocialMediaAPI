const router = require('express').Router();
const {
 getThought,
 getThoughts,
 createThought,
 updateThought,
 removeThought,
 createReaction,
 removeReaction
} = require('../../controllers/thoughtController.js');


// /api/Thought
router.route('/').get(getThoughts).post(createThought);

// example data for post route 
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
//   }

// /api/Thought/:ThoughtId
router.route('/:thoughtId').get(getThought).put(updateThought).delete(removeThought);

router.route('/:thoughtId/reaction').post(createReaction);

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction)

module.exports = router;
