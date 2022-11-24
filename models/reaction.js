const { Schema, Types } = require('mongoose');


const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
     createdAt: {
      type: Date,
      default: Date.now, 
    },
    reactions: [reactionSchema],
    },
    {
    toJSON: {
        virtuals: true,
    },
    }

);

module.exports = userSchema;
