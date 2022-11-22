const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required:true,
      trimmed:true,
      unique:true
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
