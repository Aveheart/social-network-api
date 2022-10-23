const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      //  validate email found from stackoverflow
      match: 
      [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);
// this virtual should get the amount of friends count. example pulled form mini project
userSchema.virtual('friendCount')
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;