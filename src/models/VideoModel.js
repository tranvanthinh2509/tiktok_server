const mongoose = require('mongoose');

const videoModel = new mongoose.Schema(
    {
        description: { type: String, required: true},
        video: { type: String, required: true},
        userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
        tag: { type: String},
        music: { type: String},
        imageBg: { type: String},
        liked: { type: Array, default: []},
        comment: { type: Number},
        saved: { type: Array, default: []},
        shared: { type: Array, default: []},
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', videoModel);

module.exports = Item;
