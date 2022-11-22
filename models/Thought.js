const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required:true,
      minLength: 1,
      maxLength: 280,
    },
     email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        ],
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ]
    },
    {
    toJSON: {
        virtuals: true,
    },
    }

);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

module.exports = userSchema;
