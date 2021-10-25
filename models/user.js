const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid e-mail address"],
      },
      thoughts: {
        type: Schema.Types.ObjectId,
        ref: "thought",
      },
      friends: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
    {
      toJSON: {
        virtuals: true,
        getters: true,
      },
      id: false,
    }
  );

  UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const user = model('user', UserSchema)

module.exports = user;
  