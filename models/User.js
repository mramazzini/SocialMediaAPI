const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trimmed: true,
      unique: true
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
        ref: 'user',
      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'thought',
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


const User = model('user', userSchema);

module.exports = User;
