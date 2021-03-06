const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    pseudo: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String]
    },
    location: {
        type: String
    },
    avatar: {
        type: String
    },
    imagePost: {
        type: String
    },
    likes: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    reports: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text: {
                type: String,
                required: true
            },
            pseudo: {
                type: String
            },
            avatar: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            },
            likes: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ],
            reports: [
                {
                    user: {
                        type: Schema.Types.ObjectId,
                        ref: 'user'
                    }
                }
            ]
        }
    ]
});

module.exports = Post = mongoose.model('post', PostSchema);

