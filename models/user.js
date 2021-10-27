const {Schema, model} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please fill a valid email address"],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
}, 

{
    toJSON: {
        virtuals: true,
        getters: true,
    },

    id: false
});

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const user = model("user", UserSchema)

module.exports = user;