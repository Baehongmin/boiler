const mongoose = require('mongoose')

const replySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    content:{
        type: String,
        maxlength: 500,
        required: true
    },
    writer: {
        type: String,
        maxlength: 50
    },
    likeCount:{
        type: Number,
        default: 0
    },
    unLikeCount: {
        type: Number,
        default: 0
    },
    isParent: {
        type:Boolean,
        default: true
    },
    replyId: {
        type: Array
    },
    articleId: {
        type:String,
        required: true
    }
})

replySchema.pre('save', function(next) {
    if(this.likecount || this.unLikeCount) {
        let err = new Error("likecount, unLikecount is not Possible");
        next(err);
    }else {
        next();
    }
})

const Reply=mongoose.model('Reply', replySchema)

module.exports = { Reply }