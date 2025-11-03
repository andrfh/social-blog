import mongoose from "mongoose";

const Post = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {type: String, required: true},
    subtitle: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
    tag: {type: String},
    picture: {type: String}
})

export default mongoose.model('Post', Post)